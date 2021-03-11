import { ProcessgroupService } from './../../../core/service/processgroup.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { ProcessGroup } from 'src/app/core/models/processgroup.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormDialogComponent } from './dialog/form-dialog/form-dialog.component';
import { DeleteComponent } from './dialog/delete/delete.component';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-all-process-group',
  templateUrl: './all-process-group.component.html',
  styleUrls: ['./all-process-group.component.sass']
})
export class AllProcessGroupComponent implements OnInit {
  displayedColumns = ["select", "name", "actions"];
  processGroupDataBase: ProcessgroupService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<ProcessGroup>(true, []);
  index: number;
  id: number;
  processGroup: ProcessGroup | null;
  constructor(
    public httpClient: HttpClient,
    public sweetAlertService: SweetalertService,
    public dialog: MatDialog,
    public processGroupService: ProcessgroupService
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
        processGroup: this.processGroup,
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
        processGroup: row,
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
    this.processGroupDataBase = new ProcessgroupService(
      this.httpClient,
      this.sweetAlertService
    );
    this.dataSource = new ExampleDataSource(
      this.processGroupDataBase,
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
      this.processGroupDataBase.delete(index);
      this.refreshTable();
      this.selection = new SelectionModel<ProcessGroup>(true, []);
    });
  }
}
export class ExampleDataSource extends DataSource<ProcessGroup> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: ProcessGroup[] = [];
  renderedData: ProcessGroup[] = [];
  constructor(
    public processGroupDataBase: ProcessgroupService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  connect(): Observable<ProcessGroup[]> {
    const displayDataChanges = [
      this.processGroupDataBase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.processGroupDataBase.getAll().subscribe((data) => {
      this.processGroupDataBase.isTblLoading = false;
      this.processGroupDataBase.dataChange.next(data);
      this.processGroupDataBase._sweetAlert.getListSuccess('İşlem Grupları');
    },
    (error: HttpErrorResponse) => {
      this.processGroupDataBase.isTblLoading = false;
      console.log(error.name + " " + error.message);
    });
    return merge(...displayDataChanges).pipe(
      map(() => {
        this.filteredData = this.processGroupDataBase.data
          .slice()
          .filter((processGroup: ProcessGroup) => {
            const searchStr = processGroup.name.toLowerCase();
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
  sortData(data: ProcessGroup[]): ProcessGroup[] {
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
          [propertyA, propertyB] = [a.name, b.name];
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