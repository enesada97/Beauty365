import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Protocol } from 'src/app/core/models/protocol.model';
import { ProtocolService } from 'src/app/core/service/protocol.service';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';

@Component({
  selector: 'app-delete2',
  templateUrl: './delete2.component.html',
  styleUrls: ['./delete2.component.sass']
})
export class Delete2Component{
  protocol:Protocol;
  constructor(
    public dialogRef: MatDialogRef<Delete2Component>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public protocolService: ProtocolService,
    private sweetAlert:SweetalertService
  ) {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.protocolService.getById(this.data.row.protocolNo).subscribe(data=>{
      this.protocol=data;
      this.protocol.status=false;
      this.protocolService.update(this.protocol).subscribe(
        (data) => {
          this.dialogRef.close(1);
          this.sweetAlert.delete(data.toString());
        }
      );
    })
}
}
