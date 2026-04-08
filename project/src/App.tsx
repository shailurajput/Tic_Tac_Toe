import { useState, useEffect } from 'react';
import { Board } from './components/Board';
import { ScoreBoard } from './components/ScoreBoard';
import { WinnerModal } from './components/WinnerModal';
import { ModeSelector } from './components/ModeSelector';
import { calculateWinner, isBoardFull, getSmartAIMove, type Board as BoardType } from './utils/gameLogic';
import { useSound } from './hooks/useSound';
import { RotateCcw } from 'lucide-react';

type GameMode = 'ai' | 'friend' | null;

function App() {
  const [gameMode, setGameMode] = useState<GameMode>(null);
  const [board, setBoard] = useState<BoardType>(Array(9).fill(null));
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [draws, setDraws] = useState(0);
  const [isThinking, setIsThinking] = useState(false);

  const winner = calculateWinner(board);
  const isFull = isBoardFull(board);
  const playMoveSound = useSound('move');
  const playWinSound = useSound('win');

  const getCurrentPlayer = (): 'X' | 'O' => {
    const xCount = board.filter((cell) => cell === 'X').length;
    const oCount = board.filter((cell) => cell === 'O').length;
    return xCount > oCount ? 'O' : 'X';
  };

  useEffect(() => {
    if (gameMode === 'ai' && getCurrentPlayer() === 'O' && !winner && !isFull) {
      setIsThinking(true);
      const timer = setTimeout(() => {
        const aiMove = getSmartAIMove(board);
        if (aiMove !== null) {
          const newBoard = [...board];
          newBoard[aiMove] = 'O';
          setBoard(newBoard);
          playMoveSound();
        }
        setIsThinking(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [board, winner, isFull, gameMode]);

  useEffect(() => {
    if (winner || isFull) {
      playWinSound();
      const timer = setTimeout(() => {
        if (winner === 'X') {
          setXWins(xWins + 1);
        } else if (winner === 'O') {
          setOWins(oWins + 1);
        } else if (isFull) {
          setDraws(draws + 1);
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [winner, isFull]);

  const handleCellClick = (index: number) => {
    if (gameMode === 'ai') {
      if (!board[index] && !winner && !isThinking && getCurrentPlayer() === 'X') {
        const newBoard = [...board];
        newBoard[index] = 'X';
        setBoard(newBoard);
        playMoveSound();
      }
    } else if (gameMode === 'friend') {
      if (!board[index] && !winner) {
        const newBoard = [...board];
        const currentPlayer = getCurrentPlayer();
        newBoard[index] = currentPlayer;
        setBoard(newBoard);
        playMoveSound();
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsThinking(false);
  };

  const backToModeSelector = () => {
    setGameMode(null);
    setBoard(Array(9).fill(null));
    setXWins(0);
    setOWins(0);
    setDraws(0);
  };

  if (gameMode === null) {
    return <ModeSelector onSelectMode={setGameMode} />;
  }

  const isAIMode = gameMode === 'ai';
  const isFriendMode = gameMode === 'friend';
  const currentPlayer = getCurrentPlayer();
  const xLabel = isAIMode ? 'You (X)' : 'Player 1 (X)';
  const oLabel = isAIMode ? 'AI (O)' : 'Player 2 (O)';
  const modeTitle = isAIMode ? 'Play vs AI' : 'Play with Friend';
  const turnInfo = isAIMode
    ? (isThinking ? 'AI is thinking...' : (currentPlayer === 'X' ? 'Your turn' : 'AI turn'))
    : `Player ${currentPlayer === 'X' ? '1' : '2'}'s turn`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Tic-Tac-Toe
          </h1>
          <button
            onClick={backToModeSelector}
            className="p-3 hover:bg-white/10 hover:backdrop-blur-md rounded-xl transition-all duration-200 border border-white/10 hover:border-white/30"
            title="Back to mode selector"
          >
            <RotateCcw className="w-5 h-5 text-cyan-400" />
          </button>
        </div>
        <p className="text-center text-cyan-300/80 mb-8 text-sm sm:text-base font-medium">{modeTitle}</p>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
          <ScoreBoard
            xWins={xWins}
            oWins={oWins}
            draws={draws}
            currentPlayer={currentPlayer}
            xLabel={xLabel}
            oLabel={oLabel}
          />
        </div>

        <div className="mb-6 text-center">
          <p className={`font-bold text-xl px-4 py-3 rounded-xl transition-all ${
            currentPlayer === 'X'
              ? 'text-cyan-300 bg-blue-500/20 border border-cyan-400/30'
              : 'text-purple-300 bg-purple-500/20 border border-purple-400/30'
          }`}>
            {turnInfo}
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className={`${isThinking ? 'opacity-50' : 'opacity-100'} transition-opacity duration-300`}>
            <Board
              board={board}
              onCellClick={handleCellClick}
              winner={winner}
            />
          </div>

          {isThinking && (
            <div className="text-center">
              <div className="inline-block">
                <div className="animate-spin h-8 w-8 border-4 border-cyan-400 border-t-transparent rounded-full"></div>
              </div>
              <p className="text-cyan-300 mt-3 text-sm font-medium">AI is thinking...</p>
            </div>
          )}

          <button
            onClick={resetGame}
            disabled={isThinking}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl border border-white/20"
          >
            New Game
          </button>
        </div>

        <WinnerModal
          winner={winner}
          isOpen={winner !== null || (isFull && !winner)}
          onReset={resetGame}
          gameMode={gameMode}
        />
      </div>
    </div>
  );
}

export default App;
