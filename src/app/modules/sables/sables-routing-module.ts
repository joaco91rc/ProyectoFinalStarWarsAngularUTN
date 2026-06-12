import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaSables } from './pages/lista-sables/lista-sables';
import { DetalleSable } from './pages/detalle-sable/detalle-sable';
import { CrearSable } from './pages/crear-sable/crear-sable';

const routes: Routes = [
  {
    path: '',
    component: ListaSables
  },
  {
    path: 'crear',
    component: CrearSable
  },
  {
    path: 'detalle/:id',
    component: DetalleSable
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SablesRoutingModule {}