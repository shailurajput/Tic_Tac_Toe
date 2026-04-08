import { Player } from '../utils/gameLogic';

interface CellProps {
  value: Player;
  onClick: () => void;
  isWinning: boolean;
}

export function Cell({ value, onClick, isWinning }: CellProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-20 h-20 sm:w-24 sm:h-24 rounded-xl text-2xl sm:text-5xl font-bold
        transition-all duration-200 hover:scale-110 active:scale-95
        backdrop-blur-md border shadow-lg
        ${isWinning
          ? 'bg-gradient-to-br from-emerald-400/30 to-green-400/20 border-emerald-400 shadow-emerald-500/50'
          : 'bg-gradient-to-br from-white/20 to-white/10 border-white/30 hover:border-white/50 hover:bg-white/25 hover:shadow-xl'
        }
        ${value === 'X' ? 'text-cyan-300' : value === 'O' ? 'text-purple-300' : 'text-white/30'}
        ${!value && !isWinning ? 'hover:from-cyan-400/20 hover:to-blue-400/10 cursor-pointer' : ''}
        ${value ? 'cursor-default' : ''}
      `}
    >
      {value}
    </button>
  );
}
