import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

interface Avatar {
  nombre: string;
  imagen: string;
  faccion: 'Jedi' | 'Sith';
}

@Component({
  selector: 'app-avatar-picker',
  standalone: false,
  templateUrl: './avatar-picker.html',
  styleUrl: './avatar-picker.css'
})
export class AvatarPicker implements OnChanges {
  @Input() lado: 'Jedi' | 'Sith' = 'Jedi';
  @Input() seleccionado: string = '';
  @Output() avatarElegido = new EventEmitter<string>();

  modalAbierto = false;
  avataresFiltrados: Avatar[] = [];

  readonly avataresTodos: Avatar[] = [
    { nombre: 'Anakin Skywalker', imagen: 'assets/img/personajes/jedis/anakin.jpg',           faccion: 'Jedi' },
    { nombre: 'Ahsoka Tano',      imagen: 'assets/img/personajes/jedis/asoka.webp',           faccion: 'Jedi' },
    { nombre: 'Luke Skywalker',   imagen: 'assets/img/personajes/jedis/luke.jpg',             faccion: 'Jedi' },
    { nombre: 'Obi-Wan Kenobi',   imagen: 'assets/img/personajes/jedis/obiwan.jpg',           faccion: 'Jedi' },
    { nombre: 'Qui-Gon Jinn',     imagen: 'assets/img/personajes/jedis/quigon.jpg',           faccion: 'Jedi' },
    { nombre: 'Rey',              imagen: 'assets/img/personajes/jedis/rey.webp',             faccion: 'Jedi' },
    { nombre: 'Mace Windu',       imagen: 'assets/img/personajes/jedis/windu.jpg',            faccion: 'Jedi' },
    { nombre: 'Yoda',             imagen: 'assets/img/personajes/jedis/yoda.jpg',             faccion: 'Jedi' },
    { nombre: 'Darth Maul',       imagen: 'assets/img/personajes/siths/darthMaul.webp',       faccion: 'Sith' },
    { nombre: 'Darth Plagueis',   imagen: 'assets/img/personajes/siths/darthPlagueis.jpg',    faccion: 'Sith' },
    { nombre: 'Darth Sidious',    imagen: 'assets/img/personajes/siths/darthSidious.jpg',     faccion: 'Sith' },
    { nombre: 'Darth Vader',      imagen: 'assets/img/personajes/siths/darthVader.jpg',       faccion: 'Sith' },
    { nombre: 'Conde Dooku',      imagen: 'assets/img/personajes/siths/dooku.jpg',            faccion: 'Sith' },
    { nombre: 'Kylo Ren',         imagen: 'assets/img/personajes/siths/kyloRen.webp',         faccion: 'Sith' },
  ];

  get nombreSeleccionado(): string {
    return this.avataresTodos.find(a => a.imagen === this.seleccionado)?.nombre ?? '';
  }

  ngOnChanges(): void {
    this.avataresFiltrados = this.avataresTodos.filter(a => a.faccion === this.lado);
  }

  abrirModal(): void { this.modalAbierto = true; }
  cerrarModal(): void { this.modalAbierto = false; }

  elegir(avatar: Avatar): void {
    this.avatarElegido.emit(avatar.imagen);
    this.cerrarModal();
  }
}