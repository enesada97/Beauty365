import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import {
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { PatientService } from "src/app/core/service/patient.service";
import { Patient } from "src/app/core/models/patient.model";
import { DateAdapter } from "@angular/material/core";
import { SweetalertService } from "src/app/core/service/sweetalert.service";

@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
})
export class FormDialogComponent {
  action: string;
  patientForm: FormGroup;
  patient: Patient;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public patientService: PatientService,
    private fb: FormBuilder,
    private dateAdapter:DateAdapter<any>,
    private sweetAlert:SweetalertService
  ) {
    // Set the defaults
    this.dateAdapter.setLocale('tr');
    this.action = data.action;
    if (this.action === "edit") {
      this.patient = data.patient;
    } else {
      this.patient = new Patient({});
    }
    this.patientForm = this.createContactForm();
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
    if (this.patientForm.valid) {
      this.patient = Object.assign({}, this.patientForm.value);
      if(this.patient.id==0){
        this.patientService.add(this.patient).subscribe(data=>{
          this.dialogRef.close(data);
          this.sweetAlert.success(data);
          }
          );
      }else{
        this.patientService.update(this.patient).subscribe(data=>{
          this.dialogRef.close(1);
          this.sweetAlert.info(data);
          }
          );
      }
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
