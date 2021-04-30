import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InvoiceDetailDto } from 'src/app/core/models/invoice-detail-dto.model';
import { InvoiceDto } from 'src/app/core/models/invoice-dto.model';
import { InvoiceDetailService } from 'src/app/core/service/invoice-detail.service';
import { AuthService } from 'src/app/core/service/system-service/auth.service';
import { DeleteInvoiceDetailComponent } from './invoice-detail-dialog/delete-invoice-detail/delete-invoice-detail.component';

@Component({
  selector: 'app-preview-invoice-details',
  templateUrl: './preview-invoice-details.component.html',
  styleUrls: ['./preview-invoice-details.component.sass']
})
export class PreviewInvoiceDetailsComponent implements OnInit {
  invoice:InvoiceDto;
  invoiceDetails: InvoiceDetailDto[];
  displayedColumns = ["processName", "price", "quantity", "totalPrice"];
  dataSource: MatTableDataSource<InvoiceDetailDto>;
  filterValue="";
  constructor(
    public dialogRef: MatDialogRef<PreviewInvoiceDetailsComponent>,
    public invoiceDetailService: InvoiceDetailService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private authService:AuthService
  ) {
    this.invoice=data.invoice;
  }
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  ngOnInit(): void {
    this.getListByInvoiceId(this.invoice.invoiceId);
  }
  checkClaim(claim:string):boolean{
		return this.authService.claimGuard(claim)
	}
  getListByInvoiceId(id: number) {
    this.invoiceDetailService.getDtoListByInvoiceId(id).subscribe(
      (data) => {
        setTimeout(() => (this.invoiceDetailService.isTblLoading = false), 1000);
        this.invoiceDetails = data;
        this.dataSource = new MatTableDataSource<InvoiceDetailDto>(this.invoiceDetails);
        setTimeout(() => (this.dataSource.sort = this.sort));
        setTimeout(() => (this.dataSource.paginator = this.paginator));
      }
    );
  }
  refresh() {
    this.getListByInvoiceId(this.invoice.invoiceId);
  }
  deleteItem(row) {
    const dialogRef = this.dialog.open(DeleteInvoiceDetailComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refresh();
      }
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
