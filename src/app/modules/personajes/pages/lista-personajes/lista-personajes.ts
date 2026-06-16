import { Component, OnInit, inject } from '@angular/core';
import { Personaje } from '../../../../core/models/personaje';
import { PersonajesService } from '../../../../core/services/personajeService';
import { getRangoFuerza } from '../../../../core/utils/midclorianos';
import { getMoneda, Moneda } from '../../../../core/utils/moneda';

interface PersonajeVista extends Personaje {
  colorRango: string;
  moneda: Moneda;
}

@Component({
  selector: 'app-lista-personajes',
  standalone: false,
  templateUrl: './lista-personajes.html',
  styleUrl: './lista-personajes.css',
})
export class ListaPersonajes implements OnInit {
  private personajesService = inject(PersonajesService);

  personajes: PersonajeVista[] = [];
  activo$ = this.personajesService.activo$;

  private mapearPersonajes(): PersonajeVista[] {
  return this.personajesService.getAll().map(p => ({
    ...p,
    colorRango: getRangoFuerza(p.midiclorianos, p.lado).color,
    moneda: getMoneda(p.lado),
  }));
}

  ngOnInit(): void {
  this.personajes = this.mapearPersonajes();
}

  activar(p: Personaje): void {
    this.personajesService.setActivo(p);
  }

  personajeAEliminar: PersonajeVista | null = null;

eliminar(p: PersonajeVista): void {
  this.personajeAEliminar = p;
}

cancelarEliminar(): void {
  this.personajeAEliminar = null;
}

confirmarEliminar(): void {
  if (!this.personajeAEliminar) return;
  this.personajesService.eliminar(this.personajeAEliminar.id);
  this.personajes = this.mapearPersonajes();
  this.personajeAEliminar = null;
}
}