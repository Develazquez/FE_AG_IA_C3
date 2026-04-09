/**
 * ConfigModel — pure state & helpers for user configuration.
 * No React, no DOM.
 */

export const defaultConfig = {
  edad_min: 6,
  edad_max: 9,
  presupuesto_max: 2000,
  sexo: 'ambos',
  ingredientes_disponibles: null,
  tamano_poblacion: 100,
  generaciones: 150,
};

/** Validate the config before sending to the API */
export const validateConfig = (cfg) => {
  const errors = [];
  if (cfg.edad_min < 3 || cfg.edad_min > 17) errors.push('Edad mínima debe estar entre 3 y 17');
  if (cfg.edad_max < cfg.edad_min) errors.push('Edad máxima debe ser ≥ edad mínima');
  if (cfg.edad_max > 18) errors.push('Edad máxima debe ser ≤ 18');
  if (cfg.presupuesto_max < 500 || cfg.presupuesto_max > 10000) errors.push('Presupuesto entre $500 y $10,000');
  return errors;
};

/** Build the payload from the config state */
export const buildPayload = (cfg) => ({
  edad_min: Number(cfg.edad_min),
  edad_max: Number(cfg.edad_max),
  presupuesto_max: Number(cfg.presupuesto_max),
  sexo: cfg.sexo,
  ingredientes_disponibles: cfg.ingredientes_disponibles,
  tamano_poblacion: Number(cfg.tamano_poblacion),
  generaciones: Number(cfg.generaciones),
});
