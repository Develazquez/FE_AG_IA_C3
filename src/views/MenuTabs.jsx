import { useState } from 'react';
import { Trophy, Download } from 'lucide-react';
import MetricsCards from './MetricsCards';

const DAYS_ORDER = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

export default function MenuTabs({ topMenus, csvUrls }) {
  const [active, setActive] = useState(0);
  const current = topMenus[active];
  if (!current) return null;

 
  const grouped = DAYS_ORDER.map((day) => ({
    day,
    rows: (current.menu_diario || []).filter((r) => r['Día'] === day),
  }));

  return (
    <div className="animate-fade-up">
      {/* Tab bar */}
      <div className="flex items-center gap-2 mb-5">
        {topMenus.map((m, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              active === i
                ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                : 'bg-white text-brand-700 border border-sand-200 hover:border-brand-300'
            }`}
          >
            {i === 0 && <Trophy size={14} />}
            Menú #{m.rank}
          </button>
        ))}

        {csvUrls[active] && (
          <a
            href={csvUrls[active]}
            download
            className="ml-auto flex items-center gap-1 text-xs text-inst-500 hover:text-inst-700 font-medium"
          >
            <Download size={13} /> CSV
          </a>
        )}
      </div>

      {/* Metrics */}
      <MetricsCards menu={current} />

      {/* Table */}
      <div className="mt-5 overflow-x-auto rounded-xl border border-sand-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-sand-100 text-left text-xs font-semibold text-brand-800 uppercase tracking-wider">
              <th className="px-4 py-3">Día</th>
              <th className="px-4 py-3">Comida</th>
              <th className="px-4 py-3">Platillo</th>
              <th className="px-4 py-3">Técnica</th>
              <th className="px-4 py-3 text-right">Gramaje</th>
              <th className="px-4 py-3 text-right">Costo</th>
            </tr>
          </thead>
          <tbody>
            {grouped.map(({ day, rows }) =>
              rows.map((r, j) => (
                <tr
                  key={`${day}-${j}`}
                  className="border-t border-sand-100 hover:bg-brand-50/40 transition-colors"
                >
                  {j === 0 && (
                    <td rowSpan={rows.length} className="px-4 py-2 font-semibold text-brand-700 align-top border-r border-sand-100">
                      {day}
                    </td>
                  )}
                  <td className="px-4 py-2 text-sand-300 capitalize">{r['Comida']}</td>
                  <td className="px-4 py-2 font-medium">{r['Platillo']}</td>
                  <td className="px-4 py-2 capitalize text-sand-300">{r['Técnica']}</td>
                  <td className="px-4 py-2 text-right tabular-nums">{r['Gramaje (g)']?.toFixed(0)}g</td>
                  <td className="px-4 py-2 text-right tabular-nums font-medium">${r['Costo (MXN)']?.toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
