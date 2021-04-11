import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Group } from 'src/app/core/models/Group';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';
import { GroupService } from 'src/app/core/service/system-service/group.service';

@Component({
  selector: 'app-group-save',
  templateUrl: './group-save.component.html',
  styleUrls: ['./group-save.component.sass']
})
export class GroupSaveComponent implements OnInit {
  action: string;
  groupForm: FormGroup;
  group: Group;
  constructor(
    public dialogRef: MatDialogRef<GroupSaveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public groupService: GroupService,
    private fb: FormBuilder,
    private sweetAlert:SweetalertService
  ) {
    this.action = data.action;
    if (this.action === "edit") {
      this.group = data.group;
    } else {
      this.group = new Group({});
    }
   }
   ngOnInit(): void {
    this.groupForm = this.createContactForm();
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.group.id],
      groupName: [this.group.groupName, [Validators.required]]
    });
  }
  public submit(){
    if (this.groupForm.valid) {
      this.group = Object.assign({}, this.groupForm.value);
      if(this.group.id==0){
        this.groupService.add(this.group).subscribe(data=>{
          this.dialogRef.close(1);
          this.sweetAlert.success(data.toString());
          }
          );
      }else{
        this.groupService.update(this.group).subscribe(data=>{
          this.dialogRef.close(1);
          this.sweetAlert.info(data.toString());
          }
          );
      }
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
