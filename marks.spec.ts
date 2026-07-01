import { TestBed } from '@angular/core/testing';

import { Marks } from './marks';

describe('Marks', () => {
  let service: Marks;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Marks);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
