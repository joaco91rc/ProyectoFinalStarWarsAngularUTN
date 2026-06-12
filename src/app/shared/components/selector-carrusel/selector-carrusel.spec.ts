import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorCarrusel } from './selector-carrusel';

describe('SelectorCarrusel', () => {
  let component: SelectorCarrusel;
  let fixture: ComponentFixture<SelectorCarrusel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectorCarrusel],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectorCarrusel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
