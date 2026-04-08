import { Cell } from './Cell';
import { Board as BoardType, Player, WINNING_COMBINATIONS, calculateWinner } from '../utils/gameLogic';

interface BoardProps {
  board: BoardType;
  onCellClick: (index: number) => void;
  winner: Player;
}

export function Board({ board, onCellClick, winner }: BoardProps) {
  const getWinningCells = (): number[] => {
    for (const [a, b, c] of WINNING_COMBINATIONS) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return [a, b, c];
      }
    }
    return [];
  };

  const winningCells = getWinningCells();

  return (
    <div className="grid grid-cols-3 gap-3 p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
      {board.map((cell, index) => (
        <Cell
          key={index}
          value={cell}
          onClick={() => !winner && !cell && onCellClick(index)}
          isWinning={winningCells.includes(index)}
        />
      ))}
    </div>
  );
}
