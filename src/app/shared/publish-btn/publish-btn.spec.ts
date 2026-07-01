import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishBtn } from './publish-btn';

describe('PublishBtn', () => {
  let component: PublishBtn;
  let fixture: ComponentFixture<PublishBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublishBtn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishBtn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
