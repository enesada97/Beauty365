import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { Institution } from 'src/app/core/models/institution.model';
import { InstitutionService } from 'src/app/core/service/institution.service';
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  institutionForm: FormGroup;
  institution: Institution;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public institutionService: InstitutionService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = data.institution.institutionName;
      this.institution = data.institution;
    } else {
      this.dialogTitle = "Yeni Kurum";
      this.institution = new Institution({});
    }
    this.institutionForm = this.createContactForm();
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
      id: [this.institution.id],
      institutionName: [this.institution.institutionName, [Validators.required]],
      status: [this.institution.status, [Validators.required]]
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    if (this.institutionForm.valid) {
      this.institution = Object.assign({}, this.institutionForm.value);
      console.log(this.institution);
      // this.patient.userId=this.authService.getCurrentUserId();
      this.institutionService.save(this.institution).subscribe(data=>{
        this.institutionService._sweetAlert.success(data['name']);
        },
        (error: HttpErrorResponse) => {
          this.institutionService.isTblLoading = false;
          console.log(error.name + " " + error.message);
        }
        );
    }
  }
}
