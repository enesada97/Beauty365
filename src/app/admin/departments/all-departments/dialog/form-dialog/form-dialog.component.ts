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
import { SweetalertService } from "src/app/core/service/sweetalert.service";

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
    private fb: FormBuilder,
    private sweetAlert:SweetalertService
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
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.department.id],
      departmentName: [this.department.departmentName, [Validators.required]],
      status: [this.department.status, [Validators.required]]
    });
  }
 submit() {
    if (this.departmentForm.valid) {
      this.department = Object.assign({}, this.departmentForm.value);
      if(this.department.id==0){
        this.departmentService.add(this.department).subscribe(data=>{
          this.dialogRef.close(1);
          this.sweetAlert.success(data.toString());
          }
          );
      }else{
        this.departmentService.update(this.department).subscribe(data=>{
          this.dialogRef.close(1);
          this.sweetAlert.info(data.toString());
          }
          );
      }
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
