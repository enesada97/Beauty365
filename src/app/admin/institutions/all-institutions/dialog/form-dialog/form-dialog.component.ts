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
import { SweetalertService } from "src/app/core/service/sweetalert.service";

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
    private fb: FormBuilder,
    private sweetAlert:SweetalertService
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
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.institution.id],
      institutionName: [this.institution.institutionName, [Validators.required]],
      status: [this.institution.status, [Validators.required]]
    });
  }
  submit() {
    if (this.institutionForm.valid) {
      this.institution = Object.assign({}, this.institutionForm.value);
      if(this.institution.id==0){
        this.institutionService.add(this.institution).subscribe(data=>{
          this.dialogRef.close(1);
          this.sweetAlert.success(data.toString());
          }
          );
      }else{
        this.institutionService.update(this.institution).subscribe(data=>{
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
