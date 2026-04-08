import { Player } from '../utils/gameLogic';

interface WinnerModalProps {
  winner: Player;
  onReset: () => void;
  isOpen: boolean;
  gameMode?: 'ai' | 'friend';
}

export function WinnerModal({ winner, onReset, isOpen, gameMode = 'ai' }: WinnerModalProps) {
  if (!isOpen) return null;

  let title = '';
  let message = '';

  if (gameMode === 'ai') {
    if (winner === 'X') {
      title = 'You Won!';
      message = 'Congratulations! You beat the AI!';
    } else if (winner === 'O') {
      title = 'AI Won!';
      message = 'Better luck next time!';
    } else {
      title = "It's a Draw!";
      message = 'Nice battle with the AI!';
    }
  } else {
    if (winner === 'X') {
      title = 'Player 1 Won!';
      message = 'Congratulations Player 1!';
    } else if (winner === 'O') {
      title = 'Player 2 Won!';
      message = 'Congratulations Player 2!';
    } else {
      title = "It's a Draw!";
      message = 'Great match between you two!';
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 max-w-sm w-full border border-white/10">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-3">
            {title}
          </h2>
          <p className="text-cyan-300/80 text-lg leading-relaxed">{message}</p>
        </div>
        <button
          onClick={onReset}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 px-4 rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl border border-white/20"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
