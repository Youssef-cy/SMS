import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNotifications } from './create-notifications';

describe('CreateNotifications', () => {
  let component: CreateNotifications;
  let fixture: ComponentFixture<CreateNotifications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNotifications]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNotifications);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
