import { SweetalertService } from './../../../core/service/sweetalert.service';
import { Router } from '@angular/router';
import { DataSource, SelectionModel } from "@angular/cdk/collections";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Route } from '@angular/compiler/src/core';
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { BehaviorSubject, fromEvent, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Protocol } from "src/app/core/models/protocol.model";
import { ProtocolDto } from "src/app/core/models/protocoldto";
import { ProtocolService } from "src/app/core/service/protocol.service";
import { AddProtocolDialogComponent } from "../../patients/search-patient/add-protocol-dialog/add-protocol-dialog.component";
import { Delete2Component } from './dialog/delete2/delete2.component';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: "app-all-protocols",
  templateUrl: "./all-protocols.component.html",
  styleUrls: ["./all-protocols.component.sass"],
})
export class AllProtocolsComponent implements OnInit {
  displayedColumns = [
    "select",
    "patientName",
    "patientSurname",
    "departmentName",
    "doctorName",
    "doctorSurname",
    "institutionName",
    "typeName",
    "dateOfCome",
    "isOpen",
    "dateOfLeave",
    "actions",
  ];
  selection = new SelectionModel<ProtocolDto>(true, []);
  index: number;
  id: number;
  protocolDtos: ProtocolDto[];
  protocolDto: ProtocolDto | null;
  protocol: Protocol | null;
  veri: any;
  dataSource: MatTableDataSource<ProtocolDto>;
  constructor(
    public httpClient: HttpClient,
    public router:Router,
    public dialog: MatDialog,
    public protocolService: ProtocolService,
    private _sweetAlert: SweetalertService
  ) {}
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  ngOnInit() {
    this.getProtocols();
  }
  getProtocols(){
    this.protocolService.getDtoAll().subscribe((data) => {
      this.protocolDtos=data;
      setTimeout(() =>this.protocolService.isTblLoading = false,1000);
      this.dataSource = new MatTableDataSource<ProtocolDto>(this.protocolDtos);
           setTimeout(() => this.dataSource.sort = this.sort);
           setTimeout(() => this.dataSource.paginator = this.paginator);
             this.protocolService._sweetAlert.getListSuccess('Protokoller');
           },
           (error: HttpErrorResponse) => {
             this.protocolService.isTblLoading = false;
             console.log(error.name + " " + error.message);
           });
  }
  refresh() {
    this.getProtocols();
  }
  editCall(row) {
    this.id = row.protocolNo;
    this.protocolService
      .getById(this.id)
      .subscribe((data) => {this.protocol = data
      if(this.protocol){
        console.log(this.protocol);
        const dialogRef = this.dialog.open(AddProtocolDialogComponent, {
          data: {
            protocol: this.protocol,
            action:"edit"
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result === 1) {
            this.refresh();
          }
        });
      }
     });
  }
  deleteItem(i: number, row) {
    this.index = i;
    this.id = row.protocolNo;
    const dialogRef = this.dialog.open(Delete2Component, {
      data: {
        row,
        action:"delete"
      }
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

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }
  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      const index: number = item.protocolNo;
      //this.patientDataBase.deletePatient(index);
      this.protocolService.delete(index).subscribe(
        (data) => {},
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );
      this.protocolService._sweetAlert.delete("Randevular");
      this.selection = new SelectionModel<ProtocolDto>(true, []);
    });
    this.refresh();
  }
  applyFilter(filterValue: string) {
    if(filterValue==("aç"||"açı"||"açık"||"Aç"||"Açı"||"Açık")){
      filterValue="true";
    }
    else if(filterValue==("kapa"||"Kapa")){
      filterValue="false";
    }else
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
