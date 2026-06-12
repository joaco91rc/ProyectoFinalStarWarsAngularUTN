import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface OpcionCarrusel {
  nombre: string;
  imagen: string;
}

@Component({
  selector: 'app-selector-carrusel',
  standalone: false,
  templateUrl: './selector-carrusel.html',
  styleUrl: './selector-carrusel.css',
})
export class SelectorCarrusel {
  @Input() titulo = 'Seleccionar';
  @Input() opciones: OpcionCarrusel[] = [];
  @Input() abierto = false;

@Input() ajusteImagen: 'cover' | 'contain' = 'contain';
  @Output() seleccion = new EventEmitter<OpcionCarrusel>();
  @Output() cerrado = new EventEmitter<void>();

  indice = 0;

  get actual(): OpcionCarrusel | undefined {
    return this.opciones[this.indice];
  }

  siguiente(): void {
    this.indice = (this.indice + 1) % this.opciones.length;
  }

  anterior(): void {
    this.indice = (this.indice - 1 + this.opciones.length) % this.opciones.length;
  }

  seleccionar(): void {
    if (this.actual) {
      this.seleccion.emit(this.actual);
      this.cerrar();
    }
  }

  cerrar(): void {
    this.indice = 0;
    this.cerrado.emit();
  }
}