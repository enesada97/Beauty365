import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Institution } from 'src/app/core/models/institution.model';
import { InstitutionService } from 'src/app/core/service/institution.service';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';
import { AuthService } from 'src/app/core/service/system-service/auth.service';
import { DeleteComponent } from './dialog/delete/delete.component';
import { FormDialogComponent } from './dialog/form-dialog/form-dialog.component';

@Component({
  selector: 'app-all-institutions',
  templateUrl: './all-institutions.component.html',
  styleUrls: ['./all-institutions.component.sass']
})
export class AllInstitutionsComponent implements OnInit {
  displayedColumns = ["select", "institutionName", "actions"];
  selection = new SelectionModel<Institution>(true, []);
  institutionList: Institution[];
  dataSource: MatTableDataSource<Institution>;
  institution: Institution | null;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public institutionService: InstitutionService,
    private authService:AuthService,
    private sweetAlert:SweetalertService
  ) {}
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  ngOnInit(): void {
    this.getInstitutionList();
  }
  refresh() {
    this.getInstitutionList();
  }
  getInstitutionList() {
    this.institutionService.getList().subscribe((data) => {
      setTimeout(() => (this.institutionService.isTblLoading = false), 1000);
      this.institutionList = data;
      this.dataSource = new MatTableDataSource<Institution>(this.institutionList);
           setTimeout(() => this.dataSource.sort = this.sort);
           setTimeout(() => this.dataSource.paginator = this.paginator);
           });
  }
  addNew() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        institution: this.institution,
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
        institution: row,
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
    this.selection.selected.forEach((item) => {
      item.status=false;
      this.institutionService.update(item).subscribe((data) => {
        if(item.id==alertCounter){
          this.refresh();
          this.sweetAlert.delete(data.toString());
        }
      });
      this.selection = new SelectionModel<Institution>(true, []);
    });
  }
  checkClaim(claim: string): boolean {
    return this.authService.claimGuard(claim);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
