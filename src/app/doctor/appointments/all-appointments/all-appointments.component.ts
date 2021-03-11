import { Patient } from './../../../core/models/patient.model';
import { PatientService } from './../../../core/service/patient.service';
import { Protocol } from './../../../core/models/protocol.model';
import { SelectionModel } from "@angular/cdk/collections";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import * as moment from "moment";
import { AddAppointmentDialogComponent } from "src/app/admin/appointments/all-appointments/add-appointment-dialog/add-appointment-dialog.component";
import { AddProtocolDialogComponent } from "src/app/admin/patients/search-patient/add-protocol-dialog/add-protocol-dialog.component";
import { Appointment } from "src/app/core/models/appointment.model";
import { AppointmentDto } from "src/app/core/models/appointmentdto.model";
import { AppointmentService } from "src/app/core/service/appointment.service";
import { ProtocolService } from "src/app/core/service/protocol.service";
import { SweetalertService } from "src/app/core/service/sweetalert.service";
import { DeleteComponent } from 'src/app/admin/appointments/all-appointments/delete/delete.component';

@Component({
  selector: "app-all-appointments",
  templateUrl: "./all-appointments.component.html",
  styleUrls: ["./all-appointments.component.sass"],
})
export class AllAppointmentsComponent implements OnInit {
  displayedColumns = [
    "select",
    "patientName",
    "patientSurname",
    "typeName",
    "time",
    "phoneNumber",
    "patientHasArrive",
    "actions",
  ];
  date: Date;
  selection = new SelectionModel<AppointmentDto>(true, []);
  index: number;
  id: number;
  appointmentDtos: AppointmentDto[];
  appointment: Appointment | null;
  protocol: Protocol;
  dateForRemember: Date;
  events: string[] = [];
  fixDate: string;
  constructor(
    public httpClient: HttpClient,
    private _sweetAlert: SweetalertService,
    public dialog: MatDialog,
    public appointmentService: AppointmentService,
    private router: Router,
    private protocolService:ProtocolService,
    private patientService:PatientService
  ) {}
  dataSource: MatTableDataSource<AppointmentDto>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  ngOnInit() {
    this.date = new Date();
    this.getAppointments();
  }
  getAppointments() {
    let dateToString = this.date.toLocaleDateString("tr-TR");
    this.fixDate =
      dateToString.slice(6, 10) +
      "-" +
      dateToString.slice(3, 5) +
      "-" +
      dateToString.slice(0, 2);
    this.appointmentService
      .getListByDrId(1, this.fixDate, this.fixDate)
      .subscribe(
        (data) => {
          this.appointmentDtos = data;
          this.dataSource = new MatTableDataSource<AppointmentDto>(
            this.appointmentDtos
          );
          setTimeout(() => (this.dataSource.sort = this.sort));
          setTimeout(() => (this.dataSource.paginator = this.paginator));
          console.log(this.appointmentDtos);
          this.appointmentService._sweetAlert.getListSuccess("Randevular");
        },
        (error: HttpErrorResponse) => {
          this.appointmentService.isTblLoading = false;
          console.log(error.name + " " + error.message);
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
        action: "add"
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refresh();
      }
    });
  }
  patientDescription(row){
    this.id = row.appointmentNo;
    this.appointmentService
      .getById(this.id)
      .subscribe((data) => {this.appointment = data
        this.router.navigateByUrl("doctor/patients/patient-detail/"+this.appointment.patientDataId);});
  }
  editCall(row) {
    this.id = row.appointmentNo;
    this.appointmentService
      .getById(this.id)
      .subscribe((data) => {this.appointment = data;
        if (this.appointment) {
          console.log(this.appointment);
          const dialogRef = this.dialog.open(AddAppointmentDialogComponent, {
            data: {
              appointment: this.appointment,
              action: "edit",
            },
          });
          dialogRef.afterClosed().subscribe((result) => {
            if (result === 1) {
              this.refresh();
            }
          });
        }
      });
      this.refresh();
  }
  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      const index: number = item.appointmentNo;
      //this.patientDataBase.deletePatient(index);
      this.appointmentService.delete(index).subscribe(
        (data) => {},
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );
      this.appointmentService._sweetAlert.delete("Randevular");
      this.selection = new SelectionModel<AppointmentDto>(true, []);
    });
    this.refresh();
  }
  deleteItem(i: number, row) {
    this.index = i;
    this.id = row.appointmentNo;
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refresh();
      }
    });
  }
  addProtocolForPatient(row:AppointmentDto) {
    let patient=new Patient({});
    this.appointmentService.getById(row.appointmentNo).subscribe(data=>{
      this.appointment=data;
      this.patientService.getById(this.appointment.patientDataId).subscribe(m=>patient=m)
    })
    const dialogRef = this.dialog.open(AddProtocolDialogComponent, {
      data: {
        patient: row,
        action: "add",
      },
    });
    dialogRef.afterClosed();
  }
  refresh() {
    this.getAppointments();
  }
  acceptForProcess(row:AppointmentDto){
console.log(row);
this.protocol=new Protocol({});
this.appointmentService.getById(row.appointmentNo).subscribe(data=>{
  this.appointment=data;
  this.appointment.inspectionStartDateTime=new Date();
  this.protocol.dateOfCome=new Date();
  this.protocol.departmentId=this.appointment.departmentId;
  this.protocol.doctorId=this.appointment.doctorId;
  this.protocol.institutionId=0;
  this.protocol.dateOfLeave=new Date();
  this.protocol.patientDataId=this.appointment.patientDataId;
  this.protocol.protocolTypeId=this.appointment.protocolTypeId;
  this.protocol.status=true;
  this.protocolService.save(this.protocol).subscribe(m=>{
    this.appointment.protocolId=m.id;
    this.appointmentService.save(this.appointment).subscribe(r=>{
      this.appointmentService._sweetAlert.success(""+r["protocolId"]+" numaralı protokole daha önceden oluşturulmuş randevu ile eşleştirildi");
      this.router.navigateByUrl("doctor/protocol/appointment-process/"+m.id);
    })
  })
})
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    const newValue = event.value;
    this.date = moment(newValue).toDate();
    console.log(this.date);
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
    console.log(this.date);
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
    console.log(this.date);
    this.getAppointments();
  }
}
