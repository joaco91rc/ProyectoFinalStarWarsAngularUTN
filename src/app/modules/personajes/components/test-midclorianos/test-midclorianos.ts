import { Component, EventEmitter, Input, Output } from '@angular/core';
import { generarMidclorianos, getRangoFuerza, RangoFuerza , Lado} from '../../../../core/utils/midclorianos';

type EstadoTest = 'idle' | 'analizando' | 'resultado';

@Component({
  selector: 'app-test-midiclorianos',
  standalone: false,
  templateUrl: './test-midclorianos.html',
  styleUrl: './test-midclorianos.css',
})
export class TestMidclorianos {
  @Output() resultado = new EventEmitter<number>();
  @Input() faccion: Lado = 'Jedi';
  estado: EstadoTest = 'idle';
  valorMostrado = 0;
  valorFinal = 0;
  rango?: RangoFuerza;

  iniciarTest(): void {
    this.estado = 'analizando';
    this.valorFinal = generarMidclorianos();

    const duracion = 3000;       // 3 segundos de "análisis"
    const inicio = performance.now();

    const animar = (ahora: number) => {
      const progreso = Math.min((ahora - inicio) / duracion, 1);

      if (progreso < 0.7) {
        // fase caótica: números random
        this.valorMostrado = Math.round(1000 + Math.random() * 24000);
      } else {
        // fase de convergencia: se acerca al valor real
        const t = (progreso - 0.7) / 0.3;
        const suavizado = 1 - Math.pow(1 - t, 3); // ease-out
        this.valorMostrado = Math.round(
          this.valorMostrado + (this.valorFinal - this.valorMostrado) * suavizado
        );
      }

      if (progreso < 1) {
        requestAnimationFrame(animar);
      } else {
        this.valorMostrado = this.valorFinal;
        this.rango = getRangoFuerza(this.valorFinal, this.faccion);
        this.estado = 'resultado';
        this.resultado.emit(this.valorFinal);
      }
    };

    requestAnimationFrame(animar);
  }
}