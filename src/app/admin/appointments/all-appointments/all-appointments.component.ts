import { Router } from '@angular/router';
import { DataSource, SelectionModel } from "@angular/cdk/collections";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatProgressButtonOptions } from "mat-progress-buttons";
import { BehaviorSubject, fromEvent, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Appointment } from "src/app/core/models/appointment.model";
import { AppointmentDto } from "src/app/core/models/appointmentdto.model";
import { AppointmentService } from "src/app/core/service/appointment.service";
import { SweetalertService } from "src/app/core/service/sweetalert.service";
import { AddAppointmentDialogComponent } from "./add-appointment-dialog/add-appointment-dialog.component";
import { DeleteComponent } from "./delete/delete.component";
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { AddProtocolDialogComponent } from '../../patients/search-patient/add-protocol-dialog/add-protocol-dialog.component';
import { OptionalSettingService } from 'src/app/core/service/optional-setting.service';
import { OptionalSetting } from 'src/app/core/models/optional-setting.model';

@Component({
  selector: "app-all-appointments",
  templateUrl: "./all-appointments.component.html",
  styleUrls: ["./all-appointments.component.sass"],
})
export class AllAppointmentsComponent {
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
  date:Date;
  selection = new SelectionModel<AppointmentDto>(true, []);
  index: number;
  id: number;
  appointmentDtos: AppointmentDto[];
  appointment: Appointment | null;
  veri: any;
  dateForRemember:Date;
  events: string[] = [];
  fixDate:string;
  constructor(
    public httpClient: HttpClient,
    private _sweetAlert:SweetalertService,
    public dialog: MatDialog,
    public appointmentService: AppointmentService,
    private router:Router,
    private optionalSettingService:OptionalSettingService
  ) {}
  dataSource: MatTableDataSource<AppointmentDto>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  optionalSetting:OptionalSetting;
  ngOnInit() {
    this.date=new Date();
    this.getAppointments();
    this.getOptionalSettings();
  }
  getOptionalSettings(){
    this.optionalSettingService.getById(1).subscribe(data=>{
      this.optionalSetting=data;
    })
  }
  getAppointments(){
    let dateToString = this.date.toLocaleDateString('tr-TR');
    this.fixDate = dateToString.slice(3,5)+"/"+dateToString.slice(0,2)+"/"+dateToString.slice(6,10);
    this.appointmentService.getSearchedAppointments(this.fixDate).subscribe((data) => {
      this.appointmentDtos=data;
      this.dataSource = new MatTableDataSource<AppointmentDto>(this.appointmentDtos);
           setTimeout(() => this.dataSource.sort = this.sort);
           setTimeout(() => this.dataSource.paginator = this.paginator);
           console.log(this.appointmentDtos);
             this.appointmentService._sweetAlert.getListSuccess('Randevular');
           },
           (error: HttpErrorResponse) => {
             this.appointmentService.isTblLoading = false;
             console.log(error.name + " " + error.message);
           });
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
           optionalSetting:this.optionalSetting
         },
       });
       dialogRef.afterClosed().subscribe((result) => {
         if (result === 1) {
           this.refresh();
         }
       });
     }
     editCall(row) {
       this.id = row.appointmentNo;
       this.appointmentService
         .getById(this.id)
         .subscribe((data) => {this.appointment = data
         if(this.appointment){
           console.log(this.appointment);
           const dialogRef = this.dialog.open(AddAppointmentDialogComponent, {
             data: {
               appointment: this.appointment,
               action:"edit"
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
      data: {
        row,
        action:"delete"
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refresh();
      }
    });
  }
  addProtocolForPatient(row) {
    this.id = row.id;
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
   addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
     this.events.push(`${type}: ${event.value}`);
     const newValue = event.value;
     this.date=moment(newValue).toDate();
     console.log( this.date);
     this.getAppointments();
   }
    afterDay(){
     let day=this.date.getDate();
     let month=this.date.getMonth();
     let year=this.date.getFullYear();
     this.date=new Date();
     day==0?this.date.setMonth(month+1):this.date.setMonth(month);
     this.date.setDate(day+1);
     this.date.setFullYear(year);
     console.log(this.date);
     this.getAppointments();
   }
   beforeDay(){
    let day=this.date.getDate();
    let month=this.date.getMonth();
    let year=this.date.getFullYear();
    this.date=new Date();
    day==0?this.date.setMonth(month-1):this.date.setMonth(month);
    this.date.setDate(day-1);
    this.date.setFullYear(year);
    console.log(this.date);
    this.getAppointments();
  }
  }
