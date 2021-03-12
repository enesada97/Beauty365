// import { HttpErrorResponse } from '@angular/common/http';
// import { Component, Inject, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { FormFieldSelectionValue } from 'src/app/core/models/form-field-selection-value.model';
// import { FormField } from 'src/app/core/models/form-field.model';
// import { FormTable } from 'src/app/core/models/form-table.model';
// import { FormFieldSelectionValueService } from 'src/app/core/service/form-field-selection-value.service';
// import { FormFieldService } from 'src/app/core/service/form-field.service';
// import { FormTableService } from 'src/app/core/service/form-table.service';

// @Component({
//   selector: 'app-save',
//   templateUrl: './save.component.html',
//   styleUrls: ['./save.component.sass']
// })
// export class SaveComponent{
//   action: string;
//   dialogTitle: string;
//   tableForm: FormGroup;
//   tableFieldForm: FormGroup;
//   tableFieldSelectionValueForm: FormGroup;
//   formTable:FormTable;
//   formField:FormField;
//   formFields:FormField[];
//   formFieldValues:FormFieldSelectionValue[];
//   formFieldArray:FormArray;
//   constructor(
//     public dialogRef: MatDialogRef<SaveComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     public formTableService: FormTableService,
//     public formFieldService: FormFieldService,
//     public formFieldSelectionValueService: FormFieldSelectionValueService,
//     private fb: FormBuilder
//   ) {
//     this.action = data.action;
//     if (this.action === "edit") {
//       this.dialogTitle = data.patient.name;
//       this.formTable = data.patient;
//       this.formFieldService.getListByFormTableId(this.formTable.id).subscribe(f=>{
//         this.formFields=f;
//         this.formFields.forEach(m=>{
//           this.formFieldSelectionValueService.getListByFormFieldId(m.id).subscribe(data=>{
//             this.formFieldValues=this.formFieldValues.concat(data);
//           })
//         })
//       })
//     } else {
//       this.dialogTitle = "Yeni Form";
//       this.formTable = new FormTable({});
//       this.formField=new FormField({});
//       this.formFields=[];
//       this.formFieldValues=[];
//     }
//     this.tableForm = this.createTableContactForm();
//     this.tableFieldForm = this.createFieldContactForm();
//     this.tableFieldSelectionValueForm = this.createFieldValueContactForm();
//   }
//   createTableContactForm(): FormGroup {
//     return this.fb.group({
//       id: [this.formTable.id],
//       isOpen: [this.formTable.isOpen, [Validators.required]],
//       name: [this.formTable.name, [Validators.required]],
//     });
//   }
//   createFieldContactForm(): FormGroup {
//     return this.fb.group({
//       formFieldArray: this.fb.array([this.createFieldItems()])
//     });
//   }
//   createFieldItems(){
//     if(this.action=="add"){
//       return this.fb.group({
//         id: [this.formField.id],
//         formControlName: [this.formField.formControlName],
//         formTableId: [this.formField.formTableId],
//         isOpen: [this.formField.isOpen],
//         label: [this.formField.label],
//         type: [this.formField.type],
//       })
//     }else{

//     }
//   }
//   createFieldValueContactForm(): FormGroup {
//     return this.fb.group({
//       id: [this.patient.id],
//       identityNumber: [this.patient.identityNumber, [Validators.required]],
//       name: [this.patient.name, [Validators.required]],
//       surName: [this.patient.surName, [Validators.required]],
//       status: [this.patient.status, [Validators.required]],
//       gender: [this.patient.gender],
//       birthDate: [this.patient.birthDate],
//       phoneNumber: [this.patient.phoneNumber, [Validators.required]],
//       bloodGroup: [this.patient.bloodGroup],
//     });
//   }

//   addFieldItem() {
//     this.formFieldArray=this.tableFieldForm.get('formFieldArray') as FormArray;
//     this.formFieldArray.push(this.createFieldItems());
//   }
//   deleteFieldItem(index){
//     this.formFieldArray=this.tableFieldForm.get('formFieldArray') as FormArray;
//     this.formFieldArray.removeAt(index);
//   }
//   submit() {
//   }
//   onNoClick(): void {
//     this.dialogRef.close();
//   }
//   public confirmAdd(): void {
//     if (this.patientForm.valid) {
//       this.patient = Object.assign({}, this.patientForm.value);
//       console.log("form:" +JSON.stringify(this.patient));
//       this.patientService.save(this.patient).subscribe(data=>{
//         if(data){
//           this.action=="add"?this.dialogRef.close(data):this.dialogRef.close(1);
//           console.log("gelen data:" +data);
//           this.patientService._sweetAlert.success(data['name']);
//         }
//         },
//         (error: HttpErrorResponse) => {
//           this.patientService.isTblLoading = false;
//           console.log(error.name + " " + error.message);
//         }
//         );
//     }
//   }
// }
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormFieldSelectionValue } from 'src/app/core/models/form-field-selection-value.model';
import { FormField } from 'src/app/core/models/form-field.model';
import { FormTable } from 'src/app/core/models/form-table.model';
import { FormFieldSelectionValueService } from 'src/app/core/service/form-field-selection-value.service';
import { FormFieldService } from 'src/app/core/service/form-field.service';
import { FormTableService } from 'src/app/core/service/form-table.service';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.sass']
})
export class SaveComponent{
  action: string;
  dialogTitle: string;
  tableForm: FormGroup;
  formTable:FormTable;
  constructor(
    public dialogRef: MatDialogRef<SaveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formTableService: FormTableService,
    public formFieldService: FormFieldService,
    public formFieldSelectionValueService: FormFieldSelectionValueService,
    private fb: FormBuilder
  ) {
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = data.formTable.name+" Tablosunu Düzenle";
      this.formTable = data.formTable;
    } else {
      this.dialogTitle = "Yeni Form";
      this.formTable = new FormTable({});
    }
    this.tableForm = this.createTableContactForm();
  }
  createTableContactForm(): FormGroup {
    return this.fb.group({
      id: [this.formTable.id],
      isOpen: [this.formTable.isOpen],
      name: [this.formTable.name, [Validators.required]],
    });
  }
  submit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    if (this.tableForm.valid) {
      this.formTable = Object.assign({}, this.tableForm.value);
      console.log("form:" +JSON.stringify(this.formTable));
      this.formTableService.save(this.formTable).subscribe(data=>{
        if(data){
          this.action=="add"?this.dialogRef.close(data):this.dialogRef.close(1);
          console.log("gelen data:" +data);
          this.formTableService._sweetAlert.success(data['name']);
        }
        },
        (error: HttpErrorResponse) => {
          this.formTableService.isTblLoading = false;
          console.log(error.name + " " + error.message);
        }
        );
    }
  }
}
