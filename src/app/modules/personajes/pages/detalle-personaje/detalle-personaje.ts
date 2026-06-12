import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Personaje } from '../../../../core/models/personaje';
import { Sable } from '../../../../core/models/sable';
import { PersonajesService } from '../../../../core/services/personajeService';
import { SablesService } from '../../../../core/services/sables';
import { getRangoFuerza, RangoFuerza } from '../../../../core/utils/midclorianos';
import { getMoneda, Moneda } from '../../../../core/utils/moneda';
import { getTemaSable, SableColorTheme } from '../../../../core/utils/sable-colors';
import { calcularPoderSable } from '../../../../core/utils/poder-sable';
import { calcularPrecioParaPersonaje, PrecioCalculado } from '../../../../core/utils/precio-sable';
import { calcularPrecioSable } from '../../../../core/utils/precio-sable';


interface SableEnVenta extends Sable {
  precioCalc: PrecioCalculado;
  alcanza: boolean;
}
@Component({
  selector: 'app-detalle-personaje',
  standalone: false,
  templateUrl: './detalle-personaje.html',
  styleUrl: './detalle-personaje.css',
})
export class DetallePersonaje implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private personajesService = inject(PersonajesService);
  private sablesService = inject(SablesService);

  personaje?: Personaje;
  rango?: RangoFuerza;
  moneda?: Moneda;

  sable?: Sable;
  temaSable?: SableColorTheme;
  poderSable = 0;

  esActivo = false;
  modalSableAbierto = false;
  sablesDisponibles: SableEnVenta[] = [];

  precio = 0;
monedaInfo?: Moneda;
  precioSable = 0;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.personaje = this.personajesService.getById(id);

    if (!this.personaje) {
      this.router.navigate(['/personajes']);
      return;
    }

    this.cargarDatos();
  }

  private cargarDatos(): void {
    if (!this.personaje) return;

    this.rango = getRangoFuerza(this.personaje.midiclorianos, this.personaje.lado);
    this.moneda = getMoneda(this.personaje.lado);
    this.esActivo = this.personajesService.getActivo()?.id === this.personaje.id;

    // Sable asignado
    if (this.personaje.sableId) {
  this.sable = this.sablesService.getById(this.personaje.sableId);
  if (this.sable) {
    this.temaSable = getTemaSable(this.sable.color);
    this.poderSable = calcularPoderSable(this.sable.cristal, this.sable.empunadura);
    this.precioSable = this.sable.precio || calcularPrecioSable(this.sable);   // 👈 acá
  }
} else {
  this.sable = undefined;
}
  }

  // ===== Test de ADN (para personajes sin midiclorianos) =====
  get necesitaTest(): boolean {
    return !this.personaje?.midiclorianos;
  }

  onResultadoTest(valor: number): void {
    if (!this.personaje) return;
    this.personaje.midiclorianos = valor;
    this.cargarDatos(); // recalcula rango con el nuevo valor
  }

  // ===== Activar =====
  activar(): void {
    if (!this.personaje) return;
    this.personajesService.setActivo(this.personaje);
    this.esActivo = true;
  }

  // ===== Asignar sable =====
 abrirModalSable(): void {
  if (!this.personaje) return;

  this.sablesDisponibles = this.sablesService.getAll().map(s => {
    const precioCalc = calcularPrecioParaPersonaje(s, this.personaje!);
    return {
      ...s,
      precioCalc,
      alcanza: this.personaje!.creditos >= precioCalc.final,
    };
  });

  this.modalSableAbierto = true;
}

comprarSable(s: SableEnVenta): void {
  if (!this.personaje) return;

  if (!s.alcanza) {
    alert(`⚠️ Créditos insuficientes. Necesitás ${s.precioCalc.final.toLocaleString()} y tenés ${this.personaje.creditos.toLocaleString()}.`);
    return;
  }

  this.personaje.creditos -= s.precioCalc.final;
  this.personaje.sableId = s.id;
  this.modalSableAbierto = false;
  this.cargarDatos();

  // si es el activo, refrescamos el sidebar
  if (this.esActivo) {
    this.personajesService.setActivo(this.personaje);
  }
}

  asignarSable(s: Sable): void {
    if (!this.personaje) return;
    this.personaje.sableId = s.id;
    this.modalSableAbierto = false;
    this.cargarDatos();
  }

  quitarSable(): void {
    if (!this.personaje) return;
    this.personaje.sableId = undefined;
    this.cargarDatos();
  }

  verSable(): void {
    if (this.sable) {
      this.router.navigate(['/sables/detalle', this.sable.id]);
    }
  }

  volver(): void {
    this.router.navigate(['/personajes']);
  }
}