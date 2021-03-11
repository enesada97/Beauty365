import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProtocolService } from 'src/app/core/service/protocol.service';

@Component({
  selector: 'app-delete2',
  templateUrl: './delete2.component.html',
  styleUrls: ['./delete2.component.sass']
})
export class Delete2Component{
  constructor(
    public dialogRef: MatDialogRef<Delete2Component>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public protocolService: ProtocolService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.data.status=true;
    this.protocolService.delete(this.data.protocolNo);
  }
}
