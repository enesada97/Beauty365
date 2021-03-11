import { AddDialogComponent } from './dialog/add-dialog/add-dialog.component';
import { ProcessInstitue } from './../../../core/models/process-institue.model';
import { ProcessInstitueDto } from './../../../core/models/process-institue-dto.model';
import { ProcessInstitueService } from './../../../core/service/process-institue.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DeleteDialogComponent } from './dialog/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-institue-process-save',
  templateUrl: './institue-process-save.component.html',
  styleUrls: ['./institue-process-save.component.sass']
})
export class InstitueProcessSaveComponent implements OnInit {
  displayedColumns = ["select", "processGroupName","processName","institutionName","price","actions"];
  processInstitueDataBase: ProcessInstitueService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<ProcessInstitueDto>(true, []);
  index: number;
  id: number;
  processInstitueDto: ProcessInstitueDto | null;
  processInstitue: ProcessInstitue | null;
  veri: any;
  constructor(
    public httpClient: HttpClient,
    private _sweetAlert:SweetalertService,
    public dialog: MatDialog,
    public processInstitueService: ProcessInstitueService
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
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {
        processInstitue: this.processInstitue
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
    this.processInstitueService
      .getById(this.id)
      .subscribe((data) => (this.processInstitue = data));
      if(this.processInstitue){
        console.log(this.processInstitue);
        const dialogRef = this.dialog.open(AddDialogComponent, {
          data: {
            processInstitue: this.processInstitue,
            action:"edit"
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result === 1) {
            this.refreshTable();
          }
        });
      }
  }
  deleteItem(i: number, row) {
    this.index = i;
    this.id = row.id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
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
    this.processInstitueDataBase = new ProcessInstitueService(this.httpClient,this._sweetAlert);
    this.dataSource = new ExampleDataSource(
      this.processInstitueDataBase,
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

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.renderedData.forEach((row) =>
          this.selection.select(row)
        );
  }
  removeSelectedRows() {
    // const totalSelect = this.selection.selected.length;
    const totalSelect = this.selection.selected.length;
    console.log(this.selection.selected);
    this.selection.selected.forEach((item) => {
      const index: number = item.id;
      //this.patientDataBase.dataChange.value.splice(index, 1);
      this.processInstitueDataBase.delete(index).subscribe(
        (data) => {},
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );
      this.refreshTable();
      this.selection = new SelectionModel<ProcessInstitueDto>(true, []);
    });
  }
}
export class ExampleDataSource extends DataSource<ProcessInstitueDto> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: ProcessInstitueDto[] = [];
  renderedData: ProcessInstitueDto[] = [];
  constructor(
    public processInstitueDataBase: ProcessInstitueService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ProcessInstitueDto[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.processInstitueDataBase.dataDtoChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.processInstitueDataBase.forProcessInstitueDto().subscribe((data) => {
      this.processInstitueDataBase.isTblLoading = false;
      this.processInstitueDataBase.dataDtoChange.next(data);
      this.processInstitueDataBase._sweetAlert.getListSuccess('İşlemler');
    },
    (error: HttpErrorResponse) => {
      this.processInstitueDataBase.isTblLoading = false;
      console.log(error.name + " " + error.message);
    });
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.processInstitueDataBase.dataDto
          .slice()
          .filter((processInstitueDto: ProcessInstitueDto) => {
            const searchStr = (
              processInstitueDto.processName +
              processInstitueDto.processGroupName +
              processInstitueDto.price +
              processInstitueDto.institutionName 
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
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
  sortData(data: ProcessInstitueDto[]): ProcessInstitueDto[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string | Date | boolean = "";
      let propertyB: number | string | Date | boolean = "";
      switch (this._sort.active) {
        case "id":
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case "processName":
          [propertyA, propertyB] = [a.processName, b.processName];
          break;
        case "processGroupName":
          [propertyA, propertyB] = [a.processGroupName, b.processGroupName];
          break;
        case "institutionName":
          [propertyA, propertyB] = [a.institutionName, b.institutionName];
          break;
        case "price":
          [propertyA, propertyB] = [a.price, b.price];
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
