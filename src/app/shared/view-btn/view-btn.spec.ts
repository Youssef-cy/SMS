import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBtn } from './view-btn';

describe('ViewBtn', () => {
  let component: ViewBtn;
  let fixture: ComponentFixture<ViewBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewBtn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBtn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
