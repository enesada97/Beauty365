import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormFieldSelectionValueService } from 'src/app/core/service/form-field-selection-value.service';
import { FormFieldService } from 'src/app/core/service/form-field.service';
import { FormTableService } from 'src/app/core/service/form-table.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.sass'],
  providers:[FormTableService,FormFieldService,FormFieldSelectionValueService],
})
export class TestComponent implements OnInit {
  dynamicFormArray:any;
  dynamicFormGroup:FormGroup;
  constructor(private formTableService:FormTableService,private formFieldService:FormFieldService,private formFieldSelectionValueService:FormFieldSelectionValueService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.createFormGroup();
    this.getFormOfTables();
  }
  getFormOfTables(){
    this.formTableService.getAll().subscribe(table=>{
      this.dynamicFormArray=table;
      for (let i = 0; i < this.dynamicFormArray.length; i++) {
        this.getFormFieldOfTables(this.dynamicFormArray[i].id,i);
      }
    });
  }
  getFormFieldOfTables(tableId,i){
    this.formFieldService.getListByFormTableId(tableId).subscribe(field=>{
      this.dynamicFormArray[i].fields=field;
        for (let y = 0; y < this.dynamicFormArray[i].fields.length; y++) {
          this.getFormFieldSelectionValues(this.dynamicFormArray[i].fields[y].id,i,y);
        }
    })
  }
  getFormFieldSelectionValues(fieldId,i,y){
    let index=i;
    this.formFieldSelectionValueService.getListByFormFieldId(fieldId).subscribe(value=>{
      this.dynamicFormArray[i].fields[y].values=value;
      console.log(this.dynamicFormArray);
      this.createFormControl();
    })
  }
  createFormGroup(){
    this.dynamicFormGroup = this.fb.group({

    });
  }
  createFormControl(){
    this.dynamicFormArray[0].fields.forEach(element => {
      this.dynamicFormGroup.addControl(element.formControlName,new FormControl(''));
    });
    console.log(this.dynamicFormGroup);
  }
}
