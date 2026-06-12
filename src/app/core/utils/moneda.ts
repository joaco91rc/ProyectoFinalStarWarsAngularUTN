import { Lado } from './midclorianos';

export interface Moneda {
  nombre: string;
  simbolo: string;
}

const MONEDAS: Record<Lado, Moneda> = {
  Jedi: { nombre: 'Créditos de la Republica',  simbolo: '◈' },
  Sith: { nombre: 'Créditos del Imperio', simbolo: '⬡' },
};

export function getMoneda(lado: Lado): Moneda {
  return MONEDAS[lado];
}