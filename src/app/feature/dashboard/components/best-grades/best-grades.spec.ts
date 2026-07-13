import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestGrades } from './best-grades';

describe('BestGrades', () => {
  let component: BestGrades;
  let fixture: ComponentFixture<BestGrades>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestGrades]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestGrades);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
