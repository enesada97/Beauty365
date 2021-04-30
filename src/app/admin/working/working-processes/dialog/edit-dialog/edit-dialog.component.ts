import { WorkingService } from 'src/app/core/service/working.service';
import { Working } from 'src/app/core/models/working.model';
import { Component, Inject} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';
import { WorkingDto } from 'src/app/core/models/workingdto.model';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.sass']
})
export class EditDialogComponent{
  action: string;
  workingForm: FormGroup;
  working: Working;
  workingDto:WorkingDto;
  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public workingService: WorkingService,
    private fb: FormBuilder,
    private dateAdapter:DateAdapter<any>,
    private sweetAlert:SweetalertService
  ) {
    this.dateAdapter.setLocale('tr');
      this.workingDto=data.workingDto;
    this.getWorking();
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.working.id],
      protocolId :[this.working.protocolId],
      processId :[this.working.processId],
      metarialId :[this.working.metarialId],
      doctorId :[this.working.doctorId],
      doctorRatio :[this.working.doctorRatio],
      payType :[this.working.payType],
      paidValue :[this.working.paidValue],
      arrearsValue :[this.working.arrearsValue],
      collectionId :[this.working.collectionId],
      receiptNo :[this.working.receiptNo],
      taxRatio :[this.working.taxRatio],
      nonTaxablePrice :[this.working.nonTaxablePrice],
      user :[this.working.user],
      quantity :[this.working.quantity],
      saleValue :[this.working.saleValue],
      price: [this.working.price],
      workingDateTime: [this.working.workingDateTime]
    });
  }
  submit() {
    // emppty stuff
  }
  getWorking(){
    this.workingService.getById(this.workingDto.workingNo).subscribe(data=>{
      this.working=data;
      this.workingForm = this.createContactForm();
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    if (this.workingForm.valid) {
      let oldPrice=this.working.price;
      let oldArrears=this.working.arrearsValue;
      this.working = Object.assign({}, this.workingForm.value);
      this.working.arrearsValue=this.working.price-oldPrice+oldArrears;
      if(this.working.id==0){
        this.workingService.add(this.working).subscribe(data=>{
          this.dialogRef.close(1);
          this.sweetAlert.success(data);
          }
          );
      }else{
        this.workingService.update(this.working).subscribe(data=>{
          this.dialogRef.close(1);
          this.sweetAlert.info(data);
          }
          );
      }
    }
  }
}
