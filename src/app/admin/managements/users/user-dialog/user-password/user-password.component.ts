import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/core/service/system-service/user.service';
import { MustMatch } from 'src/app/core/directives/must-match.directive';
import { PasswordDto } from 'src/app/core/models/passwordDto';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.sass']
})
export class UserPasswordComponent implements OnInit {
  passwordForm: FormGroup;
  userId: number;
  passwordDto:PasswordDto;
  constructor(
    public dialogRef: MatDialogRef<UserPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: UserService,
    private fb: FormBuilder,
    private sweetAlert:SweetalertService
  ) {
      this.userId = data.userId;
   }
   ngOnInit(): void {
    this.passwordForm = this.createContactForm();
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]],
    },
    {
      validator: MustMatch('password', 'confirmPassword')
    });
  }
  public submit(){
    if (this.passwordForm.valid) {
      this.passwordDto=new PasswordDto();
      this.passwordDto.userId=this.userId;
      this.passwordDto.password=this.passwordForm.value.password;
      this.userService.saveUserPassword(this.passwordDto).subscribe(data => {
        this.dialogRef.close(1);
        this.sweetAlert.success(data);
      })
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

