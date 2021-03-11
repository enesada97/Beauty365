import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient } from 'src/app/core/models/patient.model';
import { PatientService } from 'src/app/core/service/patient.service';

@Component({
  selector: 'app-note-for-patient',
  templateUrl: './note-for-patient.component.html',
  styleUrls: ['./note-for-patient.component.sass']
})
export class NoteForPatientComponent{
  action: string;
  dialogTitle:string;
  patient:Patient;
    note = new FormControl("", [
      Validators.required,
    ]);
  constructor(
    public dialogRef: MatDialogRef<NoteForPatientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public patientService: PatientService,
    private fb: FormBuilder,
  ) {
    this.action = data.action;
    this.dialogTitle = data.dialogTitle;
    this.patient = data.patient;
   }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    if(this.note.valid){
      this.patient.note=this.note.value;
         // this.patient.userId=this.authService.getCurrentUserId();
       this.patientService.save(this.patient).subscribe(data=>{},
         (error: HttpErrorResponse) => {
           this.patientService.isTblLoading = false;
           console.log(error.name + " " + error.message);
        }
         );
    }
  }

}
