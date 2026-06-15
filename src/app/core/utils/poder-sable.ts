const PODER_CRISTAL: Record<string, number> = {
  'kyber verde':   1400,
  'kyber azul':    1300,
  'kyber rojo':    1500,
  'kyber corrupto':1500,
  'kyber violeta': 1600,
  'kyber purpura': 1600, // 👈
  'kyber amarillo':1350, // 👈
};

const MULTIPLICADOR_EMPUNADURA: Record<string, number> = {
  'yoda':    1.5,
  'anakin':  1.4,
  'windu':   1.45,
  'qui gon': 1.3,
  'luke':    1.35,
  'obi wan': 1.3,
  'ahsoka':  1.25,
  'vader':   1.45,
  'sidious': 1.5,
  'revan':   1.4,
  'maul':    1.35,
  'bane':    1.4,
  'dooku':   1.3,
  'kylo':    1.35,
};

const norm = (s?: string) =>
  (s ?? '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

// 👈 extrae la palabra clave de la empuñadura
const normEmpunadura = (s?: string) => {
  const n = norm(s);
  // saca el prefijo "empunadura " si existe
  return n.replace('empunadura ', '').trim();
};

// 👈 extrae la palabra clave del cristal
const normCristal = (s?: string) => {
  const n = norm(s);
  // saca el prefijo "kyber " y todo lo que venga después de la primera palabra del color
  // "kyber rojo sangrado sintetico" → "kyber rojo"
  const match = n.match(/kyber (azul|verde|purpura|amarillo|rojo|corrupto|violeta)/);
  return match ? match[0] : n;
};

export function calcularPoderSable(cristal?: string, empunadura?: string): number {
  const base = PODER_CRISTAL[normCristal(cristal)] ?? 1000;
  const mult = MULTIPLICADOR_EMPUNADURA[normEmpunadura(empunadura)] ?? 1;
  return Math.round(base * mult);
}
