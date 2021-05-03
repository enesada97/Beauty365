import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DateAdapter } from "@angular/material/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Patient } from "src/app/core/models/patient.model";
import { PatientService } from "src/app/core/service/patient.service";
import { AddProtocolDialogComponent } from "../search-patient/add-protocol-dialog/add-protocol-dialog.component";
import Swal from "sweetalert2";
import { OptionalSetting } from "src/app/core/models/optional-setting.model";
import { OptionalSettingService } from "src/app/core/service/optional-setting.service";
import { ProtocolService } from "src/app/core/service/protocol.service";
import { AuthService } from "src/app/core/service/system-service/auth.service";
import { FormDialogComponent } from "../all-patients/dialog/form-dialog/form-dialog.component";
import { SweetalertService } from "src/app/core/service/sweetalert.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-add-patient",
  templateUrl: "./add-patient.component.html",
  styleUrls: ["./add-patient.component.sass"],
})
export class AddPatientComponent implements OnInit {
  patient: Patient;
  patientForm: FormGroup;
  optionalSettingForIdentityRequired: OptionalSetting;
  userName:string;
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private patientService: PatientService,
    private router: Router,
    private dateAdapter: DateAdapter<any>,
    private protocolService:ProtocolService,
    private optionalSettingService:OptionalSettingService,
    private authService:AuthService,
    private sweetAlert:SweetalertService,
    private translate:TranslateService
  ) {
    this.dateAdapter.setLocale("tr");
    this.patientForm = this.fb.group({
      id: [0],
      identityNumber: [""],
      name: ["", [Validators.required]],
      surName: ["", [Validators.required]],
      gender: [false],
      phoneNumber: ["", [Validators.required]],
      birthDate: [""],
      fatherName: [""],
      eMail: [""],
      maritalStatus: [false],
      address: [""],
      bloodGroup: [""],
      motherName: [""],
      city: [""],
      region: [""],
      photoUrl: [""],
      nationality: [""],
      country: [""],
      note: [""],
      isTrobule: [false],
      job: [""],
      usingSmoke: [false],
      usingAlcohol: [false],
      smsConfirm: [false],
      gdprConfirm: [false],
      status: [true],
    });
  }
  ngOnInit(): void {
    this.userName=this.authService.getUserName();
    this.getOptionalSetting();
  }
  checkClaim(claim: string): boolean {
    return this.authService.claimGuard(claim);
  }
  getOptionalSetting(){
    this.optionalSettingService.getById(2).subscribe(data=>{
      this.optionalSettingForIdentityRequired=data;
    })
  }
  public onSubmit(): void {
    if (this.patientForm.valid) {
      this.patient = Object.assign({}, this.patientForm.value);
      this.patientService.add(this.patient).subscribe((data) => {
        this.protocolControl(JSON.parse(data).data);
        this.sweetAlert.success("Added");
      });
    }
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
    });
  }
  protocolControl(row: Patient) {
    this.protocolService
      .getProtocolDtoListByPatientId(row.id)
      .subscribe((data) => {
        if (data.length) {
          // let isOpenControl=data.find(m=>m.isOpen==true);
          // isOpenControl==undefined?this.passParameter(row):null;
          if (this.optionalSettingForIdentityRequired.isOpen == true) {
            row.identityNumber
              ? this.passParameter(row)
              : this.passParameterForIdentity(row);
          } else {
            this.passParameter(row);
          }
        } else {
          if (this.optionalSettingForIdentityRequired.isOpen == true) {
            row.identityNumber
              ? this.addProtocolForPatient(row)
              : this.passParameterForIdentity(row);
          } else {
            this.addProtocolForPatient(row);
          }
        }
      });
  }
  passParameterForIdentity(row: Patient) {
    Swal.fire({
      title:
      this.translate.instant('CannotOpenProtocolBeforeIdentityNumber'),
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
            optionalSettingForIdentityRequired: this
              .optionalSettingForIdentityRequired,
          },
        });
        dialogRef.afterClosed().subscribe((result: Patient) => {
          if (result) {
            this.addProtocolForPatient(row);
          }
        });
      }
    });
  }
  passParameter(row: Patient) {
    Swal.fire({
      title:this.translate.instant('PatientDetailConfirm'),
      text:
        row.name +
        " " +
        row.surName +
        " "+ this.translate.instant('OpenProtocolFound'),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: this.translate.instant('No'),
      confirmButtonText: this.translate.instant('Yes'),
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl(
          "/admin/patients/all-patients/patient-detail/" + row.id
        );
      } else {
        this.addProtocolForPatient(row);
      }
    });
  }
}
