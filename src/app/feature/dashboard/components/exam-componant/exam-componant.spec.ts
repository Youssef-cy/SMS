import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamComponant } from './exam-componant';

describe('ExamComponant', () => {
  let component: ExamComponant;
  let fixture: ComponentFixture<ExamComponant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamComponant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamComponant);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
