import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/admin/appointments/all-appointments/delete/delete.component';
import { FormFieldSelectionValue } from 'src/app/core/models/form-field-selection-value.model';
import { FormField } from 'src/app/core/models/form-field.model';
import { FormTable } from 'src/app/core/models/form-table.model';
import { FormFieldSelectionValueService } from 'src/app/core/service/form-field-selection-value.service';
import { FormFieldService } from 'src/app/core/service/form-field.service';
import { FormTableService } from 'src/app/core/service/form-table.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.sass']
})
export class PreviewComponent{
  dynamicFormArray:any;
  dialogTitle:any;
  constructor(
    public dialogRef: MatDialogRef<PreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formTableService: FormTableService,
    private formFieldService: FormFieldService,
    private formFieldSelectionValueService: FormFieldSelectionValueService,
  ) {
    this.dynamicFormArray=data;
    this.getFormField();
    this.dialogTitle="Form Önizleme: "+data.name;
  }
  getFormField(){
    this.formFieldService.getListByFormTableId(this.dynamicFormArray.id).subscribe(field=>{
      this.dynamicFormArray.fields=field;
        for (let i = 0; i < this.dynamicFormArray.fields.length; i++) {
          this.getFormFieldValue(this.dynamicFormArray.fields[i].id,i);
        }
    });
    }
  getFormFieldValue(fieldId,i){
    this.formFieldSelectionValueService.getListByFormFieldId(fieldId).subscribe(value=>{
      this.dynamicFormArray.fields[i].values=value;
      console.log(this.dynamicFormArray);
    })
  }
  onNoClick(): void {
    console.log(this.data);
    this.dialogRef.close();
  }
}
