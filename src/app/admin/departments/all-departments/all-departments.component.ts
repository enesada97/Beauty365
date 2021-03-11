import { DataSource, SelectionModel } from "@angular/cdk/collections";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { BehaviorSubject, fromEvent, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Department } from "src/app/core/models/department.model";
import { DepartmentService } from "src/app/core/service/department.service";
import { SweetalertService } from "src/app/core/service/sweetalert.service";
import { DeleteComponent } from "./dialog/delete/delete.component";
import { FormDialogComponent } from "./dialog/form-dialog/form-dialog.component";

@Component({
  selector: "app-all-departments",
  templateUrl: "./all-departments.component.html",
  styleUrls: ["./all-departments.component.sass"],
})
export class AllDepartmentsComponent implements OnInit {
  displayedColumns = ["select", "departmentName", "actions"];
  departmentDataBase: DepartmentService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<Department>(true, []);
  index: number;
  id: number;
  department: Department | null;
  constructor(
    public httpClient: HttpClient,
    public sweetAlertService: SweetalertService,
    public dialog: MatDialog,
    public departmentService: DepartmentService,
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
        department: this.department,
        action: "add",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refreshTable();
        // this.showNotification(
        //   "snackbar-success",
        //   "Add Record Successfully...!!!",
        //   "bottom",
        //   "center"
        // );
      }
    });
  }
  editCall(row) {
    this.id = row.id;
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        department: row,
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
        // this.showNotification(
        //   "snackbar-danger",
        //   "Kayıt başarı ile silindi...!!!",
        //   "bottom",
        //   "center"
        // );
      }
    });
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
    this.loadData();
  }
  public loadData() {
    this.departmentDataBase = new DepartmentService(
      this.httpClient,
      this.sweetAlertService
    );
    this.dataSource = new ExampleDataSource(
      this.departmentDataBase,
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
  // showNotification(colorName, text, placementFrom, placementAlign) {
  //   this.snackBar.open(text, "", {
  //     duration: 2000,
  //     verticalPosition: placementFrom,
  //     horizontalPosition: placementAlign,
  //     panelClass: colorName,
  //   });
  // }
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
      this.departmentDataBase.delete(index);
      this.refreshTable();
      this.selection = new SelectionModel<Department>(true, []);
    });
    // this.showNotification(
    //   "snackbar-danger",
    //   totalSelect + " Record Delete Successfully...!!!",
    //   "bottom",
    //   "center"
    // );
  }
}
export class ExampleDataSource extends DataSource<Department> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Department[] = [];
  renderedData: Department[] = [];
  constructor(
    public departmentDataBase: DepartmentService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Department[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.departmentDataBase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.departmentDataBase.getAll().subscribe((data) => {
      this.departmentDataBase.isTblLoading = false;
      this.departmentDataBase.dataChange.next(data);
      this.departmentDataBase._sweetAlert.getListSuccess('Departmanlar');
    },
    (error: HttpErrorResponse) => {
      this.departmentDataBase.isTblLoading = false;
      console.log(error.name + " " + error.message);
    });
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.departmentDataBase.data
          .slice()
          .filter((department: Department) => {
            const searchStr = department.departmentName.toLowerCase();
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
  sortData(data: Department[]): Department[] {
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
          [propertyA, propertyB] = [a.departmentName, b.departmentName];
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
