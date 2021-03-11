import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Institution } from 'src/app/core/models/institution.model';
import { InstitutionService } from 'src/app/core/service/institution.service';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';
import { DeleteComponent } from './dialog/delete/delete.component';
import { FormDialogComponent } from './dialog/form-dialog/form-dialog.component';

@Component({
  selector: 'app-all-institutions',
  templateUrl: './all-institutions.component.html',
  styleUrls: ['./all-institutions.component.sass']
})
export class AllInstitutionsComponent implements OnInit {
  displayedColumns = ["select", "institutionName", "actions"];
  institutionDataBase: InstitutionService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<Institution>(true, []);
  index: number;
  id: number;
  institution: Institution | null;
  constructor(
    public httpClient: HttpClient,
    public sweetAlertService: SweetalertService,
    public dialog: MatDialog,
    public institutionService: InstitutionService,
    private snackBar: MatSnackBar
  ) {}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  ngOnInit() {
    this.loadData();
  }
  refresh() {
    this.loadData();
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
        this.refreshTable();
      }
    });
  }
  editCall(row) {
    this.id = row.id;
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        institution: row,
        action: "edit",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refreshTable();
      }
    });
  }
  deleteItem(i: number, row) {
    this.index = i;
    this.id = row.id;
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refreshTable();
      }
    });
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
    this.loadData();
  }
  public loadData() {
    this.institutionDataBase = new InstitutionService(
      this.httpClient,
      this.sweetAlertService
    );
    this.dataSource = new ExampleDataSource(
      this.institutionDataBase,
      this.paginator,
      this.sort
    );
    fromEvent(this.filter.nativeElement, "keyup").subscribe(() => {
      if (!this.dataSource) {
        return;
      }
      this.dataSource.filter = this.filter.nativeElement.value;
    });
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.renderedData.length;
    return numSelected === numRows;
  }
   masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.renderedData.forEach((row) =>
          this.selection.select(row)
        );
  }
  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    console.log(this.selection.selected);
    this.selection.selected.forEach((item) => {
      const index: number = item.id;
      this.institutionDataBase.delete(index);
      this.refreshTable();
      this.selection = new SelectionModel<Institution>(true, []);
    });
  }
}
export class ExampleDataSource extends DataSource<Institution> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Institution[] = [];
  renderedData: Institution[] = [];
  constructor(
    public institutionDataBase: InstitutionService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  connect(): Observable<Institution[]> {
    const displayDataChanges = [
      this.institutionDataBase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.institutionDataBase.getAll().subscribe((data) => {
      this.institutionDataBase.isTblLoading = false;
      this.institutionDataBase.dataChange.next(data);
      this.institutionDataBase._sweetAlert.getListSuccess('Kurumlar');
    },
    (error: HttpErrorResponse) => {
      this.institutionDataBase.isTblLoading = false;
      console.log(error.name + " " + error.message);
    });
    return merge(...displayDataChanges).pipe(
      map(() => {
        this.filteredData = this.institutionDataBase.data
          .slice()
          .filter((institution: Institution) => {
            const searchStr = institution.institutionName.toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        const sortedData = this.sortData(this.filteredData.slice());
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }
  disconnect() {}
  /** Returns a sorted copy of the database data. */
  sortData(data: Institution[]): Institution[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "id":
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case "name":
          [propertyA, propertyB] = [a.institutionName, b.institutionName];
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
      );
    });
  }
}
