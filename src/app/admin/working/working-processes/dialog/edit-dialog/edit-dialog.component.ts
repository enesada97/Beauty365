import { WorkingDto } from 'src/app/core/models/workingdto.model';
import { WorkingService } from 'src/app/core/service/working.service';
import { Working } from 'src/app/core/models/working.model';
import { Component, Inject} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.sass']
})
export class EditDialogComponent{
  action: string;
  dialogTitle: string;
  workingForm: FormGroup;
  working: Working;
  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public workingService: WorkingService,
    private fb: FormBuilder,
    private dateAdapter:DateAdapter<any>
  ) {
    console.log(data);
    this.dateAdapter.setLocale('tr');
      this.dialogTitle = "Hizmet Düzenle";
      this.working=data.working;
      console.log(JSON.stringify(this.working));

    this.workingForm = this.createContactForm();
  }
  formControl = new FormControl("", [
    Validators.required,
    // Validators.email,
  ]);
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
      priceIncludeTax :[this.working.priceIncludeTax],
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
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    console.log(this.working);
    if (this.workingForm.valid) {
      let oldPrice=this.working.price;
      let oldArrears=this.working.arrearsValue;
      this.working = Object.assign({}, this.workingForm.value);
      console.log("son hali" + this.working);
      // this.patient.userId=this.authService.getCurrentUserId();
      this.working.arrearsValue=this.working.price-oldPrice+oldArrears;
      this.workingService.save(this.working).subscribe(data=>{
        console.log(JSON.stringify(data));
        this.workingService._sweetAlert.success(data['Hizmet']);
        },
        (error: HttpErrorResponse) => {
          this.workingService.isTblLoading = false;
          console.log(error.name + " " + error.message);
        }
        );
    }
  }
}
