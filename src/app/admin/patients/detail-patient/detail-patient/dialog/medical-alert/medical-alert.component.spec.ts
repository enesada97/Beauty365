import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalAlertComponent } from './medical-alert.component';

describe('MedicalAlertComponent', () => {
  let component: MedicalAlertComponent;
  let fixture: ComponentFixture<MedicalAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
