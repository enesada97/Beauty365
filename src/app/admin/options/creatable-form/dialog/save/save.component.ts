import { Component, Inject} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormTable } from 'src/app/core/models/form-table.model';
import { AuthService } from 'src/app/core/service/system-service/auth.service';
import { FormTableService } from 'src/app/core/service/form-table.service';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.sass']
})
export class SaveComponent{
  action: string;
  tableForm: FormGroup;
  formTable:FormTable;
  userName: string;
  constructor(
    public dialogRef: MatDialogRef<SaveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formTableService: FormTableService,
    private fb: FormBuilder,
    private authService: AuthService,
    private sweetAlert:SweetalertService
  ) {
    this.userName=this.authService.getUserName();
    this.action = data.action;
    if (this.action === "edit") {
      this.formTable = data.formTable;
    } else {
      this.formTable = new FormTable({});
    }
    this.tableForm = this.createTableContactForm();
  }
  createTableContactForm(): FormGroup {
    return this.fb.group({
      id: [this.formTable.id],
      isOpen: [this.formTable.isOpen],
      name: [this.formTable.name, [Validators.required]],
      addedBy : [this.formTable.addedBy],
    });
  }
  submit() {
    if (this.tableForm.valid&&this.userName) {
      this.formTable = Object.assign({}, this.tableForm.value);
      // this.formTable.addedBy=this.userName;
      this.formTable.addedBy='';
      if(this.formTable.id==0){
        this.formTableService.add(this.formTable).subscribe(data=>{
          this.dialogRef.close(JSON.parse(data).data);
          this.sweetAlert.success(JSON.parse(data).data);
          }
          );
      }else{
        this.formTableService.update(this.formTable).subscribe(data=>{
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
