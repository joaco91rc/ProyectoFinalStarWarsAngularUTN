import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { SablesService } from '../../../../core/services/sables';
import { PersonajesService } from '../../../../core/services/personajeService';
import { Personaje } from '../../../../core/models/personaje';
import { getMoneda } from '../../../../core/utils/moneda';

type EstadoJuego = 'idle' | 'esperando' | 'ahora' | 'resultado' | 'fallo';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements OnInit {
  private sablesService = inject(SablesService);
  private personajesService = inject(PersonajesService);
  private cdr = inject(ChangeDetectorRef);

  // ===== Stats =====
  totalSables = 0;
  totalPersonajes = 0;
  cristalTop = '—';
  planetaTop = '—';

  // ===== Minijuego =====
  activo: Personaje | null = null;
  estado: EstadoJuego = 'idle';
  tiempoReaccion = 0;
  creditosGanados = 0;
  intentosRestantes = 5;

  private timeoutId?: ReturnType<typeof setTimeout>;
  private inicioSenal = 0;

  getMoneda = getMoneda;

  ngOnInit(): void {
    this.calcularStats();
    this.personajesService.activo$.subscribe(p => {
      this.activo = p;
      this.cdr.detectChanges();
    });
  }

  private calcularStats(): void {
    const sables = this.sablesService.getAll();
    const personajes = this.personajesService.getAll();

    this.totalSables = sables.length;
    this.totalPersonajes = personajes.length;
    this.cristalTop = this.masFrecuente(sables.map(s => s.cristal));
    this.planetaTop = this.masFrecuente(personajes.map(p => p.planeta));
  }

  // Genérico: devuelve el valor más repetido de una lista
  private masFrecuente(valores: string[]): string {
    if (!valores.length) return '—';

    const conteo = new Map<string, number>();
    for (const v of valores) {
      conteo.set(v, (conteo.get(v) ?? 0) + 1);
    }

    return [...conteo.entries()].sort((a, b) => b[1] - a[1])[0][0];
  }

  // ===== Minijuego: Reflejos Jedi =====
 iniciarJuego(): void {
  if (!this.activo || this.intentosRestantes <= 0) return;

  this.estado = 'esperando';
  this.cdr.detectChanges();        // 👈 muestra "Concentrate..."

  const demora = 1500 + Math.random() * 3000;

  this.timeoutId = setTimeout(() => {
    this.estado = 'ahora';
    this.inicioSenal = performance.now();
    this.cdr.detectChanges();      // 👈 sin esto nunca aparece el verde
  }, demora);
}

reaccionar(): void {
  if (this.estado === 'esperando') {
    clearTimeout(this.timeoutId);
    this.estado = 'fallo';
    this.intentosRestantes--;
    if (this.activo) {
      this.activo.creditos = Math.max(0, this.activo.creditos - 500);
      this.personajesService.setActivo(this.activo);
    }
    this.cdr.detectChanges();      // 👈
    return;
  }

  if (this.estado !== 'ahora') return;

  this.tiempoReaccion = Math.round(performance.now() - this.inicioSenal);
  this.creditosGanados = this.calcularRecompensa(this.tiempoReaccion);
  this.intentosRestantes--;
  this.estado = 'resultado';

  if (this.activo && this.creditosGanados !== 0) {
    this.activo.creditos = Math.max(0, this.activo.creditos + this.creditosGanados);
    this.personajesService.setActivo(this.activo);
  }

  this.cdr.detectChanges();        // 👈
}

  // + gana, - pierde
private calcularRecompensa(ms: number): number {
  if (ms < 250) return 2000;   // reflejos de Elegido
  if (ms < 350) return 1200;
  if (ms < 500) return 700;
  if (ms < 700) return 200;    // justito, premio simbólico
  if (ms < 900) return -300;   // 👈 zona roja: te dormiste
  return -800;                 // 👈 ¿estabas mirando el celular?
}

 get mensajeResultado(): string {
  if (this.tiempoReaccion < 250) return '¡Reflejos del Elegido!';
  if (this.tiempoReaccion < 350) return 'Digno de un Maestro Jedi';
  if (this.tiempoReaccion < 500) return 'Buen instinto, Caballero';
  if (this.tiempoReaccion < 700) return 'Un Padawan con futuro';
  if (this.tiempoReaccion < 900) return 'Demasiado lento... el blaster te dio';
  return 'Un droide oxidado reacciona más rápido';
}
}