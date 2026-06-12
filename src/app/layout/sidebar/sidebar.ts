import { Component, inject } from '@angular/core';
import { PersonajesService } from '../../core/services/personajeService';
import { getMoneda } from '../../core/utils/moneda';
import { getRangoFuerza } from '../../core/utils/midclorianos';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private personajesService = inject(PersonajesService);

  activo$ = this.personajesService.activo$;

  getMoneda = getMoneda;

  getColorRango(p: { midiclorianos: number; lado: 'Jedi' | 'Sith' }): string {
    return getRangoFuerza(p.midiclorianos, p.lado).color;
  }
}