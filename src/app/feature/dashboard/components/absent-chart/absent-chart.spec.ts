import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsentChart } from './absent-chart';

describe('AbsentChart', () => {
  let component: AbsentChart;
  let fixture: ComponentFixture<AbsentChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbsentChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbsentChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
