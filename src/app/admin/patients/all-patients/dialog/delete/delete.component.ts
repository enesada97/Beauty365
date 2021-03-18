import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { PatientService } from 'src/app/core/service/patient.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass'],
})
export class DeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public patientService: PatientService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.data.status=true;
    //this.patientService.deletePatient(this.data.id);
    this.patientService.delete(this.data.id).subscribe(
                (data) => {
                  this.dialogRef.close(1);
                  this.patientService._sweetAlert.delete(this.data.name);
                },
                (error: HttpErrorResponse) => {
                  console.log(error.name + " " + error.message);
                }
              );
  }
}
