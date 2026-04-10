import { useState } from 'react';
import { BarChart3, LayoutDashboard, PieChart, X, Download } from 'lucide-react';

const graphMeta = [
  { key: 'evolucion', label: 'Evolución del Fitness', icon: BarChart3 },
  { key: 'dashboard', label: 'Dashboard Nutricional', icon: LayoutDashboard },
  { key: 'descomposicion', label: 'Descomposición del Fitness', icon: PieChart },
];

export default function GraphsSection({ imageUrls }) {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!imageUrls || !imageUrls.evolucion) return null;

  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading image:', error);
      window.open(url, '_blank');
    }
  };

  return (
    <>
      <div className="animate-fade-up space-y-4">
        <h3 className="font-display text-lg font-bold text-brand-800">Gráficas del Algoritmo</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 stagger">
          {graphMeta.map(({ key, label, icon: Icon }) => (
            <div 
              key={key} 
              className="bg-white rounded-xl border border-sand-200 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group"
              onClick={() => setSelectedImage({ url: imageUrls[key], title: label })}
            >
              <div className="px-4 py-2 bg-sand-50 border-b border-sand-100 flex items-center gap-1.5 text-xs font-semibold text-brand-700">
                <Icon size={14} /> {label}
              </div>
              <div className="relative overflow-hidden">
                <img
                  src={imageUrls[key]}
                  alt={label}
                  className="w-full h-auto object-cover group-hover:scale-105 group-hover:opacity-90 transition-all duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white/90 backdrop-blur-sm text-brand-800 font-medium px-4 py-2 rounded-full shadow-lg text-sm">
                    Ampliar gráfica
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-sm animate-fade-in" 
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative flex flex-col items-center animate-fade-up w-full max-w-6xl" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Toolbar */}
            <div className="absolute -top-14 right-0 flex gap-3">
              <button
                onClick={() => handleDownload(selectedImage.url, `${selectedImage.title.replace(/\s+/g, '_')}.png`)}
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors flex items-center justify-center shadow-lg"
                title="Descargar"
              >
                <Download size={24} />
              </button>
              <button 
                onClick={() => setSelectedImage(null)}
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors flex items-center justify-center shadow-lg"
                title="Cerrar"
              >
                <X size={24} />
              </button>
            </div>
            
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full max-h-[85vh] object-contain rounded-xl shadow-2xl bg-white/5"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/50 backdrop-blur-md rounded-full text-white/90 text-sm font-medium">
              {selectedImage.title}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
