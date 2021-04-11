import { ProcessgroupService } from './../../../core/service/processgroup.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProcessGroup } from 'src/app/core/models/processgroup.model';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormDialogComponent } from './dialog/form-dialog/form-dialog.component';
import { DeleteComponent } from './dialog/delete/delete.component';
import { AuthService } from 'src/app/core/service/system-service/auth.service';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';

@Component({
  selector: 'app-all-process-group',
  templateUrl: './all-process-group.component.html',
  styleUrls: ['./all-process-group.component.sass']
})
export class AllProcessGroupComponent implements OnInit {
  displayedColumns = ["select", "name", "actions"];
  selection = new SelectionModel<ProcessGroup>(true, []);
  processGroupList: ProcessGroup[];
  dataSource: MatTableDataSource<ProcessGroup>;
  processGroup: ProcessGroup | null;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public processGroupService: ProcessgroupService,
    private authService:AuthService,
    private sweetAlert:SweetalertService
  ) {}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  ngOnInit(): void {
    this.getProcessGroupList();
  }
  refresh() {
    this.getProcessGroupList();
  }
  getProcessGroupList() {
    this.processGroupService.getList().subscribe((data) => {
      setTimeout(() => (this.processGroupService.isTblLoading = false), 1000);
      this.processGroupList = data;
      this.dataSource = new MatTableDataSource<ProcessGroup>(this.processGroupList);
           setTimeout(() => this.dataSource.sort = this.sort);
           setTimeout(() => this.dataSource.paginator = this.paginator);
           });
  }
  addNew() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        processGroup: this.processGroup,
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
        processGroup: row,
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
    const alertCounter=this.selection.selected[this.selection.selected.length-1].id;
    this.selection.selected.forEach((item) => {
      const index: number = item.id;
      item.status=false;
      this.processGroupService.update(item).subscribe((data) => {
        if (index == alertCounter) {
          this.refresh();
          this.sweetAlert.delete(data.toString());
        }
      });
      this.selection = new SelectionModel<ProcessGroup>(true, []);
    });
  }
  checkClaim(claim: string): boolean {
    return this.authService.claimGuard(claim);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
