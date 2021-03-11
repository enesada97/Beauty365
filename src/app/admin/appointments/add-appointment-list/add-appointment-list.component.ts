import { ProtocoltypeService } from './../../../core/service/protocoltype.service';
import { DepForDoctorsService } from "src/app/core/service/depfordoctors.service";
import { DepartmentService } from "./../../../core/service/department.service";
import { AppointmentService } from "./../../../core/service/appointment.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { DateAdapter } from "@angular/material/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Department } from "src/app/core/models/department.model";
import { Doctor } from "src/app/core/models/doctor.model";
import * as moment from "moment";
import { ProtocolType } from 'src/app/core/models/protocoltype.model';
import { AppointmentCreateDto } from 'src/app/core/models/create-appointments.model';

@Component({
  selector: "app-add-appointment-list",
  templateUrl: "./add-appointment-list.component.html",
  styleUrls: ["./add-appointment-list.component.sass"],
})
export class AddAppointmentListComponent implements OnInit {
  appointmentCreateDto: AppointmentCreateDto;
  createAppointmentsForm: FormGroup;
  departments: Department[];
  protocolTypes: ProtocolType[];
  doctors: Doctor[];
  constructor(
    private departmentService: DepartmentService,
    private protocoltypeService: ProtocoltypeService,
    private depForDoctorsService: DepForDoctorsService,
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private router: Router,
    private dateAdapter: DateAdapter<any>
  ) {
    this.dateAdapter.setLocale("tr");
    this.createAppointmentsForm = this.fb.group({
      startDate: [new Date(), [Validators.required]],
      finishDate: ["", [Validators.required]],
      departmentId: ["", [Validators.required]],
      protocolTypeId: ["", [Validators.required]],
      doctorId: ["", [Validators.required]],
      startTime: ["", [Validators.required]],
      finishTime: ["", [Validators.required]],
      rangeMinutes: ["", [Validators.required]],
    });
  }
  onOptionsSelected(value: any) {
    console.log("the selected value is " + value);
    this.depForDoctorsService
      .getDoctorListByDepId(value)
      .subscribe((data) => (this.doctors = data));
  }
  ngOnInit(): void {
    this.departmentService
      .getAll()
      .subscribe((data) => (this.departments = data));
    this.protocoltypeService
      .getAll()
      .subscribe((data) => (this.protocolTypes = data));
  }
  public onSubmit(): void {
    if (this.createAppointmentsForm.valid) {
      this.appointmentCreateDto = Object.assign(
        {},
        this.createAppointmentsForm.value
      );
      // this.patient.userId=this.authService.getCurrentUserId();
      this.appointmentService.CreateAppointmentList(this.appointmentCreateDto);
    }
  }
}
