import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormFieldSelectionValue } from 'src/app/core/models/form-field-selection-value.model';
import { FormField } from 'src/app/core/models/form-field.model';
import { FormFieldSelectionValueService } from 'src/app/core/service/form-field-selection-value.service';

@Component({
  selector: 'app-save-field-value',
  templateUrl: './save-field-value.component.html',
  styleUrls: ['./save-field-value.component.sass']
})
export class SaveFieldValueComponent implements OnInit {
  filterValue="";
  dialogTitle;
  formField:FormField;
  formFieldValue:FormFieldSelectionValue;
  formFieldSelectionValues:FormFieldSelectionValue[];
  displayedColumns = ["value", "actions"];
  dataSource: MatTableDataSource<FormFieldSelectionValue>;
  fieldValueForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<SaveFieldValueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formFieldSelectionValueService: FormFieldSelectionValueService,
    private fb: FormBuilder
  ) {
      this.formField = data;
      this.dialogTitle="Form Alanı Seçeneklerini düzenle";
      this.formFieldValue=new FormFieldSelectionValue({});
      this.fieldValueForm = this.createTableContactForm();
  }
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  ngOnInit(): void {
    this.getFormFieldValues();
  }
  createTableContactForm(): FormGroup {
    return this.fb.group({
      id: [this.formFieldValue.id],
      formFieldId: [this.formFieldValue.formFieldId],
      value: [this.formFieldValue.value, [Validators.required]],
    });
  }
  getFormFieldValues(){
    this.formFieldSelectionValueService.getListByFormFieldId(this.formField.id).subscribe(m=>{
      this.formFieldSelectionValues=m;
      setTimeout(() => (this.formFieldSelectionValueService.isTblLoading = false), 1000);
        this.dataSource = new MatTableDataSource<FormFieldSelectionValue>(this.formFieldSelectionValues);
        setTimeout(() => (this.dataSource.sort = this.sort));
        setTimeout(() => (this.dataSource.paginator = this.paginator));
      },
      (error: HttpErrorResponse) => {
        this.formFieldSelectionValueService.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    )
  }
  submit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    if (this.fieldValueForm.valid) {
      this.formFieldValue = Object.assign({}, this.fieldValueForm.value);
      console.log("form:" +JSON.stringify(this.formField));
      this.formFieldValue.formFieldId=this.formField.id;
      this.formFieldSelectionValueService.save(this.formFieldValue).subscribe(data=>{
        if(data){
          this.refreshFieldValue();
        }
        },
        (error: HttpErrorResponse) => {
          this.formFieldSelectionValueService.isTblLoading = false;
          console.log(error.name + " " + error.message);
        }
        );
    }
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    deleteItem(i: number, row) {
      const index = i;
      this.formFieldSelectionValueService.delete(row.id).subscribe(data=>{
      this.formFieldSelectionValues.splice(i,1);
      this.refresh();
      this.formFieldSelectionValueService._sweetAlert.delete(""+row.value);
      })
    }
    refresh() {
      this.dataSource = new MatTableDataSource<FormFieldSelectionValue>(
        this.formFieldSelectionValues
      );
      setTimeout(() => (this.dataSource.paginator = this.paginator));
    }
    refreshFieldValue(){
      this.getFormFieldValues();
    }
}
