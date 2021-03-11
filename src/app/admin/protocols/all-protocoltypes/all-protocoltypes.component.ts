import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProtocolType } from 'src/app/core/models/protocoltype.model';
import { ProtocoltypeService } from 'src/app/core/service/protocoltype.service';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';
import { DeleteComponent } from './dialog/delete/delete.component';
import { FormDialogComponent } from './dialog/form-dialog/form-dialog.component';

@Component({
  selector: 'app-all-protocoltypes',
  templateUrl: './all-protocoltypes.component.html',
  styleUrls: ['./all-protocoltypes.component.sass']
})
export class AllProtocoltypesComponent implements OnInit {
  displayedColumns = ["select", "typeName", "actions"];
  protocolTypeDataBase: ProtocoltypeService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<ProtocolType>(true, []);
  index: number;
  id: number;
  protocolType: ProtocolType | null;
  constructor(
    public httpClient: HttpClient,
    public sweetAlertService: SweetalertService,
    public dialog: MatDialog,
    public protocoltypeService: ProtocoltypeService
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
        protocolType: this.protocolType,
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
        protocolType: row,
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
    this.protocolTypeDataBase = new ProtocoltypeService(
      this.httpClient,
      this.sweetAlertService
    );
    this.dataSource = new ExampleDataSource(
      this.protocolTypeDataBase,
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
      this.protocolTypeDataBase.deleteProtocolType(index);
      this.refreshTable();
      this.selection = new SelectionModel<ProtocolType>(true, []);
    });
  }
}
export class ExampleDataSource extends DataSource<ProtocolType> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: ProtocolType[] = [];
  renderedData: ProtocolType[] = [];
  constructor(
    public protocolTypeDataBase: ProtocoltypeService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  connect(): Observable<ProtocolType[]> {
    const displayDataChanges = [
      this.protocolTypeDataBase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.protocolTypeDataBase.getAllProtocolTypes();
    return merge(...displayDataChanges).pipe(
      map(() => {
        this.filteredData = this.protocolTypeDataBase.data
          .slice()
          .filter((protocolType: ProtocolType) => {
            const searchStr = protocolType.typeName.toLowerCase();
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
  sortData(data: ProtocolType[]): ProtocolType[] {
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
        case "protocolTypeName":
          [propertyA, propertyB] = [a.typeName, b.typeName];
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