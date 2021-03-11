import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { ProtocolType } from 'src/app/core/models/protocoltype.model';
import { ProtocoltypeService } from 'src/app/core/service/protocoltype.service';

@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  protocolTypeForm: FormGroup;
  protocolType: ProtocolType;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public protocolTypeService: ProtocoltypeService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = data.protocolType.typeName;
      this.protocolType = data.protocolType;
    } else {
      this.dialogTitle = "Yeni Protokol Tipi";
      this.protocolType = new ProtocolType({});
    }
    this.protocolTypeForm = this.createContactForm();
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
      id: [this.protocolType.id],
      typeName: [this.protocolType.typeName, [Validators.required]],
      status: [this.protocolType.status, [Validators.required]]
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    if (this.protocolTypeForm.valid) {
      this.protocolType = Object.assign({}, this.protocolTypeForm.value);
      // this.patient.userId=this.authService.getCurrentUserId();
      this.protocolTypeService.addProtocolType(this.protocolType);
    }
  }
}
