import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Invoice } from 'src/app/core/models/invoice.model';
import { InvoiceDetailService } from 'src/app/core/service/invoice-detail.service';
import { InvoiceService } from 'src/app/core/service/invoice.service';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';

@Component({
  selector: 'app-delete-invoice',
  templateUrl: './delete-invoice.component.html',
  styleUrls: ['./delete-invoice.component.sass']
})
export class DeleteInvoiceComponent{
  invoice:Invoice;
  constructor(
    public dialogRef: MatDialogRef<DeleteInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public invoiceService: InvoiceService,
    private sweetAlert:SweetalertService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
    this.getInvoiceById(this.data.invoiceId);
  }
  getInvoiceById(id:number){
    this.invoiceService.getById(id).subscribe(data=>{
      this.invoice=data;
    })
  }
  confirmDelete(): void {
    this.invoice.cancelled=true;
    this.invoiceService.update(this.invoice).subscribe(
      (data) => {
        this.dialogRef.close(1);
        this.sweetAlert.delete(data.toString());
      }
    );
}
}
