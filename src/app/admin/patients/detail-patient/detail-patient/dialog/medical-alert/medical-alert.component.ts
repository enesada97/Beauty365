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
import { SweetalertService } from "src/app/core/service/sweetalert.service";

@Component({
  selector: "app-medical-alert",
  templateUrl: "./medical-alert.component.html",
  styleUrls: ["./medical-alert.component.sass"],
})
export class MedicalAlertComponent implements OnInit {
  action: string;
  medicalAlertForm: FormGroup;
  medicalAlert: MedicalAlert;
  constructor(
    public dialogRef: MatDialogRef<MedicalAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public medicalAlertService: MedicalAlertService,
    private fb: FormBuilder,
    private sweetAlert: SweetalertService
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.medicalAlert = data.medicalAlert;
    } else {
      this.medicalAlert = new MedicalAlert({});
      this.medicalAlert.patientDataId = data.patientDataId;
    }
    this.medicalAlertForm = this.createContactForm();
  }
  ngOnInit() {
    this.dialogRef.updatePosition({ top: `0px` });
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.medicalAlert.id],
      patientDataId: [this.medicalAlert.patientDataId],
      note: [
        this.medicalAlert.note,
        [Validators.required, Validators.maxLength(100)],
      ],
    });
  }
  submit() {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    if (this.medicalAlertForm.valid) {
      this.medicalAlert = Object.assign({}, this.medicalAlertForm.value);
      if (this.medicalAlert.id == 0) {
        this.medicalAlertService.add(this.medicalAlert).subscribe((data) => {
          this.dialogRef.close(1);
          this.sweetAlert.success(data.toString());
        });
      } else {
        this.medicalAlertService.update(this.medicalAlert).subscribe((data) => {
          this.dialogRef.close(1);
          this.sweetAlert.info(data.toString());
        });
      }
    }
  }
  deleteMedicalAlert() {
    this.medicalAlertService.delete(this.medicalAlert.id).subscribe((data) => {
      this.dialogRef.close(1);
      this.sweetAlert.delete(data.toString());
    });
  }
}
