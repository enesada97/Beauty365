import { SelectionModel } from "@angular/cdk/collections";
import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Appointment } from "src/app/core/models/appointment.model";
import { AppointmentDto } from "src/app/core/models/appointmentdto.model";
import { AppointmentService } from "src/app/core/service/appointment.service";
import { SweetalertService } from "src/app/core/service/sweetalert.service";
import { AddAppointmentDialogComponent } from "./add-appointment-dialog/add-appointment-dialog.component";
import { DeleteComponent } from "./delete/delete.component";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import * as moment from "moment";
import { AddProtocolDialogComponent } from "../../patients/search-patient/add-protocol-dialog/add-protocol-dialog.component";
import { OptionalSettingService } from "src/app/core/service/optional-setting.service";
import { OptionalSetting } from "src/app/core/models/optional-setting.model";
import { PatientService } from "src/app/core/service/patient.service";
import { ProtocolService } from "src/app/core/service/protocol.service";
import { Patient } from "src/app/core/models/patient.model";
import { AuthService } from "src/app/core/service/system-service/auth.service";
import Swal from "sweetalert2";
import { FormDialogComponent } from "../../patients/all-patients/dialog/form-dialog/form-dialog.component";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-all-appointments",
  templateUrl: "./all-appointments.component.html",
  styleUrls: ["./all-appointments.component.sass"],
  providers:[PatientService,ProtocolService],
})
export class AllAppointmentsComponent implements OnInit {
  displayedColumns = [
    "select",
    "patientName",
    "patientSurname",
    "departmentName",
    "doctorName",
    "doctorSurname",
    "typeName",
    "time",
    "phoneNumber",
    "patientHasArrive",
    "actions",
  ];
  date: Date;
  selection = new SelectionModel<AppointmentDto>(true, []);
  appointmentDtos: AppointmentDto[];
  appointment: Appointment | null;
  addForProtocolAppointment: Appointment | null;
  events: string[] = [];
  fixDate: string;
  patient:Patient;
  userName:string;
  constructor(
    public httpClient: HttpClient,
    private sweetAlert: SweetalertService,
    public dialog: MatDialog,
    public appointmentService: AppointmentService,
    private optionalSettingService: OptionalSettingService,
    private patientService :PatientService,
    private authService:AuthService,
    private router:Router,
    private protocolService:ProtocolService,
    private translate:TranslateService,
  ) {}
  dataSource: MatTableDataSource<AppointmentDto>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  optionalSettings: OptionalSetting[];
  ngOnInit() {
    this.userName=this.authService.getUserName();
    this.date = new Date();
    this.getAppointments();
    this.getOptionalSettings();
  }
  checkClaim(claim:string):boolean{
		return this.authService.claimGuard(claim)
	}
  getOptionalSettings() {
    this.optionalSettingService.getList().subscribe((data) => {
      this.optionalSettings = data;
    });
  }
  getAppointments() {
    let dateToString = this.date.toLocaleDateString("tr-TR");
    this.fixDate =
      dateToString.slice(3, 5) +
      "-" +
      dateToString.slice(0, 2) +
      "-" +
      dateToString.slice(6, 10);
    this.appointmentService.getSearchedAppointments(this.fixDate).subscribe(
      (data) => {
        this.appointmentDtos = data;
        this.dataSource = new MatTableDataSource<AppointmentDto>(
          this.appointmentDtos
        );
        setTimeout(() => (this.dataSource.sort = this.sort));
        setTimeout(() => (this.dataSource.paginator = this.paginator));
      }
    );
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }
  addNew() {
    const dialogRef = this.dialog.open(AddAppointmentDialogComponent, {
      data: {
        appointment: this.appointment,
        action: "add",
        optionalSetting: this.optionalSettings.find(m=>m.id==1)
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refresh();
      }
    });
  }
  editCall(row) {
    this.appointmentService.getById(row.appointmentNo).subscribe((data) => {
      this.appointment = data;
      if (this.appointment) {
        const dialogRef = this.dialog.open(AddAppointmentDialogComponent, {
          data: {
            appointment: this.appointment,
            action: "edit",
            optionalSetting: this.optionalSettings.find(m=>m.id==1)
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result === 1) {
            this.refresh();
          }
        });
      }
    });
  }
  removeSelectedRows() {
    const alertCounter = this.selection.selected[this.selection.selected.length-1].appointmentNo;
    this.selection.selected.forEach((item) => {
      const index: number = item.appointmentNo;
      this.appointmentService.getById(index).subscribe(ap=>{
        let appointment=new Appointment({});
        appointment=ap;
        appointment.status=false;
        this.appointmentService.update(appointment).subscribe(
          (data) => {
            if(index==alertCounter){
              this.sweetAlert.delete(data.toString());
              this.refresh();
            }
          },
        );
      })
      this.selection = new SelectionModel<AppointmentDto>(true, []);
    });
  }
  deleteItem(row) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {
        row,
        action: "delete",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refresh();
      }
    });
  }
  protocolController(row:AppointmentDto){
    (row.protocolNo);
    if (row.protocolNo==0) {
      this.addForProtocolAppointment=new Appointment({});
      this.appointmentService.getById(row.appointmentNo).subscribe(data=>{
        this.addForProtocolAppointment=data;
          this.addForProtocolAppointment.patientDataId!=0?this.addProtocolForAppointment(this.addForProtocolAppointment):this.passParameter(this.addForProtocolAppointment);
      });
    } else {
      Swal.fire({
        title: this.translate.instant('ViewTheProtocol'),
        text: this.translate.instant('AlreadyProtocolForAppointment'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: this.translate.instant('No'),
        confirmButtonText: this.translate.instant('Yes'),
        showLoaderOnConfirm: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigateByUrl("/admin/working/working-processes/"+row.protocolNo);
        }
      })
    }
  }
  addProtocolForAppointment(appointment:Appointment,patient?:Patient) {
    if(patient){
      if(appointment.id!=0){
        const dialogRef = this.dialog.open(AddProtocolDialogComponent, {
          data: {
            patient: patient,
            appointment: appointment,
            action: "addFromAppointment",
            userName:this.userName
          },
        });
        dialogRef.afterClosed().subscribe((result:number) => {
          if(result){
            this.router.navigateByUrl("admin/working/working-processes/"+result);
            }
            this.refresh();
        });
      }
    }else{
      if(appointment.id!=0){
           this.patientService.getById(appointment.patientDataId).subscribe(p=>{
             this.patient=p;
             if(this.optionalSettings.find(m=>m.id==2).isOpen==true&&!this.patient.identityNumber){
               this.passParameterForIdentity(this.patient,appointment);
             }else{
              const dialogRef = this.dialog.open(AddProtocolDialogComponent, {
                data: {
                  patient: this.patient,
                  appointment: appointment,
                  action: "addFromAppointment",
                  userName:this.userName
                },
              });
              dialogRef.afterClosed().subscribe((result:number) => {
                if(result){
                  this.router.navigateByUrl("admin/working/working-processes/"+result);
                  }
                  this.refresh();
              });
             }
             });
        }else{
          this.patientService.getById(appointment.patientDataId).subscribe(p=>{
            this.patient=p;
              const dialogRef = this.dialog.open(AddProtocolDialogComponent, {
                data: {
                  patient: this.patient,
                  appointment: appointment,
                  action: "addFromAppointment",
                  userName:this.userName
                },
              });
              dialogRef.afterClosed().subscribe((result:number) => {
                if(result){
                  this.router.navigateByUrl("admin/working/working-processes/"+result);
                  }
                  this.refresh();
              });
            });
        }
      }
  }
  passParameter(appointment:Appointment) {
    Swal.fire({
      title: this.translate.instant('CreatePatientAtTheAppointment'),
      text: appointment.name+" "+appointment.surName+" "+this.translate.instant('PatientRecordNotFound'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: this.translate.instant('No'),
      confirmButtonText: this.translate.instant('Yes'),
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        let patient=new Patient({});
        patient.name=appointment.name;
        patient.surName=appointment.surName;
        patient.identityNumber=appointment.identityNumber;
        patient.phoneNumber=appointment.phoneNumber;
        this.addPatientOnAppointment(patient,appointment);
      }
    })
  }
  passParameterForIdentity(patient:Patient,appointment) {
    Swal.fire({
      title: this.translate.instant('AddIdentityNumberForPatientAtTheAppointment'),
      text: patient.name+" "+patient.surName+" "+this.translate.instant('IdentityNumberNotFound'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: this.translate.instant('No'),
      confirmButtonText: this.translate.instant('Yes'),
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.addIdentityForPatient(patient,appointment);
      }
    })
  }
  addIdentityForPatient(row:Patient,appointment:Appointment) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        patient: row,
        action: "edit",
        optionalSettingForIdentityRequired:this.optionalSettings.find(m=>m.id==2)
      },
    });
    dialogRef.afterClosed().subscribe((result:Patient) => {
      if(result){
        this.patientService.getById(row.id).subscribe(p=>{
          row=p;
          this.addProtocolForAppointment(appointment,row);
        })
        }
        this.refresh();
    });
  }
  addPatientOnAppointment(row:Patient,appointment:Appointment) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        patient: row,
        action: "edit",
        optionalSettingForIdentityRequired:this.optionalSettings.find(m=>m.id==2)
      },
    });
    dialogRef.afterClosed().subscribe((result:Patient) => {
      if(result){
        appointment.patientDataId=result.id;
        this.appointmentService.update(appointment).subscribe(data=>{
          this.refresh();
          this.addProtocolForAppointment(JSON.parse(data).data,result);
        })
        }
        this.refresh();
    });
  }
  refresh() {
    this.getAppointments();
    this.getOptionalSettings();
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    const newValue = event.value;
    this.date = moment(newValue).toDate();
    this.getAppointments();
  }
  afterDay() {
    let day = this.date.getDate();
    let month = this.date.getMonth();
    let year = this.date.getFullYear();
    this.date = new Date();
    day == 0 ? this.date.setMonth(month + 1) : this.date.setMonth(month);
    this.date.setDate(day + 1);
    this.date.setFullYear(year);
    this.getAppointments();
  }
  beforeDay() {
    let day = this.date.getDate();
    let month = this.date.getMonth();
    let year = this.date.getFullYear();
    this.date = new Date();
    day == 0 ? this.date.setMonth(month - 1) : this.date.setMonth(month);
    this.date.setDate(day - 1);
    this.date.setFullYear(year);
    this.getAppointments();
  }
}
