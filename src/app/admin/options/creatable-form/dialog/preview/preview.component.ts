import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormFieldSelectionValueService } from 'src/app/core/service/form-field-selection-value.service';
import { FormFieldService } from 'src/app/core/service/form-field.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.sass']
})
export class PreviewComponent{
  dynamicFormArray:any;
  constructor(
    public dialogRef: MatDialogRef<PreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formFieldService: FormFieldService,
    private formFieldSelectionValueService: FormFieldSelectionValueService,
  ) {
    this.dynamicFormArray=data;
    this.getFormField();
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
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
