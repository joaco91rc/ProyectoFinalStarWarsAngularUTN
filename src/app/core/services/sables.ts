import { Injectable } from '@angular/core';
import { Sable } from '../models/sable';

@Injectable({
  providedIn: 'root'
})
export class SablesService {

 private sables: Sable[] = [
  {
    id: 1,
    nombre: 'Sable de Luke Skywalker',
    color: 'Verde',
    cristal: 'Verde',
    faccion: 'Orden Jedi',
    empunadura: 'Empuñadura Anakin',
    tipo: 'Una hoja Jedi',
    descripcion: 'Sable construido por Luke tras perder el sable de Anakin.',
    imagen: 'assets/img/creacion/sables/sableVerde.png',
    precio: 12000,
    moneda: 'Créditos Galácticos',
  },
  {
    id: 2,
    nombre: 'Sable de Darth Vader',
    color: 'Rojo',
    cristal: 'Rojo',
    faccion: 'Imperio',
    empunadura: 'Empuñadura Sith',
    tipo: 'Una hoja Sith',
    descripcion: 'Arma oscura del Lord Sith más temido del Imperio.',
    imagen: 'assets/img/creacion/sables/sableRojo.png',
    precio: 15000,
    moneda: 'Créditos del Imperio',
  },
  {
    id: 3,
    nombre: 'Sable de Mace Windu',
    color: 'Violeta',
    cristal: 'Violeta',
    faccion: 'Orden Jedi',
    empunadura: 'Empuñadura Yoda',
    tipo: 'Una hoja Jedi',
    descripcion: 'Sable único de hoja violeta, símbolo de equilibrio y poder.',
    imagen: 'assets/img/creacion/sables/sableVioleta.png',
    precio: 18000,
    moneda: 'Créditos Galácticos',
  }
];

  getAll(): Sable[] {
    return this.sables;
  }

  getById(id: number): Sable | undefined {
    return this.sables.find(sable => sable.id === id);
  }

  add(sable: Sable): void {
    sable.id = this.sables.length + 1;
    this.sables.push(sable);
  }

  delete(id: number): void {
    this.sables = this.sables.filter(sable => sable.id !== id);
  }
}