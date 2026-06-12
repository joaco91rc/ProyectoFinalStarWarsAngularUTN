import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMidclorianos } from './test-midclorianos';

describe('TestMidclorianos', () => {
  let component: TestMidclorianos;
  let fixture: ComponentFixture<TestMidclorianos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestMidclorianos],
    }).compileComponents();

    fixture = TestBed.createComponent(TestMidclorianos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
