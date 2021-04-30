import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { InvoiceDetail } from "src/app/core/models/invoice-detail.model";
import { Invoice } from "src/app/core/models/invoice.model";
import { WorkingDto } from "src/app/core/models/workingdto.model";
import { InvoiceDetailService } from "src/app/core/service/invoice-detail.service";
import { InvoiceService } from "src/app/core/service/invoice.service";
import { SweetalertService } from "src/app/core/service/sweetalert.service";
import { WorkingService } from "src/app/core/service/working.service";

@Component({
  selector: "app-add-invoices-dialog",
  templateUrl: "./add-invoices-dialog.component.html",
  styleUrls: ["./add-invoices-dialog.component.sass"],
})
export class AddInvoicesDialogComponent {
  paymentBillNo: number;
  invoice: Invoice;
  invoiceDetail: InvoiceDetail;
  workingDtos: WorkingDto[];
  patientId: number;
  protocolId: number;
  userName: string;
  discount: number;
  totalPrice: number;
  selectedWorkings:any;
  constructor(
    public dialogRef: MatDialogRef<AddInvoicesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private invoiceService: InvoiceService,
    private invoiceDetailService: InvoiceDetailService,
    private sweetAlert: SweetalertService,
    private router: Router,
    private workingService:WorkingService
  ) {
    // Set the defaults
    this.workingDtos = data.workingDtos;
    this.protocolId = data.protocolId;
    this.patientId = data.patientId;
    this.userName = data.userName;
  }
  submit() {
    let totalWithOutTax=0;
    this.selectedWorkings.forEach((m) => {
      totalWithOutTax = totalWithOutTax + m.nonTaxablePrice;
    });
    let total=0;
    this.selectedWorkings.forEach((m) => {
      total = total + m.price;
    });
    let discount=0;
    this.selectedWorkings.forEach((m) => {
      discount = discount + m.saleValue;
    });
    this.invoice = new Invoice({});
    // this.invoice.addedBy = this.userName;
    this.invoice.addedBy = '';
    this.invoice.addedDate = new Date();
    this.invoice.totalPrice = total;
    this.invoice.taxValue = total - totalWithOutTax;
    this.invoice.discountValue = discount;
    this.invoice.patientDataId = this.patientId;
    this.invoice.paymentBillNo = this.paymentBillNo;
    this.invoice.protocolId = this.protocolId;
    this.invoice.totalPrice = this.invoice.totalPrice-this.invoice.discountValue;
    this.invoiceService.add(this.invoice).subscribe((data) => {
      for (let i = 0; i < this.selectedWorkings.length; i++) {
        const element = this.selectedWorkings[i];
        this.invoiceDetail = new InvoiceDetail({});
        this.invoiceDetail.invoiceId = JSON.parse(data).data.id;
        this.invoiceDetail.price = element.price;
        this.invoiceDetail.processId = element.processId;
        this.invoiceDetail.quantity = element.quantity;
        this.invoiceDetail.totalPrice = element.price;
        this.invoiceDetailService.add(this.invoiceDetail).subscribe((inv) => {
          this.workingService.getById(element.workingNo).subscribe(upt=>{
            upt.invoiceDetailId=JSON.parse(inv).data.id;
            this.workingService.update(upt).subscribe(work=>{});
          })
          if (
            element.workingNo ==
            this.selectedWorkings[this.selectedWorkings.length - 1].workingNo
          ) {
            this.sweetAlert.success(inv);
            this.dialogRef.close(1);
            this.router.navigate([
              "/admin/invoices/all-invoices/detail-invoice/" + JSON.parse(data).data.id,
            ]);
          }
        });
      }
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
