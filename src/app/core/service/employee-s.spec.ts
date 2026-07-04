import { TestBed } from '@angular/core/testing';

import { EmployeeS } from './employee-s';

describe('EmployeeS', () => {
  let service: EmployeeS;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeS);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
