import { ProtocolTypeProcessDto } from './../../../../core/models/protocolTypeProcessDto.model';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { Patient } from "src/app/core/models/patient.model";
import { ProtocoltypeService } from "src/app/core/service/protocoltype.service";
import { ProtocolType } from "src/app/core/models/protocoltype.model";
import { Protocol } from "src/app/core/models/protocol.model";
import { ProtocolService } from "src/app/core/service/protocol.service";
import { Department } from "src/app/core/models/department.model";
import { DepartmentService } from "src/app/core/service/department.service";
import { DepForDoctorsService } from "src/app/core/service/depfordoctors.service";
import { Doctor } from "src/app/core/models/doctor.model";
import { InstitutionService } from "src/app/core/service/institution.service";
import { Institution } from "src/app/core/models/institution.model";
import { PatientService } from "src/app/core/service/patient.service";
import { ProtocolDto } from "src/app/core/models/protocoldto";
import { AppointmentService } from "src/app/core/service/appointment.service";
import { Appointment } from "src/app/core/models/appointment.model";
import { DateAdapter } from "@angular/material/core";
import { HttpErrorResponse } from "@angular/common/http";
import { ProtocolTypeProcessService } from "src/app/core/service/protocol-type-process.service";
import { Working } from 'src/app/core/models/working.model';
import { ProtocolTypeProcess } from 'src/app/core/models/protocolTypeProcess.model';
import { WorkingService } from 'src/app/core/service/working.service';

@Component({
  selector: "app-add-protocol-dialog",
  templateUrl: "./add-protocol-dialog.component.html",
  styleUrls: ["./add-protocol-dialog.component.sass"],
  providers: [
    ProtocoltypeService,
    ProtocolService,
    DepartmentService,
    DepForDoctorsService,
    InstitutionService,
    PatientService,
    AppointmentService,
  ],
})
export class AddProtocolDialogComponent {
  action: string;
  dialogTitle: string;
  protocolForm: FormGroup;
  protocol: Protocol;
  protocolTypes: ProtocolType[];
  patient: Patient;
  departments: Department[];
  doctors: Doctor[];
  institutions: Institution[];
  appointment: Appointment;
  protocolDto: ProtocolDto;
  working: Working;
  constructor(
    public dialogRef: MatDialogRef<AddProtocolDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public protocolTypeService: ProtocoltypeService,
    private protocolService: ProtocolService,
    private departmentService: DepartmentService,
    private depForDoctorsService: DepForDoctorsService,
    private institutionService: InstitutionService,
    private patientService: PatientService,
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private dateAdapter: DateAdapter<any>,
    private protocolTypeProcessService:ProtocolTypeProcessService,
    private workingService:WorkingService
  ) {
    // Set the defaults
    this.dateAdapter.setLocale("tr");
    this.action = data.action;
    if (this.action === "add") {
      this.data.patient.gender == true
        ? (this.dialogTitle =
            data.patient.name + " Bey" + " için yeni protokol")
        : (this.dialogTitle =
            data.patient.name + " Hanım" + " için yeni protokol");
      this.protocol = new Protocol({});
      this.patient = data.patient;
    } else {
      this.protocolDto = data.protocolDto;
      this.protocolService
        .getById(this.protocolDto.protocolNo)
        .subscribe((data) => (this.protocol = data));
      console.log(this.protocol);
      this.patientService
        .getById(this.protocol.patientDataId)
        .subscribe((data) => (this.patient = data));
      console.log(this.patient);
      this.dialogTitle = "Protokolü Düzenle";
    }
    this.protocolForm = this.createContactForm();
  }
  onOptionsSelected(value: any) {
    console.log("the selected value is " + value);
    this.depForDoctorsService.getDoctorListByDepId(value).subscribe((data) => {
      this.doctors = data;
      if (this.action == "add"&&this.doctors[0].id) {
        this.protocolForm.get("doctorId").setValue(this.doctors[0].id);
      }
    });
  }
  ngOnInit(): void {
    this.protocolTypeService.getAllProtocolTypesForAny().subscribe((data) => {
      this.protocolTypes = data;
      if (this.action == "add"&&this.protocolTypes[0].id) {
        this.protocolForm
          .get("protocolTypeId")
          .setValue(this.protocolTypes[0].id);
      }
    });
    this.departmentService.getAll().subscribe((data) => {
      this.departments = data;
      if (this.action == "add"&&this.departments[0].id) {
        this.protocolForm.get("departmentId").setValue(this.departments[0].id);
        this.onOptionsSelected(this.departments[0].id);
      }
    });
    this.institutionService.getAll().subscribe((data) => {
      this.institutions = data;
      if (this.action == "add"&&this.institutions[0].id) {
        this.protocolForm
          .get("institutionId")
          .setValue(this.institutions[0].id);
      }
    });
  }
  formControl = new FormControl("", [
    Validators.required,
    // Validators.email,
  ]);
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.protocol.id],
      patientDataId: [this.patient.id],
      departmentId: [this.protocol.departmentId, [Validators.required]],
      doctorId: [this.protocol.doctorId, [Validators.required]],
      institutionId: [this.protocol.institutionId, [Validators.required]],
      protocolTypeId: [this.protocol.protocolTypeId, [Validators.required]],
      dateOfCome: [this.protocol.dateOfCome],
      dateOfLeave: [this.protocol.dateOfLeave],
      status: [this.protocol.status],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  // public confirmAdd(): void {
  //   if (this.protocolForm.valid) {
  //     this.appointment = new Appointment({});
  //     this.protocol.patientDataId = this.patient.id;
  //     this.protocol = Object.assign({}, this.protocolForm.value);
  //     this.protocol.dateOfCome = new Date();
  //     this.protocol.dateOfLeave = new Date();
  //     // this.patient.userId=this.authService.getCurrentUserId();
  //     this.protocolService.addProtocol(this.protocol).subscribe((m) => {
  //       this.appointmentService
  //         .getByIdentity(this.patient.identityNumber, this.protocol.doctorId)
  //         .subscribe((data) => {
  //           data ? (this.appointment = data) : null;
  //           this.appointment.protocolId = m.id;
  //           if (
  //             this.appointment.id != 0 &&
  //             new Date(this.appointment.date).getDate() == new Date().getDate()
  //           ) {
  //             this.appointment.status = true;
  //             this.appointment.surName = this.patient.surName;
  //             this.appointment.name = this.patient.name;
  //             this.appointment.phoneNumber = "" + this.patient.phoneNumber;
  //             this.appointment.identityNumber =
  //               "" + this.patient.identityNumber;
  //             this.appointmentService
  //               .save(this.appointment)
  //               .subscribe((data) => {
  //                 console.log(data);
  //                 console.log(this.appointment);
  //                 this.appointmentService._sweetAlert.success(
  //                   "" +
  //                     data["protocolId"] +
  //                     " numaralı protokole daha önceden oluşturulmuş randevu ile eşleştirildi"
  //                 );
  //               });
  //           } else {
  //             this.appointment.createdAppointmentDateTime = this.protocol.dateOfCome;
  //             this.appointment.arriveDateTime = new Date();
  //             //this.appointment.date=this.protocol.dateOfCome;
  //             this.appointment.date = this.protocol.dateOfCome;
  //             this.appointment.departmentId = this.protocol.departmentId;
  //             this.appointment.doctorId = this.protocol.doctorId;
  //             this.appointment.identityNumber =
  //               "" + this.patient.identityNumber;
  //             this.appointment.name = this.patient.name;
  //             this.appointment.patientDataId = this.patient.id;
  //             this.appointment.patientHasArrive = true;
  //             this.appointment.phoneNumber = "" + this.patient.phoneNumber;
  //             this.appointment.protocolTypeId = this.protocol.protocolTypeId;
  //             this.appointment.status = true;
  //             this.appointment.surName = this.patient.surName;
  //             this.appointment.time = new Date().toLocaleTimeString();
  //             //DateTime? olmalı backend null gidebilmeli
  //             this.appointment.inspectionStartDateTime = new Date();
  //             this.appointment.inspectionEndDateTime = new Date();
  //             this.appointmentService
  //               .save(this.appointment)
  //               .subscribe((data) => {
  //                 console.log(data);
  //                 console.log(this.appointment);
  //                 this.appointmentService._sweetAlert.success(
  //                   "" +
  //                     data["protocolId"] +
  //                     " numaralı protokole randevu açıldı"
  //                 );
  //               });
  //           }
  //         });
  //     });
  //   }
  // }
  public confirmAdd(): void {
    if (this.protocolForm.valid) {
      this.protocol.patientDataId = this.patient.id;
      this.protocol = Object.assign({}, this.protocolForm.value);
      // this.patient.userId=this.authService.getCurrentUserId();

      this.protocolService.save(this.protocol).subscribe((m) => {
        if (m) {
          console.log(JSON.stringify(m));
          //working kısmı
          this.protocolTypeProcessService.GetListForDefaultProcesses(m.data.protocolTypeId,m.data.doctorId).subscribe(ptp=>{
            this.working=new Working({});
            const protocolTypeProcesses:ProtocolTypeProcess[]=ptp;
            protocolTypeProcesses.forEach(item=>{
              this.working.doctorId=item.doctorId;
              this.working.doctorRatio=item.doctorRatio;
              this.working.price=item.price;
              this.working.processId=item.processId;
              this.working.protocolId=m.data.id;
              this.working.taxRatio=item.taxRatio;
              this.working.quantity = 1;
              this.working.paidValue = 0;
              this.working.arrearsValue = item.price;
              this.workingService.save(this.working).subscribe(
                (wr) => {
                },
                (error: HttpErrorResponse) => {
                  console.log(error.name + " " + error.message);
                }
              );
            })
          });
          this.appointmentService
            .getByIdentity(this.patient.identityNumber, this.protocol.doctorId)
            .subscribe((data) => {
              console.log(JSON.stringify(data));
              this.appointment = new Appointment({});
              if (data) {
                this.appointment = data;
                this.appointment.protocolId = m.data.id;
                this.appointment.arriveDateTime = new Date();
                this.appointment.patientHasArrive = true;
              }
              this.appointmentService.save(this.appointment).subscribe(
                (ap) => {
                  this.dialogRef.close(m.data.id);
                }
              );
            },
            (error: HttpErrorResponse) => {
              this.appointment = new Appointment({});
              console.log(error.name + " " + error.message);
              console.log(this.appointment.date);
              let test=new Date();
              console.log("test"+test);
                this.appointment.time = this.appointment.date
                  .getHours()
                  .toString()+":00";
                this.appointment.identityNumber = this.patient.identityNumber;
                this.appointment.name = this.patient.name;
                this.appointment.surName = this.patient.surName;
                this.appointment.phoneNumber = this.patient.phoneNumber;
                this.appointment.patientDataId = this.patient.id;
                this.appointment.protocolId = m.data.id;
                this.appointment.doctorId = m.data.doctorId;
                this.appointment.departmentId = m.data.departmentId;
                this.appointment.protocolTypeId = m.data.protocolTypeId;
                this.appointment.createdAppointmentDateTime = this.appointment.date;
                this.appointment.arriveDateTime = this.appointment.date;
                this.appointment.patientHasArrive = true;
                this.appointmentService.save(this.appointment).subscribe(
                  (ap) => {
                    this.dialogRef.close(m.data.id);
                  }
                );
              }
          );
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
    }
  }
}
