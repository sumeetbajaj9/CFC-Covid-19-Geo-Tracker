import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayTrackingComponent } from './day-tracking.component';

describe('DayTrackingComponent', () => {
  let component: DayTrackingComponent;
  let fixture: ComponentFixture<DayTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
