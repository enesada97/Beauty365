import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppointmentListComponent } from './add-appointment-list.component';

describe('AddAppointmentListComponent', () => {
  let component: AddAppointmentListComponent;
  let fixture: ComponentFixture<AddAppointmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAppointmentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAppointmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
