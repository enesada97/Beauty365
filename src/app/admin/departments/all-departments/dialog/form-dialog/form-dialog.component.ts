import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { Department } from 'src/app/core/models/department.model';
import { DepartmentService } from 'src/app/core/service/department.service';
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  departmentForm: FormGroup;
  department: Department;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public departmentService: DepartmentService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = data.department.departmentName;
      this.department = data.department;
    } else {
      this.dialogTitle = "Yeni Bölüm";
      this.department = new Department({});
    }
    this.departmentForm = this.createContactForm();
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
      id: [this.department.id],
      departmentName: [this.department.departmentName, [Validators.required]],
      status: [this.department.status, [Validators.required]]
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    if (this.departmentForm.valid) {
      this.department = Object.assign({}, this.departmentForm.value);
      console.log(this.department);
      // this.patient.userId=this.authService.getCurrentUserId();
      this.departmentService.save(this.department).subscribe(data=>{
        this.departmentService._sweetAlert.success(data['name']);
        },
        (error: HttpErrorResponse) => {
          this.departmentService.isTblLoading = false;
          console.log(error.name + " " + error.message);
        }
        );
    }
  }
}
