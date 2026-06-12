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

  ngOnInit(): void {
    this.personajes = this.personajesService.getAll().map(p => ({
      ...p,
      colorRango: getRangoFuerza(p.midiclorianos, p.lado).color,
      moneda: getMoneda(p.lado),
    }));
  }

  activar(p: Personaje): void {
    this.personajesService.setActivo(p);
  }
}