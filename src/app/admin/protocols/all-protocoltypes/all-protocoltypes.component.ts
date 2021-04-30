import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProtocolType } from 'src/app/core/models/protocoltype.model';
import { ProtocoltypeService } from 'src/app/core/service/protocoltype.service';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';
import { AuthService } from 'src/app/core/service/system-service/auth.service';
import { DeleteComponent } from './dialog/delete/delete.component';
import { FormDialogComponent } from './dialog/form-dialog/form-dialog.component';

@Component({
  selector: 'app-all-protocoltypes',
  templateUrl: './all-protocoltypes.component.html',
  styleUrls: ['./all-protocoltypes.component.sass']
})
export class AllProtocoltypesComponent implements OnInit {
  displayedColumns = ["select", "typeName", "actions"];
  selection = new SelectionModel<ProtocolType>(true, []);
  protocolTypeList: ProtocolType[];
  dataSource: MatTableDataSource<ProtocolType>;
  protocolType: ProtocolType | null;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public protocolTypeService: ProtocoltypeService,
    private authService:AuthService,
    private sweetAlert:SweetalertService
  ) {}
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  ngOnInit(): void {
    this.getProtocolTypeList();
  }
  refresh() {
    this.getProtocolTypeList();
  }
  getProtocolTypeList() {
    this.protocolTypeService.getList().subscribe((data) => {
      setTimeout(() => (this.protocolTypeService.isTblLoading = false), 1000);
      this.protocolTypeList = data;
      this.dataSource = new MatTableDataSource<ProtocolType>(this.protocolTypeList);
           setTimeout(() => this.dataSource.sort = this.sort);
           setTimeout(() => this.dataSource.paginator = this.paginator);
           });
  }
  addNew() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        protocolType: this.protocolType,
        action: "add",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refresh();
      }
    });
  }
  editCall(row) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        protocolType: row,
        action: "edit",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refresh();
      }
    });
  }
  deleteItem(row) {
    const dialogRef = this.dialog.open(DeleteComponent, {
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
    const alertCounter = this.selection.selected[this.selection.selected.length-1].id;
    let latestId = this.selection.selected[this.selection.selected.length - 1]
      .id;
    this.selection.selected.forEach((item) => {
      const index: number = item.id;
      this.protocolTypeService.delete(index).subscribe((data) => {
        index==alertCounter?this.sweetAlert.delete(data.toString()):null;
        this.refresh();
      });
      this.selection = new SelectionModel<ProtocolType>(true, []);
    });
  }
  checkClaim(claim: string): boolean {
    return this.authService.claimGuard(claim);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
