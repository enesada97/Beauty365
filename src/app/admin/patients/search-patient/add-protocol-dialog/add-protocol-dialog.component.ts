import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject, OnInit } from "@angular/core";
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
import { ProtocolTypeProcessService } from "src/app/core/service/protocol-type-process.service";
import { Working } from "src/app/core/models/working.model";
import { ProtocolTypeProcess } from "src/app/core/models/protocolTypeProcess.model";
import { WorkingService } from "src/app/core/service/working.service";
import { AuthService } from "src/app/core/service/system-service/auth.service";

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
export class AddProtocolDialogComponent implements OnInit {
  action: string;
  protocolForm: FormGroup;
  protocol: Protocol;
  protocolTypes: ProtocolType[];
  patient: Patient;
  departments: Department[];
  doctors: Doctor[];
  institutions: Institution[];
  appointment: Appointment;
  addWithAppointment: Appointment;
  protocolDto: ProtocolDto;
  working: Working;
  userName:string;
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
    private protocolTypeProcessService: ProtocolTypeProcessService,
    private workingService: WorkingService,
    private authService:AuthService
  ) {
    // Set the defaults
    this.dateAdapter.setLocale("tr");
    this.action = data.action;
    if (this.action === "add") {
      this.data.patient.gender == true
      this.protocol = new Protocol({});
      this.patient = data.patient;
    } else if (this.action === "addFromAppointment") {
      this.userName=data.userName;
      this.protocol = new Protocol({});
      this.addWithAppointment = data.appointment;
      this.patient = data.patient;
      this.protocol.protocolTypeId = this.addWithAppointment.protocolTypeId;
      this.protocol.departmentId = this.addWithAppointment.departmentId;
      this.onOptionsSelected(this.protocol.departmentId);
      this.protocol.patientDataId = this.addWithAppointment.patientDataId;
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
    }
    this.protocolForm = this.createContactForm();
  }
  onOptionsSelected(value: any) {
    console.log("the selected value is " + value);
    this.depForDoctorsService.getDoctorListByDepId(value).subscribe((data) => {
      this.doctors = data;
      if (this.action == "add" && this.doctors[0].id) {
        this.protocolForm.get("doctorId").setValue(this.doctors[0].id);
      }
      if (this.action == "addFromAppointment") {
        this.protocolForm
          .get("doctorId")
          .setValue(this.addWithAppointment.doctorId);
      }
    });
  }
  ngOnInit(): void {
    console.log(this.userName);
    this.protocolTypeService.getList().subscribe((data) => {
      this.protocolTypes = data;
      if (this.action == "add" && this.protocolTypes[0].id) {
        this.protocolForm
          .get("protocolTypeId")
          .setValue(this.protocolTypes[0].id);
      }
    });
    this.departmentService.getList().subscribe((data) => {
      this.departments = data;
      if (this.action == "add" && this.departments[0].id) {
        this.protocolForm.get("departmentId").setValue(this.departments[0].id);
        this.onOptionsSelected(this.departments[0].id);
      }
    });
    this.institutionService.getList().subscribe((data) => {
      this.institutions = data;
      if (this.action != "edit" && this.institutions[0].id) {
        this.protocolForm
          .get("institutionId")
          .setValue(this.institutions[0].id);
      }
    });
  }
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
      isOpen: [this.protocol.isOpen],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    if (this.protocolForm.valid&&this.userName) {
      this.protocol.patientDataId = this.patient.id;
      this.protocol = Object.assign({}, this.protocolForm.value);
      this.protocolService.add(this.protocol).subscribe((m) => {
        if (m) {
          this.protocol=new Protocol({});
          this.protocol=JSON.parse(m).data;
          console.log(JSON.stringify(m));
          //working kısmı
          this.protocolTypeProcessService
            .GetListForDefaultProcesses(
              this.protocol.protocolTypeId,
              this.protocol.doctorId
            )
            .subscribe((ptp) => {
              const protocolTypeProcesses: ProtocolTypeProcess[] = ptp;
              protocolTypeProcesses.forEach((item) => {
                this.working = new Working({});
                this.working.doctorId = item.doctorId;
                this.working.doctorRatio = item.doctorRatio;
                this.working.price = item.price;
                this.working.processId = item.processId;
                this.working.protocolId = this.protocol.id;
                this.working.taxRatio = item.taxRatio;
                this.working.quantity = 1;
                this.working.paidValue = 0;
                this.working.arrearsValue = item.price;
                this.working.doctorRatio=item.doctorRatio;
                this.working.user=this.userName;
                  this.workingService.add(this.working).subscribe((data) => {});
              });
            });
          this.appointmentService
            .getByIdentity(this.patient.phoneNumber, this.protocol.doctorId)
            .subscribe((data) => {
              console.log(JSON.stringify(data));
              this.appointment = new Appointment({});
              if (data) {
                this.appointment = data;
                this.appointment.protocolId = this.protocol.id;
                this.appointment.arriveDateTime = new Date();
                this.appointment.patientHasArrive = true;

                this.appointmentService
                  .update(this.appointment)
                  .subscribe((ap) => {
                    this.dialogRef.close(this.protocol.id);
                  });
              } else {
                let test = new Date();
                console.log("test" + test);
                this.appointment.time =
                  this.appointment.date.getHours().toString() + ":00";
                this.appointment.identityNumber = this.patient.identityNumber;
                this.appointment.name = this.patient.name;
                this.appointment.surName = this.patient.surName;
                this.appointment.phoneNumber = this.patient.phoneNumber;
                this.appointment.patientDataId = this.patient.id;
                this.appointment.protocolId = this.protocol.id;
                this.appointment.doctorId = this.protocol.doctorId;
                this.appointment.departmentId = this.protocol.departmentId;
                this.appointment.protocolTypeId = this.protocol.protocolTypeId;
                this.appointment.createdAppointmentDateTime = this.appointment.date;
                this.appointment.arriveDateTime = this.appointment.date;
                this.appointment.patientHasArrive = true;
                this.appointmentService
                  .add(this.appointment)
                  .subscribe((ap) => {
                    this.dialogRef.close(this.protocol.id);
                  });
              }
            });
        }
      });
    }
  }
}
