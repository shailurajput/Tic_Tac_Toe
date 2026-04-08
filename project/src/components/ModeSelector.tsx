import { Cpu, Users } from 'lucide-react';

interface ModeSelectorProps {
  onSelectMode: (mode: 'ai' | 'friend') => void;
}

export function ModeSelector({ onSelectMode }: ModeSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <div className="text-center mb-16">
          <h1 className="text-6xl sm:text-7xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Tic-Tac-Toe
          </h1>
          <p className="text-xl text-cyan-300/80 font-medium">Choose your game mode</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <button
            onClick={() => onSelectMode('ai')}
            className="group relative p-8 rounded-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 backdrop-blur-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 hover:border-cyan-400 hover:from-cyan-500/20 hover:to-blue-500/20 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-blue-400/0 group-hover:from-cyan-400/5 group-hover:to-blue-400/5 transition-all" />
            <div className="relative flex flex-col items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all border border-cyan-400/30 group-hover:border-cyan-400/50">
                <Cpu className="w-12 h-12 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-cyan-100">Play vs AI</h2>
              <p className="text-cyan-300/80 text-center text-sm leading-relaxed">
                Challenge the computer. You are X, AI is O.
              </p>
              <div className="text-xs text-cyan-400/70 mt-2 space-y-1 text-center">
                <div>✓ AI blocks threats</div>
                <div>✓ Smart gameplay</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => onSelectMode('friend')}
            className="group relative p-8 rounded-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/30 hover:border-purple-400 hover:from-purple-500/20 hover:to-pink-500/20 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/0 to-pink-400/0 group-hover:from-purple-400/5 group-hover:to-pink-400/5 transition-all" />
            <div className="relative flex flex-col items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all border border-purple-400/30 group-hover:border-purple-400/50">
                <Users className="w-12 h-12 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-purple-100">Play with Friend</h2>
              <p className="text-purple-300/80 text-center text-sm leading-relaxed">
                Two player game on same device. Take turns playing.
              </p>
              <div className="text-xs text-purple-400/70 mt-2 space-y-1 text-center">
                <div>✓ Player 1 is X</div>
                <div>✓ Player 2 is O</div>
              </div>
            </div>
          </button>
        </div>

        <p className="text-center text-cyan-400/60 text-sm mt-12 font-medium">
          Select a mode above to start playing
        </p>
      </div>
    </div>
  );
}
