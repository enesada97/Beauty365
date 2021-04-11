import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LookUp } from 'src/app/core/models/LookUp';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';
import { GroupService } from 'src/app/core/service/system-service/group.service';
import { LookUpService } from 'src/app/core/service/system-service/lookUp.service';

@Component({
  selector: 'app-group-claim',
  templateUrl: './group-claim.component.html',
  styleUrls: ['./group-claim.component.sass']
})
export class GroupClaimComponent implements OnInit {
  claimDropdownList:LookUp[];
  claimSelectedItems:LookUp[];
  isClaimChange: boolean = false;
  groupId:number;
  constructor(
    public dialogRef: MatDialogRef<GroupClaimComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public groupService: GroupService,
    private lookupService:LookUpService,
    private sweetAlert:SweetalertService
  ) {
      this.groupId = data.groupId;
   }
   ngOnInit(): void {
    this.lookupService.getOperationClaimLookUp().subscribe(data=>{
      this.claimDropdownList=data;
    });
    this.getGroupClaims(this.groupId);
  }
  getGroupClaims(groupId:number){
    this.groupService.getGroupClaims(groupId).subscribe(data => {
      this.claimSelectedItems = data;
    })

  }
  saveGroupClaims(){

    if(this.isClaimChange){
      var ids=this.claimSelectedItems.map(function(x){ return x.id as number});
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
    if (comboType == "Claim")
      this.isClaimChange = true;

  }
}
