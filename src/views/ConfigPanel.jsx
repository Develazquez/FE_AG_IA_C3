import { Sliders, DollarSign, Play, RotateCcw, Users, Dna, Repeat } from 'lucide-react';

export default function ConfigPanel({ config, onUpdate, onGenerate, onReset, isLoading }) {
  const field = (label, icon, key, min, max, step = 1, prefix = '') => (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-sm font-medium text-brand-700">
        {icon}
        {label}
      </label>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={config[key]}
          onChange={(e) => onUpdate(key, Number(e.target.value))}
          className="flex-1 accent-brand-500 h-1.5 cursor-pointer"
        />
        <span className="min-w-[4.5rem] text-right font-semibold text-sm tabular-nums bg-sand-100 rounded-md px-2 py-1">
          {prefix}{Number(config[key]).toLocaleString('es-MX')}
        </span>
      </div>
    </div>
  );

  return (
    <aside className="w-full lg:w-80 shrink-0 bg-white rounded-2xl border border-sand-200 shadow-sm p-6 space-y-6 self-start sticky top-6">
      {/* Header */}
      <div>
        <h2 className="font-display text-lg font-bold text-brand-800 flex items-center gap-2">
          <Sliders size={18} /> Configuración
        </h2>
        <p className="text-xs text-sand-300 mt-1">Ajusta los parámetros del algoritmo genético</p>
      </div>

      {/* Fields */}
      <div className="space-y-5">
        {field('Edad Mínima', <Users size={14} />, 'edad_min', 3, 17)}
        {field('Edad Máxima', <Users size={14} />, 'edad_max', 3, 18)}
        {field('Presupuesto Máximo', <DollarSign size={14} />, 'presupuesto_max', 500, 10000, 50, '$')}

        {/* Sexo */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-sm font-medium text-brand-700">
            <Users size={14} /> Sexo
          </label>
          <select
            value={config.sexo}
            onChange={(e) => onUpdate('sexo', e.target.value)}
            className="w-full border border-sand-200 rounded-lg px-3 py-2 text-sm bg-sand-50 focus:outline-none focus:ring-2 focus:ring-brand-300"
          >
            <option value="ambos">Ambos</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
        </div>

        {/* Advanced (collapsible feel) */}
        <details className="group">
          <summary className="text-xs font-semibold text-inst-500 cursor-pointer select-none">
            Parámetros avanzados ▾
          </summary>
          <div className="mt-3 space-y-4">
            {field('Tamaño Población', <Dna size={14} />, 'tamano_poblacion', 20, 500, 10)}
            {field('Generaciones', <Repeat size={14} />, 'generaciones', 10, 500, 10)}
          </div>
        </details>
      </div>

      {/* Actions */}
      <div className="space-y-2 pt-2">
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 active:scale-[0.98] text-white font-semibold rounded-xl px-4 py-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-brand-500/20"
        >
          <Play size={16} />
          {isLoading ? 'Optimizando…' : 'Generar Menús Óptimos'}
        </button>
        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 text-sm text-sand-300 hover:text-brand-600 transition-colors py-1"
        >
          <RotateCcw size={13} /> Restablecer
        </button>
      </div>
    </aside>
  );
}
