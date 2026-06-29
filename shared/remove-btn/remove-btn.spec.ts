import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveBtn } from './remove-btn';

describe('RemoveBtn', () => {
  let component: RemoveBtn;
  let fixture: ComponentFixture<RemoveBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveBtn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveBtn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
