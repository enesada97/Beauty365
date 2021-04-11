import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Working } from 'src/app/core/models/working.model';
import { WorkingService } from 'src/app/core/service/working.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteComponent{
  action: string;
  working: Working;
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public workingService: WorkingService
  ) {
    this.action=data.action;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    if(this.action=="delete"){
    this.workingService.delete(this.data.row.id).subscribe(
      (data) => {
      }
    );
    }else{
      this.working=new Working({});
      this.workingService.getById(this.data.row.id).subscribe(data=>{
        this.working=data;
        this.working.arrearsValue=this.working.price;
        this.working.payType=0;
        this.working.paidValue=0;
        this.working.saleValue=0;
        if(this.working.id==0){
          this.workingService.add(this.working).subscribe(data=>{
            }
            );
        }else{
          this.workingService.update(this.working).subscribe(data=>{
            }
            );
        }
      })
    }
  }
}
