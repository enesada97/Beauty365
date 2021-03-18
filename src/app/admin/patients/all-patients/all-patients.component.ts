import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Patient } from 'src/app/core/models/patient.model';
import { PatientService } from 'src/app/core/service/patient.service';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';
import { DeleteComponent } from './dialog/delete/delete.component';
import { FormDialogComponent } from './dialog/form-dialog/form-dialog.component';
import Swal from "sweetalert2";




@Component({
  selector: 'app-all-patients',
  templateUrl: './all-patients.component.html',
  styleUrls: ['./all-patients.component.sass']
})
export class AllPatientsComponent implements OnInit {
  displayedColumns = [
    "select",
    "name",
    "surName",
    "identityNumber",
    "gender",
    "phoneNumber",
    "birthDate",
    "bloodGroup",
    "actions",
  ];
  patientDataBase: PatientService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<Patient>(true, []);
  index: number;
  id: number;
  patient: Patient | null;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public patientService: PatientService,
    private _sweetAlert: SweetalertService,
    private protocolService:ProtocolService,
    private router:Router
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
        patient: this.patient,
        action: "add",
      },
    });
    dialogRef.afterClosed().subscribe((result:Patient) => {
      console.log("result:" +result);
      if(result){
          this.addProtocolForPatient(result);
          this.refreshTable();
        }
        this.refreshTable();
    });
  }
  addProtocolForPatient(row:Patient) {
    this.id = row.id;
    const dialogRef = this.dialog.open(AddProtocolDialogComponent, {
      data: {
        patient: row,
        action: "add",
      },
    });
    dialogRef.afterClosed().subscribe((result:number) => {
      console.log("result:" +result);
      if(result){
        this.router.navigateByUrl("admin/working/working-processes/"+result);
        }
        this.refreshTable();
    });
  }
  protocolControl(row:Patient) {
    this.protocolService.getListByPatientId(row.id).subscribe(data=>{
      console.log("veri ="+data);
      console.log(JSON.stringify(data));
      if(data.length){
        // let isOpenControl=data.find(m=>m.isOpen==true);
        // isOpenControl==undefined?this.passParameter(row):null;
        this.passParameter(row);
      }else{
        this.addProtocolForPatient(row);
      }
    },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
          this.addProtocolForPatient(row);
        })
  }
  passParameter(row:Patient) {
    Swal.fire({
      title: 'Açık Protokol Bulundu! Hasta Detayına Gitmek İster misiniz?',
      text: row.name+" "+row.surName+" hastasına ait aktif hasta protokolü bulundu",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Hayır',
      confirmButtonText: 'Evet',
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('/admin/patients/all-patients/patient-detail/'+row.id);
      }else{
        this.addProtocolForPatient(row);
      }
    })
  }
  editCall(row) {
    this.id = row.id;
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        patient: row,
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
    this.patientDataBase = new PatientService(this.httpClient,this._sweetAlert);
    this.dataSource = new ExampleDataSource(
      this.patientDataBase,
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
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      const index: number = item.id;
      //this.patientDataBase.deletePatient(index);
      this.patientDataBase.delete(index).subscribe(
        (data) => {},
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );
      this.refreshTable();
      this.selection = new SelectionModel<Patient>(true, []);
    });
  }

}
import { Pipe, PipeTransform } from '@angular/core';
import { AddProtocolDialogComponent } from '../search-patient/add-protocol-dialog/add-protocol-dialog.component';
import { ProtocolService } from 'src/app/core/service/protocol.service';
import { Router } from '@angular/router';

@Pipe({name: 'phone'})
export class PhonePipe implements PipeTransform {
  transform(rawNum:string) {
    rawNum = "0"+ rawNum;

    const countryCodeStr = rawNum.slice(0,1);
    const areaCodeStr = rawNum.slice(1,4);
    const midSectionStr = rawNum.slice(4,7);
    const lastSectionStr = rawNum.slice(7);

    return `${countryCodeStr} (${areaCodeStr})${midSectionStr}-${lastSectionStr}`;
  }
}
export class ExampleDataSource extends DataSource<Patient> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Patient[] = [];
  renderedData: Patient[] = [];
  constructor(
    public patientDataBase: PatientService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Patient[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.patientDataBase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    //this.patientDataBase.getAllPatients();
    this.patientDataBase.getAll().subscribe((data) => {
                  this.patientDataBase.isTblLoading = false;
                  this.patientDataBase.dataChange.next(data);
                },
                (error: HttpErrorResponse) => {
                  this.patientDataBase.isTblLoading = false;
                  console.log(error.name + " " + error.message);
                  console.log(error.name + " " + error.message);
                });
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.patientDataBase.data
          .slice()
          .filter((patient: Patient) => {
            const searchStr = (
              patient.name +
              patient.surName +
              patient.gender +
              patient.city +
              patient.birthDate +
              patient.bloodGroup +
              patient.identityNumber +
              patient.phoneNumber
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
  sortData(data: Patient[]): Patient[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string | boolean | Date = "";
      let propertyB: number | string | boolean | Date = "";
      switch (this._sort.active) {
        case "id":
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case "name":
          [propertyA, propertyB] = [a.name, b.name];
          break;
        case "surName":
          [propertyA, propertyB] = [a.surName, b.surName];
          break;
        case "gender":
          [propertyA, propertyB] = [a.gender, b.gender];
          break;
        case "birthDate":
          [propertyA, propertyB] = [a.birthDate, b.birthDate];
          break;
        case "city":
          [propertyA, propertyB] = [a.city, b.city];
          break;
        case "mobile":
          [propertyA, propertyB] = [a.phoneNumber, b.phoneNumber];
          break;
        case "identityNumber":
          [propertyA, propertyB] = [a.identityNumber, b.identityNumber];
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
