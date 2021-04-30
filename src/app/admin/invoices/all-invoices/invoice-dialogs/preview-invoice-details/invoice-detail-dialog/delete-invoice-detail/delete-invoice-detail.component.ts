import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InvoiceDetailService } from 'src/app/core/service/invoice-detail.service';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';

@Component({
  selector: 'app-delete-invoice-detail',
  templateUrl: './delete-invoice-detail.component.html',
  styleUrls: ['./delete-invoice-detail.component.sass']
})
export class DeleteInvoiceDetailComponent{
  constructor(
    public dialogRef: MatDialogRef<DeleteInvoiceDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public invoiceDetailService: InvoiceDetailService,
    private sweetAlert:SweetalertService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.invoiceDetailService.delete(this.data.invoiceDetailId).subscribe(
      (data) => {
        this.dialogRef.close(1);
        this.sweetAlert.delete(data.toString());
      }
    );
}
}
