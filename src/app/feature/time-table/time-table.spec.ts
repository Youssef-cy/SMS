import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Timetable } from './time-table';

describe('Timetable', () => {
  let component: Timetable;
  let fixture: ComponentFixture<Timetable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Timetable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Timetable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
