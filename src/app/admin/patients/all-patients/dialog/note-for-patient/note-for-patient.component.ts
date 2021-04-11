import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient } from 'src/app/core/models/patient.model';
import { PatientService } from 'src/app/core/service/patient.service';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';

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
    private sweetAlert:SweetalertService
  ) {
    this.action = data.action;
    this.patient = data.patient;
   }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    if(this.note.valid){
      this.patient.note=this.note.value;
       this.patientService.update(this.patient).subscribe(data=>{
         this.dialogRef.close(1);
         this.sweetAlert.success(data);
       }
         );
    }
  }

}
