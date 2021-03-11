import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProcessGroup } from 'src/app/core/models/processgroup.model';
import { ProcessgroupService } from 'src/app/core/service/processgroup.service';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass']
})
export class FormDialogComponent{
  action: string;
  dialogTitle: string;
  processGroupForm: FormGroup;
  processGroup: ProcessGroup;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public processGroupService: ProcessgroupService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = data.processGroup.name;
      this.processGroup = data.ProcessGroup;
    } else {
      this.dialogTitle = "Yeni İşlem Grubu";
      this.processGroup = new ProcessGroup({});
    }
    this.processGroupForm = this.createContactForm();
  }
  formControl = new FormControl("", [
    Validators.required,
    // Validators.email,
  ]);
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.processGroup.id],
      name: [this.processGroup.name, [Validators.required]],
      status: [this.processGroup.status, [Validators.required]]
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    if (this.processGroupForm.valid) {
      this.processGroup = Object.assign({}, this.processGroupForm.value);
      // this.patient.userId=this.authService.getCurrentUserId();
      this.processGroupService.save(this.processGroup).subscribe(data=>{
        this.processGroupService._sweetAlert.success(data['name']);
        },
        (error: HttpErrorResponse) => {
          this.processGroupService.isTblLoading = false;
          console.log(error.name + " " + error.message);
        }
        );
    }
  }
}