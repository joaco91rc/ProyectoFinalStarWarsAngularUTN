import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonajesRoutingModule } from './personajes-routing-module';
import { ListaPersonajes } from './pages/lista-personajes/lista-personajes';
import { DetallePersonaje } from './pages/detalle-personaje/detalle-personaje';
import { CrearPersonaje } from './pages/crear-personaje/crear-personaje';
import { TestMidclorianos } from './components/test-midclorianos/test-midclorianos';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared-module';


@NgModule({
  declarations: [ListaPersonajes, DetallePersonaje, CrearPersonaje, TestMidclorianos],
  imports: [CommonModule, PersonajesRoutingModule, FormsModule, SharedModule],
})
export class PersonajesModule {}
