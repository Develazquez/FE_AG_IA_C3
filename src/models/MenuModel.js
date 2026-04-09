

export const initialMenuState = {
  status: 'idle', // idle | loading | success | error
  topMenus: [],   // array of 3 menu objects
  imageUrls: {},   // { evolucion, dashboard, descomposicion }
  csvUrls: [],
  error: null,
};

const BASE = 'http://localhost:8000';

/** Resolve a relative image path to a full URL */
export const resolveImageUrl = (path) => (path ? `${BASE}${path}` : '');

/** Resolve CSV download URLs */
export const resolveCsvUrl = (path) => (path ? `${BASE}${path}` : '');

/** Extract metric summary from a menu object */
export const getMetrics = (menu) => ({
  fitness: menu.fitness,
  costo: menu.costo,
  variedad: menu.variedad_platillos,
  densidad: menu.densidad_micro,
});
