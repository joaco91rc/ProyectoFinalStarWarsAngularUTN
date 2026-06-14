import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Sable } from '../../../../core/models/sable';
import { SablesService } from '../../../../core/services/sables';
import { getTemaSable, SableColorTheme } from '../../../../core/utils/sable-colors';
import { calcularPoderSable } from '../../../../core/utils/poder-sable';
import { calcularPrecioSable } from '../../../../core/utils/precio-sable';
import { getMoneda, Moneda } from '../../../../core/utils/moneda';
import { getEmpunaduraImagen, getCristalImagen } from '../../../../core/utils/sable-media';


@Component({
  selector: 'app-detalle-sable',
  standalone: false,
  templateUrl: './detalle-sable.html',
  styleUrl: './detalle-sable.css',
})
export class DetalleSable implements OnInit {
  sable?: Sable;
  tema: SableColorTheme = getTemaSable();
  poder = 0;
  precio = 0;
  monedaInfo?: Moneda;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sablesService: SablesService
  ) {}
slideActivo = 0;
getEmpunaduraImagen = getEmpunaduraImagen;
getCristalImagen = getCristalImagen;
  

ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.sable = this.sablesService.getById(id);

  if (!this.sable) {
    this.router.navigate(['/sables']);
    return;
  }

  this.tema = getTemaSable(this.sable.color);
  this.poder = calcularPoderSable(this.sable.cristal, this.sable.empunadura);
  this.precio = this.sable.precio || calcularPrecioSable(this.sable);                    // 👈
  this.monedaInfo = getMoneda(this.sable.faccion === 'Imperio' ? 'Sith' : 'Jedi');       // 👈
}

  volver(): void {
    this.router.navigate(['/sables']);
  }

  prevSlide(): void {
  this.slideActivo = this.slideActivo === 0 ? 2 : this.slideActivo - 1;
}

nextSlide(): void {
  this.slideActivo = this.slideActivo === 2 ? 0 : this.slideActivo + 1;
}
}