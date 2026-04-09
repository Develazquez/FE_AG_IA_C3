import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 500000, // 500s — the GA can take a while
  headers: { 'Content-Type': 'application/json' },
});

/**
 * POST /api/generar-menus
 * @param {object} config — matches the backend schema
 * @returns {Promise<object>} — full response data
 */
export const generarMenus = async (config) => {
  const { data } = await api.post('/api/generar-menus', config);
  return data;
};

export default api;
