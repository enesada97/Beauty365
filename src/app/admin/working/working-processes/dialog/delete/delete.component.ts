import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Working } from 'src/app/core/models/working.model';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';
import { WorkingService } from 'src/app/core/service/working.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteComponent{
  action: string;
  working=new Working({});
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public workingService: WorkingService,
    private sweetAlert:SweetalertService
  ) {
    this.action=data.action;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.workingService.delete(this.data.row.workingNo).subscribe(data=>{
      this.dialogRef.close(1);
      this.sweetAlert.delete(data.toString());
    })
  }
}
