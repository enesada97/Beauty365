import { MedicalAlert } from "./../../../../../../core/models/medical-alert.mode";
import { MedicalAlertService } from "./../../../../../../core/service/medical-alert.service";
import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-medical-alert",
  templateUrl: "./medical-alert.component.html",
  styleUrls: ["./medical-alert.component.sass"],
})
export class MedicalAlertComponent implements OnInit {
  action: string;
  dialogTitle: string;
  medicalAlertForm: FormGroup;
  medicalAlert: MedicalAlert;
  constructor(
    public dialogRef: MatDialogRef<MedicalAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public medicalAlertService: MedicalAlertService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    this.dialogTitle = data.dialogTitle;
    if (this.action === "edit") {
      this.medicalAlert = data.medicalAlert;
    } else {
      this.medicalAlert = new MedicalAlert({});
      this.medicalAlert.patientDataId =data.patientDataId;
    }
    this.medicalAlertForm = this.createContactForm();
  }
  ngOnInit(){
    this.dialogRef.updatePosition({ top: `0px`});
  }
  formControl = new FormControl("", [
    Validators.required,
    // Validators.email,
  ]);
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.medicalAlert.id],
      patientDataId: [this.medicalAlert.patientDataId],
      note: [this.medicalAlert.note, [Validators.required,Validators.maxLength(100)]],
    });
  }
  submit() {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    if (this.medicalAlertForm.valid) {
      this.medicalAlert = Object.assign({}, this.medicalAlertForm.value);
      console.log(JSON.stringify(this.medicalAlert));
      this.medicalAlertService.save(this.medicalAlert).subscribe(
        (data) => {},
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );
    }
  }
  deleteMedicalAlert(){
    this.medicalAlertService.delete(this.medicalAlert.id).subscribe(
      (data) => {console.log(data);},
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }
}
