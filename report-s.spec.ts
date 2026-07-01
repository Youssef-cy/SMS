import { TestBed } from '@angular/core/testing';

import { ReportS } from './report-s';

describe('ReportS', () => {
  let service: ReportS;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportS);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
