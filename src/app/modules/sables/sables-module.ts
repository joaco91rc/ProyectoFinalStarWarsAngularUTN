import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SablesRoutingModule } from './sables-routing-module';
import { ListaSables } from './pages/lista-sables/lista-sables';
import { DetalleSable } from './pages/detalle-sable/detalle-sable';
import { CrearSable } from './pages/crear-sable/crear-sable';
import { SharedModule } from '../../shared/shared-module';

@NgModule({
  declarations: [ListaSables, DetalleSable, CrearSable],
  imports: [CommonModule, SablesRoutingModule, FormsModule, SharedModule],
})
export class SablesModule {}
