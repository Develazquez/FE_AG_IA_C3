import { Dna } from 'lucide-react';

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 animate-fade-up">
      {/* Animated rings */}
      <div className="relative w-20 h-20 mb-8">
        <div className="absolute inset-0 rounded-full border-4 border-brand-200 pulse-ring" />
        <div className="absolute inset-0 rounded-full border-4 border-brand-300 pulse-ring" style={{ animationDelay: '0.4s' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Dna size={28} className="text-brand-500 animate-spin" style={{ animationDuration: '3s' }} />
        </div>
      </div>
      <h3 className="font-display text-xl font-bold text-brand-800 mb-2">Optimizando menús…</h3>
      <p className="text-sm text-sand-300 text-center max-w-xs">
        El algoritmo genético está evaluando cientos de combinaciones. Esto puede tomar entre 10 y 20 segundos.
      </p>
    </div>
  );
}
