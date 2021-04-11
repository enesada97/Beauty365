import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';
import { UserService } from 'src/app/core/service/system-service/user.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.sass']
})
export class UserDeleteComponent{
  constructor(
    public dialogRef: MatDialogRef<UserDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: UserService,
    private sweetAlert:SweetalertService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.userService.delete(this.data.userId).subscribe((data) => {
      this.dialogRef.close(1);
      this.sweetAlert.delete(data.toString());
    });
  }
}
