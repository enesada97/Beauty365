import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentProcessComponent } from './appointment-process.component';

describe('AppointmentProcessComponent', () => {
  let component: AppointmentProcessComponent;
  let fixture: ComponentFixture<AppointmentProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
