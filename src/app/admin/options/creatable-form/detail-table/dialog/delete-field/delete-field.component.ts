import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormFieldSelectionValue } from 'src/app/core/models/form-field-selection-value.model';
import { FormField } from 'src/app/core/models/form-field.model';
import { FormFieldSelectionValueService } from 'src/app/core/service/form-field-selection-value.service';
import { FormFieldService } from 'src/app/core/service/form-field.service';

@Component({
  selector: 'app-delete-field',
  templateUrl: './delete-field.component.html',
  styleUrls: ['./delete-field.component.sass']
})
export class DeleteFieldComponent{
  formFieldSelectionValue:FormFieldSelectionValue[]=[];
  constructor(
    public dialogRef: MatDialogRef<DeleteFieldComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormField,
    private formFieldService: FormFieldService,
    private formFieldSelectionValueService: FormFieldSelectionValueService,
  ) {
    this.getFormFieldValue();
  }
  getFormFieldValue(){
    this.formFieldSelectionValueService.getListByFormFieldId(this.data.id).subscribe(m=>{
      this.formFieldSelectionValue=m;
    })
  }
  onNoClick(): void {
    console.log(this.data);
    this.dialogRef.close();
  }
  confirmDelete(): void {
    for (let i = 0; i < this.formFieldSelectionValue.length; i++) {
      const element = this.formFieldSelectionValue[i];
      this.formFieldSelectionValueService.delete(element.id).subscribe(p=>{});
    }
    this.formFieldService.delete(this.data.id).subscribe(c=>{
      this.formFieldService._sweetAlert.delete("Form Alanı");
      this.dialogRef.close(1);
    },(error: HttpErrorResponse) => {
           console.log(error.name + " " + error.message);
       });
}
}
