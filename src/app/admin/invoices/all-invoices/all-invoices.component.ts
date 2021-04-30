import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InvoiceDto } from 'src/app/core/models/invoice-dto.model';
import { Invoice } from 'src/app/core/models/invoice.model';
import { InvoiceService } from 'src/app/core/service/invoice.service';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';
import { AuthService } from 'src/app/core/service/system-service/auth.service';
import { DeleteInvoiceComponent } from './invoice-dialogs/delete-invoice/delete-invoice.component';
import { PreviewInvoiceDetailsComponent } from './invoice-dialogs/preview-invoice-details/preview-invoice-details.component';

@Component({
  selector: 'app-all-invoices',
  templateUrl: './all-invoices.component.html',
  styleUrls: ['./all-invoices.component.sass']
})
export class AllInvoicesComponent implements OnInit {
  displayedColumns = ["select", "patientName","patientSurName","totalPrice","paymentBillNo","discountValue","addedDate","addedBy", "actions"];
  selection = new SelectionModel<InvoiceDto>(true, []);
  invoiceList: InvoiceDto[];
  dataSource: MatTableDataSource<InvoiceDto>;
  invoice: Invoice | null;
  constructor(
    public dialog: MatDialog,
    public invoiceService: InvoiceService,
    private authService:AuthService,
    private sweetAlert:SweetalertService
  ) {}
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  ngOnInit(): void {
    this.getInvoiceList();
  }
  refresh() {
    this.getInvoiceList();
  }
  getInvoiceList() {
    this.invoiceService.getDtoList().subscribe((data) => {
      setTimeout(() => (this.invoiceService.isTblLoading = false), 1000);
      this.invoiceList = data;
      this.dataSource = new MatTableDataSource<InvoiceDto>(this.invoiceList);
           setTimeout(() => this.dataSource.sort = this.sort);
           setTimeout(() => this.dataSource.paginator = this.paginator);
           });
  }
  previewInvoiceDetails(row){
    const dialogRef = this.dialog.open(PreviewInvoiceDetailsComponent, {
      data: {
        invoice: row,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refresh();
      }
    });
  }
  deleteItem(row) {
    const dialogRef = this.dialog.open(DeleteInvoiceComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refresh();
      }
    });
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }
  removeSelectedRows() {
    const alertCounter = this.selection.selected[this.selection.selected.length-1].invoiceId;
    this.selection.selected.forEach((item) => {
      this.invoiceService.delete(item.invoiceId).subscribe((data) => {
        if(item.invoiceId==alertCounter){
          this.refresh();
          this.sweetAlert.delete(data.toString());
        }
      });
      this.selection = new SelectionModel<InvoiceDto>(true, []);
    });
  }
  checkClaim(claim: string): boolean {
    return this.authService.claimGuard(claim);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
