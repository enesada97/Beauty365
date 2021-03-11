import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { PatientService } from "src/app/core/service/patient.service";
import { Patient } from "src/app/core/models/patient.model";
import { HttpErrorResponse } from "@angular/common/http";
import { DateAdapter } from "@angular/material/core";

@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  patientForm: FormGroup;
  patient: Patient;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public patientService: PatientService,
    private fb: FormBuilder,
    private dateAdapter:DateAdapter<any>
  ) {
    // Set the defaults
    this.dateAdapter.setLocale('tr');
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = data.patient.name;
      this.patient = data.patient;
    } else {
      this.dialogTitle = "Yeni Hasta";
      this.patient = new Patient({});
    }
    this.patientForm = this.createContactForm();
  }
  formControl = new FormControl("", [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError("required")
      ? "Required field"
      : this.formControl.hasError("email")
      ? "Not a valid email"
      : "";
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.patient.id],
      identityNumber: [this.patient.identityNumber, [Validators.required]],
      name: [this.patient.name, [Validators.required]],
      surName: [this.patient.surName, [Validators.required]],
      status: [this.patient.status, [Validators.required]],
      gender: [this.patient.gender],
      birthDate: [this.patient.birthDate],
      phoneNumber: [this.patient.phoneNumber, [Validators.required]],
      bloodGroup: [this.patient.bloodGroup],
    });
  }
  submit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    if (this.patientForm.valid) {
      this.patient = Object.assign({}, this.patientForm.value);
      console.log("form:" +JSON.stringify(this.patient));
      this.patientService.save(this.patient).subscribe(data=>{
        if(data){
          this.action=="add"?this.dialogRef.close(data):this.dialogRef.close(1);
          console.log("gelen data:" +data);
          this.patientService._sweetAlert.success(data['name']);
        }
        },
        (error: HttpErrorResponse) => {
          this.patientService.isTblLoading = false;
          console.log(error.name + " " + error.message);
        }
        );
    }
  }
}
