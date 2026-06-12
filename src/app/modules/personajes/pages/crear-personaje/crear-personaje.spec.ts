import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPersonaje } from './crear-personaje';

describe('CrearJedi', () => {
  let component: CrearPersonaje;
  let fixture: ComponentFixture<CrearPersonaje>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearPersonaje],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearPersonaje);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
