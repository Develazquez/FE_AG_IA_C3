import { Leaf, AlertCircle } from 'lucide-react';
import { useMenuController } from './controllers/MenuController';
import ConfigPanel from './views/ConfigPanel';
import LoadingState from './views/LoadingState';
import MenuTabs from './views/MenuTabs';
import GraphsSection from './views/GraphsSection';

export default function App() {
  const { config, updateConfig, menu, generate, reset } = useMenuController();

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="bg-white/80 backdrop-blur-md border-b border-sand-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-brand-500 flex items-center justify-center shadow-sm shadow-brand-500/30">
              <Leaf size={18} className="text-white" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold leading-tight text-brand-800">
                MenuGen-DIF <span className="text-brand-400"></span>
              </h1>
              <p className="text-[10px] text-sand-300 leading-none -mt-0.5">
                Optimización de Menús Escolares · Chiapas
              </p>
            </div>
          </div>
          <span className="hidden sm:block text-[10px] text-sand-300 bg-sand-100 rounded-full px-3 py-1 font-medium">
            Algoritmo Genético + FastAPI
          </span>
        </div>
      </header>

      {/* Main layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <ConfigPanel
          config={config}
          onUpdate={updateConfig}
          onGenerate={generate}
          onReset={reset}
          isLoading={menu.status === 'loading'}
        />

        {/* Content */}
        <section className="flex-1 min-w-0 space-y-8">
          {menu.status === 'idle' && (
            <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-up">
              <div className="w-16 h-16 rounded-2xl bg-brand-100 flex items-center justify-center mb-4">
                <Leaf size={28} className="text-brand-400" />
              </div>
              <h2 className="font-display text-xl font-bold text-brand-800 mb-1">
                Bienvenido a MenuGen-DIF
              </h2>
              <p className="text-sm text-sand-300 max-w-sm">
                Configura los parámetros a la izquierda y presiona
                <strong className="text-brand-600"> Generar Menús Óptimos</strong> para iniciar la optimización.
              </p>
            </div>
          )}

          {menu.status === 'loading' && <LoadingState />}

          {menu.status === 'error' && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-5 animate-fade-up">
              <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-800 text-sm">Error al generar menús</p>
                <p className="text-xs text-red-600 mt-1">{menu.error}</p>
              </div>
            </div>
          )}

          {menu.status === 'success' && (
            <>
              <MenuTabs topMenus={menu.topMenus} csvUrls={menu.csvUrls} />
              <GraphsSection imageUrls={menu.imageUrls} />
            </>
          )}
        </section>
      </main>
    </div>
  );
}
