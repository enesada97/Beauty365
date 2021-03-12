import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormField } from 'src/app/core/models/form-field.model';
import { FormFieldService } from 'src/app/core/service/form-field.service';

@Component({
  selector: 'app-save-field',
  templateUrl: './save-field.component.html',
  styleUrls: ['./save-field.component.sass']
})
export class SaveFieldComponent{
  action: string;
  dialogTitle: string;
  fieldForm: FormGroup;
  formField:FormField;
  formTableId:number;
  types = [
    { name: "Küçük Yazı Alanı", value: "input" },
    { name: "İşaretleme Kutusu", value: "radio" },
    { name: "Tarih Seçici", value: "date" },
    { name: "Seçim Kutusu", value: "select" },
    { name: "Büyük Yazı Alanı", value: "textarea" },
  ];
  constructor(
    public dialogRef: MatDialogRef<SaveFieldComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formFieldService: FormFieldService,
    private fb: FormBuilder
  ) {
    this.action = data.action;
    this.formTableId=data.formTableId;;
    if (this.action === "edit") {
      this.dialogTitle = data.formField.label+" Alanını Düzenle";
      this.formField = data.formField;
    } else {
      this.dialogTitle = "Yeni Form Alanı";
      this.formField = new FormField({});
      this.formField.formTableId=this.formTableId;
    }
    this.fieldForm = this.createTableContactForm();
  }
  createTableContactForm(): FormGroup {
    return this.fb.group({
      id: [this.formField.id],
      formTableId: [this.formField.formTableId],
      label: [this.formField.label, [Validators.required]],
      formControlName: [this.formField.formControlName, [Validators.required]],
      type: [this.formField.type, [Validators.required]],
      isOpen: [this.formField.isOpen]
    });
  }
  submit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    if (this.fieldForm.valid) {
      this.formField = Object.assign({}, this.fieldForm.value);
      console.log("form:" +JSON.stringify(this.formField));
      this.formFieldService.save(this.formField).subscribe(data=>{
        if(data){
          this.action=="add"?this.dialogRef.close(data):this.dialogRef.close(1);
          console.log("gelen data:" +data);
          this.formFieldService._sweetAlert.success(data['type'] +"Tipi Alan");
        }
        },
        (error: HttpErrorResponse) => {
          this.formFieldService.isTblLoading = false;
          console.log(error.name + " " + error.message);
        }
        );
    }
  }
}
