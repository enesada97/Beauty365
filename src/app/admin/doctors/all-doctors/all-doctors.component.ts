import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DepForDocDto } from 'src/app/core/models/depfordoctors.model';
import { DepForDoctorsService } from 'src/app/core/service/depfordoctors.service';
import { DeleteComponent } from './dialog/delete/delete.component';
import { FormDialogComponent } from './dialog/form-dialog/form-dialog.component';

@Component({
  selector: 'app-all-doctors',
  templateUrl: './all-doctors.component.html',
  styleUrls: ['./all-doctors.component.sass']
})
export class AllDoctorsComponent implements OnInit {
  displayedColumns = [
    "select",
    "doctor.identityNumber",
    "doctor.speciality",
    "doctor.name",
    "doctor.surName",
    "department.departmentName",
    "doctor.phone",
    "actions",
  ];
  depForDoctorsDataBase: DepForDoctorsService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<DepForDocDto>(true, []);
  index: number;
  id: number;
  depForDocDto: DepForDocDto | null;
  veri: any;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public depForDoctorsService: DepForDoctorsService,
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
        depForDocDto: this.depForDocDto,
        action: "add",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refreshTable();
        this.showNotification(
          "snackbar-success",
          "Add Record Successfully...!!!",
          "bottom",
          "center"
        );
      }
    });
  }
  editCall(row) {
    this.id = row.id;
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        depForDocDto: row,
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
    this.id = row.doctor.id;
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refreshTable();
        this.showNotification(
          "snackbar-danger",
          "Kayıt başarı ile silindi...!!!",
          "bottom",
          "center"
        );
      }
    });
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
    this.loadData();
  }
  public loadData() {
    this.depForDoctorsDataBase = new DepForDoctorsService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.depForDoctorsDataBase,
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
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
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
    console.log(this.selection.selected)
    this.selection.selected.forEach((item) => {
      const index: number = item.doctor.id;
      //this.patientDataBase.dataChange.value.splice(index, 1);
      this.depForDoctorsDataBase.deleteDoctor(index);
      this.refreshTable();
      this.selection = new SelectionModel<DepForDocDto>(true, []);
    });
    this.showNotification(
      "snackbar-danger",
      totalSelect + " Record Delete Successfully...!!!",
      "bottom",
      "center"
    );
  }
  
}
export class ExampleDataSource extends DataSource<DepForDocDto> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: DepForDocDto[] = [];
  renderedData: DepForDocDto[] = [];
  constructor(
    public depForDoctorsDataBase: DepForDoctorsService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<DepForDocDto[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.depForDoctorsDataBase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.depForDoctorsDataBase.getAllDoctors();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.depForDoctorsDataBase.data
          .slice()
          .filter((depForDocDto: DepForDocDto) => {
            const searchStr = (
              depForDocDto.doctor.name +
              depForDocDto.doctor.surName +
              depForDocDto.doctor.speciality +
              depForDocDto.department.departmentName +
              depForDocDto.doctor.phone +
              depForDocDto.doctor.identityNumber 
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
  sortData(data: DepForDocDto[]): DepForDocDto[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string | boolean | Date = "";
      let propertyB: number | string | boolean | Date = "";
      switch (this._sort.active) {
        case "id":
          [propertyA, propertyB] = [a.doctor.id, b.doctor.id];
          break;
        case "name":
          [propertyA, propertyB] = [a.doctor.name, b.doctor.name];
          break;
        case "surName":
          [propertyA, propertyB] = [a.doctor.surName, b.doctor.surName];
          break;
        case "gender":
          [propertyA, propertyB] = [a.doctor.speciality, b.doctor.speciality];
          break;
        case "birthDate":
          [propertyA, propertyB] = [a.department.departmentName, b.department.departmentName];
          break;
        case "city":
          [propertyA, propertyB] = [a.doctor.phone, b.doctor.phone];
          break;
        case "mobile":
          [propertyA, propertyB] = [a.doctor.identityNumber, b.doctor.identityNumber];
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
