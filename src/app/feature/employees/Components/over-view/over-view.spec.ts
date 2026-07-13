import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverView } from './over-view';

describe('OverView', () => {
  let component: OverView;
  let fixture: ComponentFixture<OverView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
