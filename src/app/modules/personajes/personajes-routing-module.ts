import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPersonajes } from './pages/lista-personajes/lista-personajes';
import { CrearPersonaje } from './pages/crear-personaje/crear-personaje';
import { DetallePersonaje } from './pages/detalle-personaje/detalle-personaje';

const routes: Routes = [
  { path: '', component: ListaPersonajes },
  { path: 'crear', component: CrearPersonaje },
  { path: 'detalle/:id', component: DetallePersonaje }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonajesRoutingModule {}
