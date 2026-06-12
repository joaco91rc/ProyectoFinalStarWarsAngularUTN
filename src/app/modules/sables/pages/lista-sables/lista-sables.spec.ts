import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSables } from './lista-sables';

describe('ListaSables', () => {
  let component: ListaSables;
  let fixture: ComponentFixture<ListaSables>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaSables],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaSables);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
