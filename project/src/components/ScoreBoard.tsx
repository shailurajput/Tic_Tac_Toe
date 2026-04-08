interface ScoreBoardProps {
  xWins: number;
  oWins: number;
  draws: number;
  currentPlayer: 'X' | 'O';
  xLabel?: string;
  oLabel?: string;
}

export function ScoreBoard({ xWins, oWins, draws, currentPlayer, xLabel = 'Player X', oLabel = 'AI (O)' }: ScoreBoardProps) {
  return (
    <div className="flex justify-between items-center gap-4 w-full">
      <div className={`flex-1 text-center p-4 rounded-xl transition-all border ${
        currentPlayer === 'X'
          ? 'bg-cyan-500/20 border-cyan-400/50'
          : 'bg-white/5 border-white/10'
      }`}>
        <div className="text-xs font-semibold text-cyan-300/70 uppercase tracking-wider">{xLabel}</div>
        <div className={`text-3xl font-bold transition-colors ${currentPlayer === 'X' ? 'text-cyan-300' : 'text-white/40'}`}>
          {xWins}
        </div>
      </div>
      <div className="flex-1 text-center p-4 rounded-xl bg-white/5 border border-white/10">
        <div className="text-xs font-semibold text-white/50 uppercase tracking-wider">Draws</div>
        <div className="text-3xl font-bold text-white/40">{draws}</div>
      </div>
      <div className={`flex-1 text-center p-4 rounded-xl transition-all border ${
        currentPlayer === 'O'
          ? 'bg-purple-500/20 border-purple-400/50'
          : 'bg-white/5 border-white/10'
      }`}>
        <div className="text-xs font-semibold text-purple-300/70 uppercase tracking-wider">{oLabel}</div>
        <div className={`text-3xl font-bold transition-colors ${currentPlayer === 'O' ? 'text-purple-300' : 'text-white/40'}`}>
          {oWins}
        </div>
      </div>
    </div>
  );
}
