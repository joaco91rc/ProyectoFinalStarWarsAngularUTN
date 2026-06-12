import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing-module';
import { Inicio } from './pages/inicio/inicio';

@NgModule({
  declarations: [
    Inicio
  ],
  imports: [
    CommonModule,
    InicioRoutingModule
  ]
})
export class InicioModule {}