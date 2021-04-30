import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Patient } from "src/app/core/models/patient.model";
import { PatientService } from "src/app/core/service/patient.service";
import { MatDialog } from "@angular/material/dialog";
import { AddProtocolDialogComponent } from "./add-protocol-dialog/add-protocol-dialog.component";
import { MatProgressButtonOptions } from "mat-progress-buttons";
import { AuthService } from "src/app/core/service/system-service/auth.service";
import { ProtocolService } from "src/app/core/service/protocol.service";
import { OptionalSettingService } from "src/app/core/service/optional-setting.service";
import { OptionalSetting } from "src/app/core/models/optional-setting.model";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { FormDialogComponent } from "../all-patients/dialog/form-dialog/form-dialog.component";
import { TranslateService } from "@ngx-translate/core";
@Component({
  selector: "app-search-patient",
  templateUrl: "./search-patient.component.html",
  styleUrls: ["./search-patient.component.sass"],
})
export class SearchPatientComponent implements OnInit {
  searchedPatients: Patient[];
  displayedColumns: string[] = [
    "name",
    "surName",
    "identityNumber",
    "phoneNumber",
    "actions",
  ];
  patient: Patient;
  patientForm: FormGroup;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  dataSource: MatTableDataSource<Patient>;
  optionalSettingForIdentityRequired:OptionalSetting;
  constructor(
    private fb: FormBuilder,
    public patientService: PatientService,
    public dialog: MatDialog,
    private authService:AuthService,
    private protocolService:ProtocolService,
    private optionalSettingService:OptionalSettingService,
    private router:Router,
    private translate:TranslateService
  ) {
    this.patientForm = this.fb.group({
      identityNumber: [null],
      name: [null],
      surName: [null],
      phoneNumber: [null],
    });
  }
  ngOnInit(): void {
    this.getOptionalSetting();
  }
  spinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: "Protokol Ekle",
    spinnerSize: 18,
    raised: true,
    stroked: false,
    buttonColor: "primary",
    spinnerColor: "accent",
    fullWidth: false,
    disabled: false,
    mode: "indeterminate",
    buttonIcon: {
      fontIcon: "add_circle_outline",
    },
  };
  checkClaim(claim: string): boolean {
    return this.authService.claimGuard(claim);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getOptionalSetting(){
    this.optionalSettingService.getById(2).subscribe(data=>{
      this.optionalSettingForIdentityRequired=data;
    })
  }
  addProtocolForPatient(row:Patient) {
    const dialogRef = this.dialog.open(AddProtocolDialogComponent, {
      data: {
        patient: row,
        action: "add",
        userName:''
      },
    });
    dialogRef.afterClosed().subscribe((result:number) => {
      if(result){
        this.router.navigateByUrl("admin/working/working-processes/"+result);
        }
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
      title:
      this.translate.instant('CannotOpenTheProtocolBeforeAddingIdentityNumberForPatient'),
      text:
        row.name +
        " " +
        row.surName +
        " "+this.translate.instant('IdentityNumberRecordNotFound'),
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
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
              this.addProtocolForPatient(row);
            }
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
  public onSubmit(): void {
    this.patient = Object.assign({}, this.patientForm.value);
    this.patient.identityNumber==null?this.patient.identityNumber=0:null;
    this.patient.phoneNumber==null?this.patient.phoneNumber=0:null;
    this.patientService.getSearchedPatients(this.patient).subscribe((data) => {
      this.searchedPatients = data;
      this.dataSource = new MatTableDataSource<Patient>(this.searchedPatients);
      setTimeout(() => (this.dataSource.sort = this.sort));
      setTimeout(() => (this.dataSource.paginator = this.paginator));
    });
  }
}
