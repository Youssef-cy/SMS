import { TestBed } from '@angular/core/testing';

import { MaterialS } from './material-s';

describe('MaterialS', () => {
  let service: MaterialS;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialS);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
