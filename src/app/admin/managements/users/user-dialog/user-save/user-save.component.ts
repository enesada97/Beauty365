import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/core/models/user';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';
import { UserService } from 'src/app/core/service/system-service/user.service';

@Component({
  selector: 'app-user-save',
  templateUrl: './user-save.component.html',
  styleUrls: ['./user-save.component.sass']
})
export class UserSaveComponent implements OnInit {
  action: string;
  userForm: FormGroup;
  user: User;
  constructor(
    public dialogRef: MatDialogRef<UserSaveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: UserService,
    private fb: FormBuilder,
    private sweetAlert:SweetalertService
  ) {
    this.action = data.action;
    if (this.action === "edit") {
      this.user = data.user;
    } else {
      this.user = new User({});
    }
   }
   ngOnInit(): void {
    this.userForm = this.createContactForm();
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      userId: [this.user.userId],
      address: [this.user.address],
      email: [this.user.email, [Validators.required]],
      fullName: [this.user.fullName, [Validators.required]],
      mobilePhones: [this.user.mobilePhones],
      notes: [this.user.notes],
      status: [this.user.status]
    });
  }
  public submit(){
    if (this.userForm.valid) {
      this.user = Object.assign({}, this.userForm.value);
      if(this.user.userId==0){
        this.userService.add(this.user).subscribe(data=>{
          this.dialogRef.close(1);
          this.sweetAlert.success(data);
          }
          );
      }else{
        this.userService.update(this.user).subscribe(data=>{
          this.dialogRef.close(1);
          this.sweetAlert.info(data);
          }
          );
      }
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
