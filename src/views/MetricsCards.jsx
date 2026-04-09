import { TrendingUp, Wallet, Utensils, Microscope } from 'lucide-react';

const cards = [
  { key: 'fitness', label: 'Fitness', icon: TrendingUp, color: 'text-brand-600', bg: 'bg-brand-50', fmt: (v) => v.toFixed(4) },
  { key: 'costo', label: 'Costo Semanal', icon: Wallet, color: 'text-inst-600', bg: 'bg-inst-50', fmt: (v) => `$${v.toLocaleString('es-MX', { minimumFractionDigits: 2 })}` },
  { key: 'variedad', label: 'Variedad', icon: Utensils, color: 'text-amber-700', bg: 'bg-amber-50', fmt: (v) => `${(v * 100).toFixed(1)}%` },
  { key: 'densidad', label: 'Densidad Micro', icon: Microscope, color: 'text-rose-600', bg: 'bg-rose-50', fmt: (v) => `${(v * 100).toFixed(1)}%` },
];

export default function MetricsCards({ menu }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 stagger">
      {cards.map(({ key, label, icon: Icon, color, bg, fmt }) => (
        <div key={key} className={`${bg} rounded-xl p-4 border border-white/60`}>
          <div className={`flex items-center gap-1.5 text-xs font-semibold ${color} mb-1`}>
            <Icon size={14} /> {label}
          </div>
          <div className="text-xl font-bold tracking-tight">{fmt(menu[key === 'variedad' ? 'variedad_platillos' : key === 'densidad' ? 'densidad_micro' : key])}</div>
        </div>
      ))}
    </div>
  );
}
