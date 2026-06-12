import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSable } from './crear-sable';

describe('CrearSable', () => {
  let component: CrearSable;
  let fixture: ComponentFixture<CrearSable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearSable],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearSable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
