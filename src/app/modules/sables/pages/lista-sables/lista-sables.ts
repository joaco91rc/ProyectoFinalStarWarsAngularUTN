import { Component, OnInit } from '@angular/core';
import { Sable } from '../../../../core/models/sable';
import { SablesService } from '../../../../core/services/sables';
import { getTemaSable, SableColorTheme} from '../../../../core/utils/sable-colors';
import { calcularPoderSable } from '../../../../core/utils/poder-sable';
import { calcularPrecioSable } from '../../../../core/utils/precio-sable';
import { getMoneda, Moneda } from '../../../../core/utils/moneda';

interface SableConTema extends Sable {
  tema: SableColorTheme;
  poder: number;
  precioCalc: number;
  monedaInfo: Moneda;
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
    precioCalc: s.precio || calcularPrecioSable(s),  // usa el guardado o calcula
    monedaInfo: getMoneda(s.faccion === 'Imperio' ? 'Sith' : 'Jedi'),
  }));
}
}