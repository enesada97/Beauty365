import { ProtocolTypeProcessDto } from './../../../../../core/models/protocolTypeProcessDto.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProtocolTypeProcessService } from 'src/app/core/service/protocol-type-process.service';

@Component({
  selector: 'app-delete-protocol-type-process',
  templateUrl: './delete-protocol-type-process.component.html',
  styleUrls: ['./delete-protocol-type-process.component.sass']
})
export class DeleteProtocolTypeProcessComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteProtocolTypeProcessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public protocolTypeProcessService: ProtocolTypeProcessService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.protocolTypeProcessService.delete(this.data.protocolTypeProcessId).subscribe(
      (data) => {
        this.dialogRef.close(1);
        this.protocolTypeProcessService._sweetAlert.delete("İşlem Ayarı");
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
}
}
