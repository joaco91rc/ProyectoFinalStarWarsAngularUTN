export interface RangoFuerza {
  min: number;
  nombre: string;
  color: string;
  descripcion: string;
  descuento: number; // % de descuento en la tienda
}

const DISTRIBUCION: { peso: number; min: number; max: number }[] = [
  { peso: 10, min: 1000,  max: 4999  },  // Sensible a la Fuerza / Acólito
  { peso: 20, min: 5000,  max: 7999  },  // Padawan / Aprendiz
  { peso: 30, min: 8000,  max: 11999 },  // Caballero / Guerrero  ⭐ el más común
  { peso: 25, min: 12000, max: 15999 },  // Maestro / Lord
  { peso: 12, min: 16000, max: 19999 },  // Gran Maestro / Darth
  { peso: 3,  min: 20000, max: 25000 },  // Elegido / Emperador 🌟 raro
];

const RANGOS_JEDI: RangoFuerza[] = [
  { min: 20000, nombre: 'Elegido de la Fuerza', color: '#ffd700', descripcion: 'Traerá balance a la Fuerza',      descuento: 30 },
  { min: 16000, nombre: 'Gran Maestro Jedi',    color: '#c84cff', descripcion: 'Líder del Consejo',               descuento: 25 },
  { min: 12000, nombre: 'Maestro Jedi',         color: '#00d4ff', descripcion: 'Nivel del Consejo Jedi',          descuento: 15 },
  { min: 8000,  nombre: 'Caballero Jedi',       color: '#39ff14', descripcion: 'Listo para portar un sable',      descuento: 10 },
  { min: 5000,  nombre: 'Padawan',              color: '#ff8c00', descripcion: 'Apto para entrenamiento',         descuento: 5 },
  { min: 0,     nombre: 'Sensible a la Fuerza', color: '#9aa7c7', descripcion: 'Percibe la Fuerza débilmente',    descuento: 0 },
];

const RANGOS_SITH: RangoFuerza[] = [
  { min: 20000, nombre: 'Emperador Sith', color: '#ffd700', descripcion: 'Poder ilimitadooo',                 descuento: 30 },
  { min: 16000, nombre: 'Darth',          color: '#c84cff', descripcion: 'Reservado a los más poderosos',     descuento: 25 },
  { min: 12000, nombre: 'Lord Sith',      color: '#ff3131', descripcion: 'Maestro del lado oscuro',           descuento: 15 },
  { min: 8000,  nombre: 'Guerrero Sith',  color: '#ff8c00', descripcion: 'Forjado en el odio',                descuento: 10 },
  { min: 5000,  nombre: 'Aprendiz Sith',  color: '#39ff14', descripcion: 'Siempre hay dos...',                descuento: 5 },
  { min: 0,     nombre: 'Acólito Oscuro', color: '#9aa7c7', descripcion: 'Atraído por el lado oscuro',        descuento: 0 },
];

export type Lado = 'Jedi' | 'Sith';

export function getRangoFuerza(midiclorianos: number, lado: Lado = 'Jedi'): RangoFuerza {
  const rangos = lado === 'Sith' ? RANGOS_SITH : RANGOS_JEDI;
  return rangos.find(r => midiclorianos >= r.min) ?? rangos[rangos.length - 1];
}

// Para cuando solo tenés el nombre del rango guardado (ej: personaje ya creado)
export function getDescuentoPorRango(nombreRango: string): number {
  const todos = [...RANGOS_JEDI, ...RANGOS_SITH];
  return todos.find(r => r.nombre === nombreRango)?.descuento ?? 0;
}

// Distribución sesgada: la mayoría saca valores bajos, los Elegidos son raros
export function generarMidclorianos(): number {
  const total = DISTRIBUCION.reduce((acc, b) => acc + b.peso, 0);
  let r = Math.random() * total;

  for (const banda of DISTRIBUCION) {
    if (r < banda.peso) {
      // uniforme dentro de la banda elegida
      return Math.round(banda.min + Math.random() * (banda.max - banda.min));
    }
    r -= banda.peso;
  }

  // fallback (no debería llegar nunca)
  return 8000;
}