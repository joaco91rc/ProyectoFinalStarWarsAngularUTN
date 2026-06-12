const PODER_CRISTAL: Record<string, number> = {
  'kyber verde':    1400,
  'kyber azul':     1300,
  'kyber rojo':     1500, // corrupto pero potente
  'kyber corrupto': 1500,
  'kyber violeta':  1600,
};

const MULTIPLICADOR_EMPUNADURA: Record<string, number> = {
  'yoda':   1.5,
  'anakin': 1.4,
  'obiwan': 1.3,
  'kylo':   1.35,
  'sith':   1.45,
};

const norm = (s?: string) =>
  (s ?? '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export function calcularPoderSable(cristal?: string, empunadura?: string): number {
  const base = PODER_CRISTAL[norm(cristal)] ?? 1000;
  const mult = MULTIPLICADOR_EMPUNADURA[norm(empunadura)] ?? 1;
  return Math.round(base * mult);
}