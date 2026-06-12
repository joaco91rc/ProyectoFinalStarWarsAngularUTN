// shared/shared-module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorCarrusel } from './components/selector-carrusel/selector-carrusel';

@NgModule({
  declarations: [SelectorCarrusel],
  imports: [CommonModule],
  exports: [SelectorCarrusel],
})
export class SharedModule {}