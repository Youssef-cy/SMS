import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SIdeNav } from './side-nav';

describe('SIdeNav', () => {
  let component: SIdeNav;
  let fixture: ComponentFixture<SIdeNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SIdeNav]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SIdeNav);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
