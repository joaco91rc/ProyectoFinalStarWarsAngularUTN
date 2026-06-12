import { Sable } from '../models/sable';
import { Personaje } from '../models/personaje';
import { getRangoFuerza } from './midclorianos';

import { calcularPoderSable } from './poder-sable';

// Precio = poder × tarifa, con recargo por facción
// (la tecnología Sith es más cara de conseguir... y más ilegal)
const CREDITOS_POR_PUNTO_PODER = 8;

const RECARGO_FACCION: Record<string, number> = {
  'Orden Jedi': 1,
  'Imperio':    1.15,   // 15% de recargo del mercado negro
};



export interface PrecioCalculado {
  base: number;
  descuentoPorc: number;   // % por rango del comprador
  final: number;
}

export function calcularPrecioParaPersonaje(sable: Sable, personaje: Personaje): PrecioCalculado {
  const rango = getRangoFuerza(personaje.midiclorianos, personaje.lado);
  const base = sable.precio ?? 0;
  const final = Math.round(base * (1 - rango.descuento / 100));

  return { base, descuentoPorc: rango.descuento, final };
}

export function calcularPrecioSable(sable: { cristal?: string; empunadura?: string; faccion?: string }): number {
  const poder = calcularPoderSable(sable.cristal, sable.empunadura);
  const recargo = RECARGO_FACCION[sable.faccion ?? ''] ?? 1;
  return Math.round(poder * CREDITOS_POR_PUNTO_PODER * recargo / 100) * 100; // redondeado a centenas
}