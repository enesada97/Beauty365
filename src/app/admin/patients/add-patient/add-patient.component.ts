import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DateAdapter } from "@angular/material/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Patient } from "src/app/core/models/patient.model";
import { PatientService } from "src/app/core/service/patient.service";
import { AddProtocolDialogComponent } from "../search-patient/add-protocol-dialog/add-protocol-dialog.component";

@Component({
  selector: "app-add-patient",
  templateUrl: "./add-patient.component.html",
  styleUrls: ["./add-patient.component.sass"],
})
export class AddPatientComponent {
  patient: Patient;
  id: number;
  patientForm: FormGroup;
  constructor(public dialog: MatDialog,private fb: FormBuilder, private patientService: PatientService,private router:Router,private dateAdapter: DateAdapter<any>) {
    this.dateAdapter.setLocale("tr");
    this.patientForm = this.fb.group({
      id: [0],
      identityNumber: ["", [Validators.required]],
      name: ["", [Validators.required]],
      surName: ["", [Validators.required]],
      gender: [""],
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
  public onSubmit(): void {
    if (this.patientForm.valid) {
      this.patient = Object.assign({}, this.patientForm.value);
      // this.patient.userId=this.authService.getCurrentUserId();
      this.patientService.save(this.patient).subscribe(data=>{
        this.patientService._sweetAlert.success(data['name']);
        this.addProtocolForPatient(data);
        },
        (error: HttpErrorResponse) => {
          this.patientService.isTblLoading = false;
          console.log(error.name + " " + error.message);
        }
        );
    }
  }
  addProtocolForPatient(row:Patient) {
    this.id = row.id;
    const dialogRef = this.dialog.open(AddProtocolDialogComponent, {
      data: {
        patient: row,
        action: "add",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result !== 1) {
        this.router.navigateByUrl('/admin/patients/all-patients');
      }
    });
  }
}
