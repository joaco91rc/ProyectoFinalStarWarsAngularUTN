import { Component, OnInit } from '@angular/core';
import { Sable } from '../../../../core/models/sable';
import { SablesService } from '../../../../core/services/sables';
import { getTemaSable, SableColorTheme } from '../../../../core/utils/sable-colors';
import { calcularPoderSable } from '../../../../core/utils/poder-sable';
import { calcularPrecioSable } from '../../../../core/utils/precio-sable';
import { getMoneda, Moneda } from '../../../../core/utils/moneda';
import { getEmpunaduraImagen, getCristalImagen } from '../../../../core/utils/sable-media';

interface SableConTema extends Sable {
  tema: SableColorTheme;
  poder: number;
  precioCalc: number;
  monedaInfo: Moneda;
   slideActivo: number; 
}

@Component({
  selector: 'app-lista-sables',
  standalone: false,
  templateUrl: './lista-sables.html',
  styleUrl: './lista-sables.css',
})
export class ListaSables implements OnInit {
  sables: SableConTema[] = [];

  constructor(private sablesService: SablesService) {}

  ngOnInit(): void {
  this.sables = this.sablesService.getAll().map(s => ({
    ...s,
    tema: getTemaSable(s.color),
    poder: calcularPoderSable(s.cristal, s.empunadura),
    precioCalc: s.precio || calcularPrecioSable(s),
    monedaInfo: getMoneda(s.faccion === 'Imperio' ? 'Sith' : 'Jedi'),
    slideActivo: 0, // 👈 arranca en slide 1
  }));
}

// métodos del carrusel
prevSlide(sable: SableConTema): void {
  sable.slideActivo = sable.slideActivo === 0 ? 2 : sable.slideActivo - 1;
}

nextSlide(sable: SableConTema): void {
  sable.slideActivo = sable.slideActivo === 2 ? 0 : sable.slideActivo + 1;
}

// exponés las funciones al template
getEmpunaduraImagen = getEmpunaduraImagen;
getCristalImagen = getCristalImagen;
}