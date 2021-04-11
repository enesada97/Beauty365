import { ProcessInstitueService } from './../../../../../core/service/process-institue.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.sass']
})
export class DeleteDialogComponent{
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public processInstitueService: ProcessInstitueService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.processInstitueService.delete(this.data.id).subscribe(
      (data) => {
        this.dialogRef.close(1);
      }
    );
}
}
