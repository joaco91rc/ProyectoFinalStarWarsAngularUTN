import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaJedis } from './lista-personajes';

describe('ListaJedis', () => {
  let component: ListaJedis;
  let fixture: ComponentFixture<ListaJedis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaJedis],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaJedis);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
