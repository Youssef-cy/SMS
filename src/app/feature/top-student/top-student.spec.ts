import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopStudent } from './top-student';

describe('TopStudent', () => {
  let component: TopStudent;
  let fixture: ComponentFixture<TopStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopStudent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopStudent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
