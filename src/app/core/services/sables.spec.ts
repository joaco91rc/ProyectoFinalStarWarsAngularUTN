import { TestBed } from '@angular/core/testing';

import { Sables } from './sables';

describe('Sables', () => {
  let service: Sables;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Sables);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
