import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmp } from './add-emp';

describe('AddEmp', () => {
  let component: AddEmp;
  let fixture: ComponentFixture<AddEmp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEmp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
