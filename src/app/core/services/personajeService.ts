// core/services/personajes.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Personaje } from '../models/personaje';

@Injectable({ providedIn: 'root' })
export class PersonajesService {
  private personajes: Personaje[] = [
  {
    id: 1,
    nombre: 'Luke Skywalker',
    canalHolonet: 'luke@holonet.gal',
    rango: 'Maestro Jedi',
    estado: 'Activo',
    lado: 'Jedi',
    especie: 'Humano',
    planeta: 'Tatooine',
    edad: 28,
    midiclorianos: 14500,
    creditos: 25000,
    imagen: 'assets/img/personajes/luke.jpg',
    sableId: 1,
  },
  {
    id: 2,
    nombre: 'Darth Vader',
    canalHolonet: 'vader@imperio.gal',
    rango: 'Darth',
    estado: 'Activo',
    lado: 'Sith',
    especie: 'Humano',
    planeta: 'Tatooine',
    edad: 45,
    midiclorianos: 19000,
    creditos: 50000,
    imagen: 'assets/img/personajes/darthVader.jpg',
    sableId: 2,
  },
  {
    id: 3,
    nombre: 'Yoda',
    canalHolonet: 'yoda@holonet.gal',
    rango: 'Gran Maestro Jedi',
    estado: 'Activo',
    lado: 'Jedi',
    especie: 'Desconocida',
    planeta: 'Dagobah',
    edad: 900,
    midiclorianos: 17800,
    creditos: 32000,
    imagen: 'assets/img/personajes/yoda.jpg',
  },
];
private siguienteId = 4;

constructor() {
  if (this.personajes.length) {
    this.setActivo(this.personajes[0]);
  }
}

  private activoSubject = new BehaviorSubject<Personaje | null>(null);
  activo$ = this.activoSubject.asObservable();

  getAll(): Personaje[] {
    return this.personajes;
  }

  getById(id: number): Personaje | undefined {
    return this.personajes.find(p => p.id === id);
  }

  add(personaje: Personaje): Personaje {
    personaje.id = this.siguienteId++;
    this.personajes.push(personaje);

    // El primero que se crea queda activo automáticamente
    if (!this.activoSubject.value) {
      this.setActivo(personaje);
    }
    return personaje;
  }

  setActivo(personaje: Personaje): void {
    this.activoSubject.next(personaje);
  }

  getActivo(): Personaje | null {
    return this.activoSubject.value;
  }
}