// shared/shared-module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorCarrusel } from './components/selector-carrusel/selector-carrusel';
import { AvatarPicker } from './components/avatar-picker/avatar-picker';

@NgModule({
  declarations: [SelectorCarrusel, AvatarPicker],
  imports: [CommonModule],
  exports: [SelectorCarrusel, AvatarPicker],
})
export class SharedModule {}
