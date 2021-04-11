import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LookUp } from 'src/app/core/models/LookUp';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';
import { LookUpService } from 'src/app/core/service/system-service/lookUp.service';
import { UserService } from 'src/app/core/service/system-service/user.service';

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.sass']
})
export class UserGroupsComponent implements OnInit {
  groupDropdownList: LookUp[];
  groupSelectedItems: LookUp[];
  isUserChange: boolean = false;
  userId: number;
  constructor(
    public dialogRef: MatDialogRef<UserGroupsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: UserService,
    private lookupService:LookUpService,
    private sweetAlert:SweetalertService
  ) {
      this.userId = data.userId;
   }
   ngOnInit(): void {
    this.lookupService.getGroupLookUp().subscribe(data => {
      this.groupDropdownList = data;
    });
    this.getUserUsers(this.userId);
  }
  getUserUsers(userId:number){

    this.userId=userId;

   this.userService.getUserGroupPermissions(this.userId).subscribe(data => {
     this.groupSelectedItems = data;
   })

 }
 saveUserGroupsPermissions(){

    if(this.isUserChange){
      var ids=this.groupSelectedItems.map(function(x){ return x.id as number});
      this.userService.saveUserGroupPermissions(this.userId, ids).subscribe(x=>{
        this.dialogRef.close(1);
        this.sweetAlert.success(x);
      });
      }

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onItemSelect(comboType: string) {
    this.setComboStatus(comboType);
  }

  onSelectAll(comboType: string) {
    this.setComboStatus(comboType);
  }
  onItemDeSelect(comboType: string) {
    this.setComboStatus(comboType);
  }

  setComboStatus(comboType: string) {
    if (comboType == "Group")
      this.isUserChange = true;

  }
}
