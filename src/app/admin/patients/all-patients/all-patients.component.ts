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
  styleUrls: ['./all-patients.component.sass'],
  providers:[OptionalSettingService]
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
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public patientService: PatientService,
    private sweetAlert: SweetalertService,
    private protocolService:ProtocolService,
    private router:Router,
    private optionalSettingService:OptionalSettingService,
    private authService:AuthService
  ) {}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  ngOnInit(): void {
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
  addNew() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        patient: this.patient,
        action: "add",
      },
    });
    dialogRef.afterClosed().subscribe((result:Patient) => {
      console.log("result:" +result);
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
      },
    });
    dialogRef.afterClosed().subscribe((result:number) => {
      console.log("result:" +result);
      if(result){
        this.router.navigateByUrl("admin/working/working-processes/"+result);
        }
        this.refresh();
    });
  }
  protocolControl(row:Patient) {
    this.protocolService.getProtocolDtoListByPatientId(row.id).subscribe(data=>{
      console.log("veri ="+data);
      console.log(JSON.stringify(data));
      if(data.length){
        // let isOpenControl=data.find(m=>m.isOpen==true);
        // isOpenControl==undefined?this.passParameter(row):null;
        this.passParameter(row);
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
      title: 'Hastanın kimlik bilgisini eklemeden protokol açamazsınız,kimlik bilgisini eklemek ister misiniz?',
      text: row.name+" "+row.surName+" hastasına ait TC Kimlik bilgisi bulunamadı",
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Hayır',
      confirmButtonText: 'Evet',
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const dialogRef = this.dialog.open(FormDialogComponent, {
          data: {
            patient: row,
            action: "edit",
          },
        });
        dialogRef.afterClosed().subscribe((result:Patient) => {
          console.log("result:" +result);
          if(result){
              this.refresh();
              this.addProtocolForPatient(result);
            }
            this.refresh();
        });
      }
    })
  }
  passParameter(row:Patient) {
    Swal.fire({
      title: 'Açık Protokol Bulundu! Hasta Detayına Gitmek İster misiniz?',
      text: row.name+" "+row.surName+" hastasına ait aktif hasta protokolü bulundu",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Hayır',
      confirmButtonText: 'Evet',
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
