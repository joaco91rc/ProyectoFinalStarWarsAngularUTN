import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Personaje } from '../../../../core/models/personaje';
import { PersonajesService } from '../../../../core/services/personajeService';
import { getRangoFuerza, RangoFuerza } from '../../../../core/utils/midclorianos';
import { getMoneda } from '../../../../core/utils/moneda';
import { OpcionCarrusel } from '../../../../shared/components/selector-carrusel/selector-carrusel';
import {  ChangeDetectorRef, inject } from '@angular/core';

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
    creditos: 10000, // créditos iniciales
    imagen: '',
    sableId: undefined,
  };
private cdr = inject(ChangeDetectorRef);
  planetas: OpcionCarrusel[] = [
  { nombre: 'Tatooine',  imagen: 'assets/img/creacion/planetas/tatooine.png' },
  { nombre: 'Coruscant', imagen: 'assets/img/creacion/planetas/coruscant.png' },
  { nombre: 'Naboo',     imagen: 'assets/img/creacion/planetas/naboo.png' },
  { nombre: 'Dagobah',   imagen: 'assets/img/creacion/planetas/dagobah.png' },
  { nombre: 'Mustafar',  imagen: 'assets/img/creacion/planetas/mustafar.png' }
  
];

especies: string[] = [
  'Humano',
  'Togruta',
  'Twi\'lek',
  'Wookiee',
  'Zabrak',
  'Mirialana',
  'Chiss',
  'Rodiano',
  'Mon Calamari',
  'Yoda (especie desconocida)',
];

  rangoCalculado?: RangoFuerza;
  testCompletado = false;

  modalPlanetaAbierto = false;



  constructor(
    private personajesService: PersonajesService,
    private router: Router
  ) {}

  get moneda() {
    return getMoneda(this.personaje.lado);
  }

  abrirModalPlaneta(): void {
  this.modalPlanetaAbierto = true;
}

onPlanetaSeleccionado(opcion: OpcionCarrusel): void {
  this.personaje.planeta = opcion.nombre;
  this.modalPlanetaAbierto = false;
}

get imagenPlaneta(): string {
  return this.planetas.find(p => p.nombre === this.personaje.planeta)?.imagen ?? '';
}

  onResultadoTest(midiclorianos: number): void {
    this.personaje.midiclorianos = midiclorianos;
    this.rangoCalculado = getRangoFuerza(midiclorianos, this.personaje.lado);
    this.personaje.rango = this.rangoCalculado.nombre;
    this.testCompletado = true;
  }

  // Si cambia de lado DESPUÉS del test, recalculamos el rango con el mismo número
  onCambioLado(): void {
    if (this.testCompletado) {
      this.rangoCalculado = getRangoFuerza(this.personaje.midiclorianos, this.personaje.lado);
      this.personaje.rango = this.rangoCalculado.nombre;
    }
  }

  crearPersonaje(): void {
    if (!this.personaje.nombre || !this.personaje.especie || !this.personaje.planeta) {
      alert('Completá los datos del personaje.');
      return;
    }
    if (!this.personaje.imagen) {
  this.personaje.imagen = 'assets/img/jedis/default.png'; // si tenés un placeholder
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

 imagenPreview: string | null = null;
cargandoImagen = false;

onImagenSeleccionada(event: Event): void {
  const input = event.target as HTMLInputElement;
  const archivo = input.files?.[0];
  if (!archivo) return;

  if (!archivo.type.startsWith('image/')) {
    alert('El archivo tiene que ser una imagen.');
    return;
  }

  this.cargandoImagen = true;
  this.imagenPreview = null;

  const reader = new FileReader();

  reader.onload = async () => {
  const original = reader.result as string;
  this.imagenPreview = await this.redimensionar(original);
  this.personaje.imagen = this.imagenPreview;
  this.cargandoImagen = false;
  input.value = '';
  this.cdr.detectChanges();
};

  reader.onerror = () => {
    this.cargandoImagen = false;
    this.cdr.detectChanges();   // 👈 acá también
    alert('No se pudo leer la imagen. Probá con otra.');
  };

  reader.readAsDataURL(archivo);
}

private redimensionar(dataUrl: string, maxLado = 400): Promise<string> {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const escala = Math.min(1, maxLado / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * escala);
      canvas.height = Math.round(img.height * escala);
      canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', 0.85));
    };
    img.src = dataUrl;
  });
}

usuarioHolonet = '';

private normalizarUsuarioHolonet(valor: string): string {
  return valor
    .toLowerCase()
    .trim()
    .replace(/@.*$/, '')          // si pegó un mail completo, le sacamos el dominio
    .replace(/[^a-z0-9._-]/g, ''); // solo caracteres válidos de usuario
}

onUsuarioHolonetChange(valor: string): void {
  this.usuarioHolonet = this.normalizarUsuarioHolonet(valor);
  this.personaje.canalHolonet = this.usuarioHolonet
    ? `${this.usuarioHolonet}@holonet.gal`
    : '';
}
}