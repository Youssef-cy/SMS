import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelBtn } from './cancel-btn';

describe('CancelBtn', () => {
  let component: CancelBtn;
  let fixture: ComponentFixture<CancelBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelBtn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelBtn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
