import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LookUp } from 'src/app/core/models/LookUp';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';
import { LookUpService } from 'src/app/core/service/system-service/lookUp.service';
import { UserService } from 'src/app/core/service/system-service/user.service';

@Component({
  selector: 'app-user-claim',
  templateUrl: './user-claim.component.html',
  styleUrls: ['./user-claim.component.sass']
})
export class UserClaimComponent implements OnInit {
  claimDropdownList:LookUp[];
  claimSelectedItems:LookUp[];
  isClaimChange: boolean = false;
  userId:number;
  constructor(
    public dialogRef: MatDialogRef<UserClaimComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: UserService,
    private lookupService:LookUpService,
    private sweetAlert:SweetalertService
  ) {
      this.userId = data.userId;
   }
   ngOnInit(): void {
    this.lookupService.getOperationClaimLookUp().subscribe(data=>{
      this.claimDropdownList=data;
    });
    this.getUserClaims(this.userId);
  }
  getUserClaims(userId:number){
    this.userService.getUserClaims(userId).subscribe(data => {
      this.claimSelectedItems = data;
    })

  }
  saveUserClaims(){

    if(this.isClaimChange){
      var ids=this.claimSelectedItems.map(function(x){ return x.id as number});
      this.userService.saveUserClaims(this.userId, ids).subscribe(x=>{
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
