import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';
import { GroupService } from 'src/app/core/service/system-service/group.service';

@Component({
  selector: 'app-group-delete',
  templateUrl: './group-delete.component.html',
  styleUrls: ['./group-delete.component.sass']
})
export class GroupDeleteComponent{
  constructor(
    public dialogRef: MatDialogRef<GroupDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public groupService: GroupService,
    private sweetAlert:SweetalertService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.groupService.delete(this.data.id).subscribe((data) => {
      this.dialogRef.close(1);
      this.sweetAlert.delete(data.toString());
    });
  }
}
