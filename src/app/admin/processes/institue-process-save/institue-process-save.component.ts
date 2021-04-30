import { AddDialogComponent } from './dialog/add-dialog/add-dialog.component';
import { ProcessInstitueDto } from './../../../core/models/process-institue-dto.model';
import { ProcessInstitueService } from './../../../core/service/process-institue.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DeleteDialogComponent } from './dialog/delete-dialog/delete-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/core/service/system-service/auth.service';

@Component({
  selector: 'app-institue-process-save',
  templateUrl: './institue-process-save.component.html',
  styleUrls: ['./institue-process-save.component.sass']
})
export class InstitueProcessSaveComponent implements OnInit {
  displayedColumns = ["select", "processGroupName","processName","institutionName","price","actions"];
  selection = new SelectionModel<ProcessInstitueDto>(true, []);
  processInstitueDtoList: ProcessInstitueDto[];
  dataSource: MatTableDataSource<ProcessInstitueDto>;
  processInstitueDto: ProcessInstitueDto | null;
  constructor(
    public dialog: MatDialog,
    public processInstitueService: ProcessInstitueService,
    private authService:AuthService,
    private sweetAlert:SweetalertService
  ) {}
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  ngOnInit(): void {
    this.getProcessInstitueDtoList();
  }
  refresh() {
    this.getProcessInstitueDtoList();
  }
  getProcessInstitueDtoList() {
    this.processInstitueService.getDtoList().subscribe((data) => {
      setTimeout(() => (this.processInstitueService.isTblLoading = false), 1000);
      this.processInstitueDtoList = data;
      this.dataSource = new MatTableDataSource<ProcessInstitueDto>(this.processInstitueDtoList);
           setTimeout(() => this.dataSource.sort = this.sort);
           setTimeout(() => this.dataSource.paginator = this.paginator);
           });
  }
  addNew() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {
        processInstitueDto: this.processInstitueDto,
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
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {
        processInstitueDto: row,
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
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
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
    const alertCounter=this.selection.selected[this.selection.selected.length-1].processInstitueNo;
    this.selection.selected.forEach((item) => {
      const index: number = item.processInstitueNo;
      this.processInstitueService.delete(index).subscribe((data) => {
        if (index == alertCounter) {
          this.refresh();
          this.sweetAlert.delete(data.toString());
        }
      });
      this.selection = new SelectionModel<ProcessInstitueDto>(true, []);
    });
  }
  checkClaim(claim: string): boolean {
    return this.authService.claimGuard(claim);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
