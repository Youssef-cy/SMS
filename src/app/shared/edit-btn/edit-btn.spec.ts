import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBtn } from './edit-btn';

describe('EditBtn', () => {
  let component: EditBtn;
  let fixture: ComponentFixture<EditBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBtn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBtn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
