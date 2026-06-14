import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Sable } from '../../../../core/models/sable';
import { SablesService } from '../../../../core/services/sables';
import { ChangeDetectorRef } from '@angular/core';
import { calcularPoderSable } from '../../../../core/utils/poder-sable';
import { getMoneda } from '../../../../core/utils/moneda';
import { OpcionCarrusel } from '../../../../shared/components/selector-carrusel/selector-carrusel';
import { calcularPrecioSable } from '../../../../core/utils/precio-sable';
import { PersonajesService } from '../../../../core/services/personajeService';

@Component({
  selector: 'app-crear-sable',
  standalone: false,
  templateUrl: './crear-sable.html',
  styleUrl: './crear-sable.css',
})
export class CrearSable {
  sable: Sable = {
    id: 0,
    nombre: '',
    color: '',
    cristal: '',
    faccion: '',
    empunadura: '',
    tipo: '',
    
    descripcion: '',
    imagen: '',
    precio: 0,
    descuento: 0,
   moneda:''
  };
 constructor(
    private sablesService: SablesService,
    private personajesService: PersonajesService, 
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}


  cristales = [
  { nombre: 'Azul', imagen: 'assets/img/creacion/cristales/kyberAzul.png' },
  { nombre: 'Verde', imagen: 'assets/img/creacion/cristales/kyberVerde.png' },
  { nombre: 'Purpura', imagen: 'assets/img/creacion/cristales/kyberPurpura.png' },
  { nombre: 'Amarillo', imagen: 'assets/img/creacion/cristales/kyberAmarillo.png' },
  { nombre: 'Rojo Sangrado Sintetico', imagen: 'assets/img/creacion/cristales/kyberRojoSintetico.png' },
  { nombre: 'Rojo Sangrado Comun ', imagen: 'assets/img/creacion/cristales/kyberRojoSangrado.png' },
  { nombre: 'Rojo Sangrado Antiguo', imagen: 'assets/img/creacion/cristales/kyberRojoAntiguo.png' },
  { nombre: 'Rojo Sangrado Corrupto', imagen: 'assets/img/creacion/cristales/kyberRojoCorrupto.png' },
  
];



facciones = [
  { nombre: 'Orden Jedi', imagen: 'assets/img/creacion/facciones/ordenJedi.png' },
  { nombre: 'Orden Sith', imagen: 'assets/img/creacion/facciones/ordenSith.png' }
];

  tipos = [
    'Una hoja',
   
    'Crossguard',
    
  ];

  empunadurasTodas = [
  // ===== JEDI =====
  { nombre: 'Empuñadura Anakin',   imagen: 'assets/img/creacion/empunaduras/jedis/empunaduraAnakin.png' },
  { nombre: 'Empuñadura Ahsoka',   imagen: 'assets/img/creacion/empunaduras/jedis/empunaduraAsooka.png' },
  { nombre: 'Empuñadura Luke',     imagen: 'assets/img/creacion/empunaduras/jedis/empunaduraLuke.png' },
  { nombre: 'Empuñadura Obi Wan',  imagen: 'assets/img/creacion/empunaduras/jedis/empunaduraObiWan.png' },
  { nombre: 'Empuñadura Qui Gon',  imagen: 'assets/img/creacion/empunaduras/jedis/empunaduraQuiGon.png' },
  { nombre: 'Empuñadura Yoda',     imagen: 'assets/img/creacion/empunaduras/jedis/empunaduraYoda.png' },
  { nombre: 'Empuñadura Windu',    imagen: 'assets/img/creacion/empunaduras/jedis/empunaduraWindu.png' },

  // ===== SITH =====
  { nombre: 'Empuñadura Darth Bane',    imagen: 'assets/img/creacion/empunaduras/siths/empunaduraDarthBane.png' },
  { nombre: 'Empuñadura Darth Maul',    imagen: 'assets/img/creacion/empunaduras/siths/empunaduraDarthMaul.png' },
  { nombre: 'Empuñadura Darth Revan',   imagen: 'assets/img/creacion/empunaduras/siths/empunaduraDarthRevan.png' },
  { nombre: 'Empuñadura Darth Sidious', imagen: 'assets/img/creacion/empunaduras/siths/empunaduraDarthSidious.png' },
  { nombre: 'Empuñadura Darth Vader',   imagen: 'assets/img/creacion/empunaduras/siths/empunaduraDarthVader.png' },
  { nombre: 'Empuñadura Dooku',         imagen: 'assets/img/creacion/empunaduras/siths/empunaduraDooku.png' },
  { nombre: 'Empuñadura Kylo Ren',      imagen: 'assets/img/creacion/empunaduras/siths/empunaduraKyloRen.png' },
];

empunaduras = [...this.empunadurasTodas];

 
forjado = false;
forjando = false;
private readonly EMPUNADURAS_POR_FACCION: Record<string, string[]> = {
  'Orden Jedi': [
    'Empuñadura Anakin',
    'Empuñadura Ahsoka',
    'Empuñadura Luke',
    'Empuñadura Obi Wan',
    'Empuñadura Qui Gon',
    'Empuñadura Yoda',
    'Empuñadura Windu',
  ],
  'Orden Sith': [
    'Empuñadura Darth Bane',
    'Empuñadura Darth Maul',
    'Empuñadura Darth Revan',
    'Empuñadura Darth Sidious',
    'Empuñadura Darth Vader',
    'Empuñadura Dooku',
    'Empuñadura Kylo Ren',
  ],
};

private readonly TIPO_POR_EMPUNADURA: Record<string, string> = {
  'Empuñadura Kylo Ren':    'Crossguard Sith',
  'Empuñadura Darth Maul':  'Doble hoja Sith',
  'Empuñadura Dooku':       'Hoja curva Sith',
  'Empuñadura Darth Bane':  'Hoja curva Sith',
};

seleccionarFaccion(faccion: any): void {
  this.sable.faccion = faccion.nombre;
  this.sable.moneda = getMoneda(faccion.nombre === 'Orden Sith' ? 'Sith' : 'Jedi').nombre;  // 👈

  const permitidas = this.EMPUNADURAS_POR_FACCION[faccion.nombre] ?? [];
  this.empunaduras = this.empunadurasTodas.filter(e => permitidas.includes(e.nombre));

  const esRojo = this.esCristalRojo(this.sable.cristal);
  if (faccion.nombre === 'Orden Sith' && !esRojo) this.sable.cristal = '';   // 👈
  if (faccion.nombre === 'Orden Jedi' && esRojo) this.sable.cristal = '';

  this.sable.empunadura = '';
  this.sable.tipo = '';
}
// dentro de la clase:
get poderSable(): number {
  return calcularPoderSable(this.sable.cristal, this.sable.empunadura);
}


get precioSable(): number {
  return calcularPrecioSable(this.sable);
}
obtenerClaseCristal(): string {
  const c = this.sable.cristal;
  if (this.esCristalRojo(c)) return 'cristal-rojo';

  switch (c) {
    case 'Azul':     return 'cristal-azul';
    case 'Verde':    return 'cristal-verde';
    case 'Purpura':  return 'cristal-violeta';
    case 'Amarillo': return 'cristal-amarillo';
    default:         return 'cristal-default';
  }
}


seleccionarCristal(cristal: any): void {
  this.sable.cristal = cristal.nombre;
}



seleccionarEmpunadura(empunadura: any): void {
  this.sable.empunadura = empunadura.nombre;

  this.sable.tipo =
    this.TIPO_POR_EMPUNADURA[empunadura.nombre]
    ?? (this.sable.faccion === 'Orden Sith' ? 'Una hoja Sith' : 'Hoja Jedi');
}

private esCristalRojo(nombre: string): boolean {
  return nombre.trim().startsWith('Rojo');   // 👈 trim() por el espacio en "Rojo Sangrado Comun "
}

get cristalesDisponibles(): any[] {
  const personaje = this.personajesService.getActivo();
  const rangosAltos = ['Maestro Jedi', 'Gran Maestro Jedi', 'Elegido de la Fuerza'];
  const puedeUsarPurpura = rangosAltos.includes(personaje?.rango ?? '');

  if (this.sable.faccion === 'Orden Sith') {          // 👈
    return this.cristales.filter(c => this.esCristalRojo(c.nombre));
  }

  if (this.sable.faccion === 'Orden Jedi') {
    return this.cristales.filter(c => {
      if (this.esCristalRojo(c.nombre)) return false;
      if (c.nombre === 'Purpura') return puedeUsarPurpura;
      return true;
    });
  }

  return this.cristales;
}
  

 

forjarSable(): void {

  if (
    !this.sable.nombre ||
    !this.sable.cristal ||
    !this.sable.faccion ||
    !this.sable.empunadura
  ) {
    alert('Completá todos los datos para forjar el sable.');
    return;
  }

  if (this.sable.faccion === 'Orden Sith' && !this.esCristalRojo(this.sable.cristal)) {   // 👈
    alert('⚠️ Los Sith utilizan únicamente cristales rojos sangrados.');
    return;
  }

if (this.sable.faccion === 'Orden Jedi' && this.esCristalRojo(this.sable.cristal)) {
  alert('⚠️ Los Jedi no utilizan cristales sangrados.');
  return;
}

  this.forjando = true;
  this.forjado = false;

  setTimeout(() => {

    this.sable.imagen = this.obtenerImagenSablePorCristal(this.sable.cristal);
    this.sable.color = this.sable.cristal;
    this.sable.precio = calcularPrecioSable(this.sable); 
    const nuevoSable: Sable = {
      ...this.sable
    };

    this.sablesService.add(nuevoSable);

    this.forjando = false;
    this.forjado = true;

    this.cdr.detectChanges();

  }, 1800);
}

obtenerImagenSablePorCristal(cristal: string): string {
  if (this.sable.empunadura === 'Empuñadura Kylo Ren') {
    return 'assets/img/creacion/sables/sableKylo.png';
  }

  if (this.esCristalRojo(cristal)) {
    return 'assets/img/creacion/sables/sableRojo.png';
  }

  switch (cristal) {
    case 'Azul':     return 'assets/img/creacion/sables/sableAzul.png';
    case 'Verde':    return 'assets/img/creacion/sables/sableVerde.png';
    case 'Purpura':  return 'assets/img/creacion/sables/sableVioleta.png';
    case 'Amarillo': return 'assets/img/creacion/sables/sableAmarillo.png'; // si tenés el asset
    default:         return 'assets/img/creacion/sables/sableAzul.png';
  }
}

tipoModal: 'cristal' | 'faccion' | 'empunadura' | null = null;
abrirCarrusel(tipo: 'cristal' | 'faccion' | 'empunadura'): void {
  this.tipoModal = tipo;
}

cerrarCarrusel(): void {
  this.tipoModal = null;
}

get tituloModal(): string {
  switch (this.tipoModal) {
    case 'cristal':    return 'Seleccionar Cristal Kyber';
    case 'faccion':    return 'Elegí tu Destino';
    case 'empunadura': return 'Seleccionar Empuñadura';
    default:           return '';
  }
}

get opcionesModal(): OpcionCarrusel[] {
  switch (this.tipoModal) {
    case 'cristal':    return this.cristalesDisponibles;
    case 'faccion':    return this.facciones;
    case 'empunadura': return this.empunaduras;
    default:           return [];
  }
}

onSeleccionCarrusel(opcion: OpcionCarrusel): void {
  switch (this.tipoModal) {
    case 'cristal':    this.seleccionarCristal(opcion);    break;
    case 'faccion':    this.seleccionarFaccion(opcion);    break;
    case 'empunadura': this.seleccionarEmpunadura(opcion); break;
  }
  this.tipoModal = null;
}
}