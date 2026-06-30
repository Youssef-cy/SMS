import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRow } from './student-row';

describe('StudentRow', () => {
  let component: StudentRow;
  let fixture: ComponentFixture<StudentRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentRow],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentRow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
