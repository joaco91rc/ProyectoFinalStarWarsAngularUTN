export interface Personaje {
  id: number;
  nombre: string;
  canalHolonet: string;
  rango: string;
  estado: 'Activo' | 'Inactivo';
  lado: 'Jedi' | 'Sith';
  especie: string;
  planeta: string;
  edad: number;
  midiclorianos: number;
  creditos: number;        // 👈 nuevo
  imagen: string;
  sableId?: number;
}