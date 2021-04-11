import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LookUp } from 'src/app/core/models/LookUp';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';
import { GroupService } from 'src/app/core/service/system-service/group.service';
import { LookUpService } from 'src/app/core/service/system-service/lookUp.service';

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.sass']
})
export class GroupUsersComponent implements OnInit {
  userDropdownList:LookUp[];
  userSelectedItems:LookUp[];
  isUserChange: boolean = false;
  groupId:number;
  constructor(
    public dialogRef: MatDialogRef<GroupUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public groupService: GroupService,
    private lookupService:LookUpService,
    private sweetAlert:SweetalertService
  ) {
      this.groupId = data.groupId;
   }
   ngOnInit(): void {
    this.lookupService.getUserLookUp().subscribe(data=>{
      this.userDropdownList=data;
    });
    this.getGroupUsers(this.groupId);
  }
  getGroupUsers(groupId:number){

    this.groupId=groupId;

   this.groupService.getGroupUsers(groupId).subscribe(data => {
     this.userSelectedItems = data;
   })

 }
 saveGroupUsers(){

    if(this.isUserChange){
      var ids=this.userSelectedItems.map(function(x){ return x.id as number});
      this.groupService.saveGroupClaims(this.groupId, ids).subscribe(x=>{
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
    if (comboType == "User")
      this.isUserChange = true;

  }
}
