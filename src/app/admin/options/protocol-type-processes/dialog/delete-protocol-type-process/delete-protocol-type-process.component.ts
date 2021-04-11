import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProtocolTypeProcessService } from 'src/app/core/service/protocol-type-process.service';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';

@Component({
  selector: 'app-delete-protocol-type-process',
  templateUrl: './delete-protocol-type-process.component.html',
  styleUrls: ['./delete-protocol-type-process.component.sass']
})
export class DeleteProtocolTypeProcessComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteProtocolTypeProcessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public protocolTypeProcessService: ProtocolTypeProcessService,
    private sweetAlert:SweetalertService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.protocolTypeProcessService.delete(this.data.protocolTypeProcessId).subscribe(
      (data) => {
        this.dialogRef.close(1);
        this.sweetAlert.delete(data.toString());
      }
    );
}
}
