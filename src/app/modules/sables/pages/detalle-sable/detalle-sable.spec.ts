import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSable } from './detalle-sable';

describe('DetalleSable', () => {
  let component: DetalleSable;
  let fixture: ComponentFixture<DetalleSable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleSable],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleSable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
