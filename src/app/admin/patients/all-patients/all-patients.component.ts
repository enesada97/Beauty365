import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Patient } from 'src/app/core/models/patient.model';
import { PatientService } from 'src/app/core/service/patient.service';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';
import { DeleteComponent } from './dialog/delete/delete.component';
import { FormDialogComponent } from './dialog/form-dialog/form-dialog.component';
import Swal from "sweetalert2";



@Component({
  selector: 'app-all-patients',
  templateUrl: './all-patients.component.html',
  styleUrls: ['./all-patients.component.sass']
})
export class AllPatientsComponent implements OnInit {
  displayedColumns = [
    "select",
    "name",
    "surName",
    "identityNumber",
    "gender",
    "phoneNumber",
    "birthDate",
    "bloodGroup",
    "actions",
  ];
  selection = new SelectionModel<Patient>(true, []);
  patientList: Patient[];
  dataSource: MatTableDataSource<Patient>;
  patient: Patient | null;
  optionalSettingForIdentityRequired:OptionalSetting;
  userName:string;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public patientService: PatientService,
    private sweetAlert: SweetalertService,
    private protocolService:ProtocolService,
    private router:Router,
    private optionalSettingService:OptionalSettingService,
    private authService:AuthService,
    private translate:TranslateService
  ) {}
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  ngOnInit(): void {
    this.userName=this.authService.getUserName();
    this.getPatientList();
    this.getOptionalSetting();
  }
  refresh() {
    this.getPatientList();
  }
  checkClaim(claim: string): boolean {
    return this.authService.claimGuard(claim);
  }
  getPatientList() {
    this.patientService.getList().subscribe((data) => {
      setTimeout(() => (this.patientService.isTblLoading = false), 1000);
      this.patientList = data;
      this.dataSource = new MatTableDataSource<Patient>(this.patientList);
           setTimeout(() => this.dataSource.sort = this.sort);
           setTimeout(() => this.dataSource.paginator = this.paginator);
           });
  }
  getOptionalSetting(){
    this.optionalSettingService.getById(2).subscribe(data=>{
      this.optionalSettingForIdentityRequired=data;
    })
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  addNew() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        patient: this.patient,
        action: "add",
        optionalSettingForIdentityRequired:this.optionalSettingForIdentityRequired
      },
    });
    dialogRef.afterClosed().subscribe((result:Patient) => {
      if(result){
          this.refresh();
          this.addProtocolForPatient(result);
        }
        this.refresh();
    });
  }
  addProtocolForPatient(row:Patient) {
    const dialogRef = this.dialog.open(AddProtocolDialogComponent, {
      data: {
        patient: row,
        action: "add",
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
  protocolControl(row:Patient) {
    this.protocolService.getProtocolDtoListByPatientId(row.id).subscribe(data=>{
      if(data.length){
        // let isOpenControl=data.find(m=>m.isOpen==true);
        // isOpenControl==undefined?this.passParameter(row):null;
        if(this.optionalSettingForIdentityRequired.isOpen==true){
          row.identityNumber?this.passParameter(row):this.passParameterForIdentity(row);
        }else{
          this.passParameter(row);
        }
      }else{
        if(this.optionalSettingForIdentityRequired.isOpen==true){
          row.identityNumber?this.addProtocolForPatient(row):this.passParameterForIdentity(row);
        }else{
          this.addProtocolForPatient(row);
        }
      }
    })
  }
  passParameterForIdentity(row:Patient) {
    Swal.fire({
      title: this.translate.instant('CannotOpenTheProtocolBeforeAddingIdentityNumberForPatient'),
      text: row.name+" "+row.surName+" "+this.translate.instant('IdentityNumberRecordNotFound'),
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: this.translate.instant('No'),
      confirmButtonText: this.translate.instant('Yes'),
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const dialogRef = this.dialog.open(FormDialogComponent, {
          data: {
            patient: row,
            action: "edit",
            optionalSettingForIdentityRequired:this.optionalSettingForIdentityRequired,
          },
        });
        dialogRef.afterClosed().subscribe((result:Patient) => {
          if(result){
              this.refresh();
              this.addProtocolForPatient(row);
            }
            this.refresh();
        });
      }
    })
  }
  passParameter(row:Patient) {
    Swal.fire({
      title:this.translate.instant('OpenProtocolFinded'),
      text:
        row.name +
        " " +
        row.surName +
        " "+ this.translate.instant('OpenProtocolFinded'),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: this.translate.instant('No'),
      confirmButtonText: this.translate.instant('Yes'),
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('/admin/patients/all-patients/patient-detail/'+row.id);
      }else{
        this.addProtocolForPatient(row);
      }
    })
  }
  editCall(row) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        patient: row,
        action: "edit",
        optionalSettingForIdentityRequired:this.optionalSettingForIdentityRequired
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refresh();
      }
    });
  }
  deleteItem(row) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refresh();
      }
    });
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
  removeSelectedRows() {
    const alertCounter = this.selection.selected[this.selection.selected.length-1].id;
    this.selection.selected.forEach((item) => {
      const index=item.id;
      item.status=false;
      this.patientService.update(item).subscribe(
        (data) => {
          if(index==alertCounter){
            this.refresh();
            this.sweetAlert.delete(data.toString());
          }
        }
      );
      this.selection = new SelectionModel<Patient>(true, []);
    });
  }

}
import { Pipe, PipeTransform } from '@angular/core';
import { AddProtocolDialogComponent } from '../search-patient/add-protocol-dialog/add-protocol-dialog.component';
import { ProtocolService } from 'src/app/core/service/protocol.service';
import { Router } from '@angular/router';
import { OptionalSetting } from 'src/app/core/models/optional-setting.model';
import { OptionalSettingService } from 'src/app/core/service/optional-setting.service';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/core/service/system-service/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Pipe({name: 'phone'})
export class PhonePipe implements PipeTransform {
  transform(rawNum:string) {
    rawNum = "0"+ rawNum;

    const countryCodeStr = rawNum.slice(0,1);
    const areaCodeStr = rawNum.slice(1,4);
    const midSectionStr = rawNum.slice(4,7);
    const lastSectionStr = rawNum.slice(7);

    return `${countryCodeStr} (${areaCodeStr})${midSectionStr}-${lastSectionStr}`;
  }
}
