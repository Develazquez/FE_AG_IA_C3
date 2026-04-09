import { BarChart3, LayoutDashboard, PieChart } from 'lucide-react';

const graphMeta = [
  { key: 'evolucion', label: 'Evolución del Fitness', icon: BarChart3 },
  { key: 'dashboard', label: 'Dashboard Nutricional', icon: LayoutDashboard },
  { key: 'descomposicion', label: 'Descomposición del Fitness', icon: PieChart },
];

export default function GraphsSection({ imageUrls }) {
  if (!imageUrls || !imageUrls.evolucion) return null;

  return (
    <div className="animate-fade-up space-y-4">
      <h3 className="font-display text-lg font-bold text-brand-800">Gráficas del Algoritmo</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger">
        {graphMeta.map(({ key, label, icon: Icon }) => (
          <div key={key} className="bg-white rounded-xl border border-sand-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="px-4 py-2 bg-sand-50 border-b border-sand-100 flex items-center gap-1.5 text-xs font-semibold text-brand-700">
              <Icon size={14} /> {label}
            </div>
            <img
              src={imageUrls[key]}
              alt={label}
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
