import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Personaje } from '../../../../core/models/personaje';
import { PersonajesService } from '../../../../core/services/personajeService';
import { getRangoFuerza, RangoFuerza } from '../../../../core/utils/midclorianos';
import { getMoneda } from '../../../../core/utils/moneda';
import { OpcionCarrusel } from '../../../../shared/components/selector-carrusel/selector-carrusel';

@Component({
  selector: 'app-crear-personaje',
  standalone: false,
  templateUrl: './crear-personaje.html',
  styleUrl: './crear-personaje.css',
})
export class CrearPersonaje {

  personaje: Personaje = {
    id: 0,
    nombre: '',
    canalHolonet: '',
    rango: '',
    estado: 'Activo',
    lado: 'Jedi',
    especie: '',
    planeta: '',
    edad: 0,
    midiclorianos: 0,
    creditos: 10000,
    imagen: '',
    sableId: undefined,
  };

  planetas: OpcionCarrusel[] = [
    { nombre: 'Tatooine',  imagen: 'assets/img/creacion/planetas/tatooine.png' },
    { nombre: 'Coruscant', imagen: 'assets/img/creacion/planetas/coruscant.png' },
    { nombre: 'Naboo',     imagen: 'assets/img/creacion/planetas/naboo.png' },
    { nombre: 'Dagobah',   imagen: 'assets/img/creacion/planetas/dagobah.png' },
    { nombre: 'Mustafar',  imagen: 'assets/img/creacion/planetas/mustafar.png' },
  ];

  especies: string[] = [
    'Humano', 'Togruta', 'Twi\'lek', 'Wookiee', 'Zabrak',
    'Mirialana', 'Chiss', 'Rodiano', 'Mon Calamari', 'Yoda (especie desconocida)',
  ];

  rangoCalculado?: RangoFuerza;
  testCompletado = false;
  modalPlanetaAbierto = false;
  usuarioHolonet = '';

  constructor(
    private personajesService: PersonajesService,
    private router: Router
  ) {}

  selectEspecieAbierto = false;
  selectLadoAbierto = false;
  get moneda() {
    return getMoneda(this.personaje.lado);
  }

  get imagenPlaneta(): string {
    return this.planetas.find(p => p.nombre === this.personaje.planeta)?.imagen ?? '';
  }

  abrirModalPlaneta(): void {
    this.modalPlanetaAbierto = true;
  }

  onPlanetaSeleccionado(opcion: OpcionCarrusel): void {
    this.personaje.planeta = opcion.nombre;
    this.modalPlanetaAbierto = false;
  }

  onResultadoTest(midiclorianos: number): void {
    this.personaje.midiclorianos = midiclorianos;
    this.rangoCalculado = getRangoFuerza(midiclorianos, this.personaje.lado);
    this.personaje.rango = this.rangoCalculado.nombre;
    this.testCompletado = true;
  }

  onCambioLado(): void {
  this.personaje.imagen = '';
  
  // 👈 reset del test
  this.testCompletado = false;
  this.rangoCalculado = undefined;
  this.personaje.midiclorianos = 0;
  this.personaje.rango = '';
}

  

  onUsuarioHolonetChange(valor: string): void {
    this.usuarioHolonet = valor
      .toLowerCase()
      .trim()
      .replace(/@.*$/, '')
      .replace(/[^a-z0-9._-]/g, '');
    this.personaje.canalHolonet = this.usuarioHolonet
      ? `${this.usuarioHolonet}@holonet.gal`
      : '';
  }

  crearPersonaje(): void {
    if (!this.personaje.nombre || !this.personaje.especie || !this.personaje.planeta) {
      alert('Completá los datos del personaje.');
      return;
    }
    if (!this.personaje.imagen) {
      alert('Elegí la apariencia del personaje.');
      return;
    }
    if (!this.testCompletado) {
      alert('🧬 Primero hacé el test de midiclorianos.');
      return;
    }
    if (!this.usuarioHolonet) {
      alert('Ingresá tu usuario de Holonet.');
      return;
    }
    const nuevo = this.personajesService.add({ ...this.personaje });
    this.personajesService.setActivo(nuevo);
    this.router.navigate(['/personajes']);
  }
}