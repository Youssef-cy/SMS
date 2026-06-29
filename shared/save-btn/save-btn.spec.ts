import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveBtn } from './save-btn';

describe('SaveBtn', () => {
  let component: SaveBtn;
  let fixture: ComponentFixture<SaveBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveBtn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveBtn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
