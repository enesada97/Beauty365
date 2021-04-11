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
import { SweetalertService } from "src/app/core/service/sweetalert.service";

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
    private fb: FormBuilder,
    private sweetAlert:SweetalertService
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
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.protocolType.id],
      typeName: [this.protocolType.typeName, [Validators.required]],
      status: [this.protocolType.status, [Validators.required]]
    });
  }
  submit() {
    if (this.protocolTypeForm.valid) {
      this.protocolType = Object.assign({}, this.protocolTypeForm.value);
      if(this.protocolType.id==0){
        this.protocolTypeService.add(this.protocolType).subscribe(data=>{
          this.sweetAlert.success(data.toString());
          this.dialogRef.close(1);
          }
          );
      }else{
        this.protocolTypeService.update(this.protocolType).subscribe(data=>{
          this.sweetAlert.success(data.toString());
          this.dialogRef.close(1);
          }
          );
      }
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
