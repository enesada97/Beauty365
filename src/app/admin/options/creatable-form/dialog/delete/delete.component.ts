import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormFieldSelectionValue } from 'src/app/core/models/form-field-selection-value.model';
import { FormField } from 'src/app/core/models/form-field.model';
import { FormTable } from 'src/app/core/models/form-table.model';
import { FormFieldSelectionValueService } from 'src/app/core/service/form-field-selection-value.service';
import { FormFieldService } from 'src/app/core/service/form-field.service';
import { FormTableService } from 'src/app/core/service/form-table.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteComponent{
  formFields:FormField[]=[];
  formFieldSelectionValue:FormFieldSelectionValue[]=[];
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormTable,
    public formTableService: FormTableService,
    private formFieldService: FormFieldService,
    private formFieldSelectionValueService: FormFieldSelectionValueService,
  ) {
    this.getFormField();
  }
  getFormField(){
    this.formFieldService.getListByFormTableId(this.data.id).subscribe(m=>{
      this.formFields=m;
    this.getFormFieldValue();
    })
  }
  getFormFieldValue(){
    for (let i = 0; i < this.formFields.length; i++) {
      const element = this.formFields[i];
      this.formFieldSelectionValueService.getListByFormFieldId(element.id).subscribe(p=>{
        this.formFieldSelectionValue=this.formFieldSelectionValue.concat(p);
      })
    }
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
    for (let y = 0; y < this.formFields.length; y++) {
      const element = this.formFields[y];
      this.formFieldService.delete(element.id).subscribe(e=>{});
    }
    this.formTableService.delete(this.data.id).subscribe(c=>{
      this.formTableService._sweetAlert.delete("Form");
      this.dialogRef.close(1);
    },(error: HttpErrorResponse) => {
           console.log(error.name + " " + error.message);
       });
}
}
