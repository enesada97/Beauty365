import { ProcessgroupService } from './../../../../../core/service/processgroup.service';
import { Component, Inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteComponent{
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public processgroupService: ProcessgroupService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.data.status=true;
    //this.patientService.deletePatient(this.data.id);
    this.processgroupService.delete(this.data.id).subscribe(
                (data) => {},
                (error: HttpErrorResponse) => {
                  console.log(error.name + " " + error.message);
                }
              );
  }
}