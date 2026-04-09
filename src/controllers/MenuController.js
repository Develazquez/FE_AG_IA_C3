import { useState, useCallback } from 'react';
import { generarMenus } from '../services/api';
import { defaultConfig, validateConfig, buildPayload } from '../models/ConfigModel';
import { initialMenuState, resolveImageUrl, resolveCsvUrl } from '../models/MenuModel';


export const useMenuController = () => {
  const [config, setConfig] = useState({ ...defaultConfig });
  const [menu, setMenu] = useState({ ...initialMenuState });

  const updateConfig = useCallback((key, value) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }, []);

  const generate = useCallback(async () => {
    const errors = validateConfig(config);
    if (errors.length) {
      setMenu((prev) => ({ ...prev, status: 'error', error: errors.join('. ') }));
      return;
    }

    setMenu({ ...initialMenuState, status: 'loading' });

    try {
      const payload = buildPayload(config);
      const data = await generarMenus(payload);

      if (data.status !== 'success') {
        throw new Error('El backend no devolvió status success');
      }

      setMenu({
        status: 'success',
        topMenus: data.top_menus,
        imageUrls: {
          evolucion: resolveImageUrl(data.imagenes_urls?.evolucion),
          dashboard: resolveImageUrl(data.imagenes_urls?.dashboard),
          descomposicion: resolveImageUrl(data.imagenes_urls?.descomposicion),
        },
        csvUrls: (data.menus_csv_urls || []).map(resolveCsvUrl),
        error: null,
      });
    } catch (err) {
      setMenu({
        ...initialMenuState,
        status: 'error',
        error: err?.response?.data?.detail || err.message || 'Error desconocido',
      });
    }
  }, [config]);

  const reset = useCallback(() => {
    setMenu({ ...initialMenuState });
    setConfig({ ...defaultConfig });
  }, []);

  return { config, updateConfig, menu, generate, reset };
};
