import { DeleteProtocolTypeProcessComponent } from './dialog/delete-protocol-type-process/delete-protocol-type-process.component';
import { SaveProtocolTypeProcessComponent } from './dialog/save-protocol-type-process/save-protocol-type-process.component';
import { ProtocolTypeProcessService } from './../../../core/service/protocol-type-process.service';
import { ProtocolTypeProcessDto } from './../../../core/models/protocolTypeProcessDto.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-protocol-type-processes',
  templateUrl: './protocol-type-processes.component.html',
  styleUrls: ['./protocol-type-processes.component.sass']
})
export class ProtocolTypeProcessesComponent implements OnInit {
  protocolTypeProcessDtos:ProtocolTypeProcessDto[]|null;
  protocolTypeProcessDto:ProtocolTypeProcessDto |null;
  filterText:string = '';
  displayedColumns = [
    "select",
    "typeName",
    "institueName",
    "doctorName",
    "doctorSurName",
    "processName",
    "actions",
  ];
  selection = new SelectionModel<ProtocolTypeProcessDto>(true, []);
  dataSource: MatTableDataSource<ProtocolTypeProcessDto>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  constructor(private protocolTypeProcessService: ProtocolTypeProcessService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProtocolTypeProcessDto();
  }
  getProtocolTypeProcessDto(){
    this.protocolTypeProcessService.getDtoAll().subscribe(data=>{
      this.protocolTypeProcessDtos=data;
      this.dataSource = new MatTableDataSource<ProtocolTypeProcessDto>(
        this.protocolTypeProcessDtos
      );
      setTimeout(() => (this.dataSource.sort = this.sort));
      setTimeout(() => (this.dataSource.paginator = this.paginator));

    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
  refresh() {
    this.getProtocolTypeProcessDto();
  }
  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      const index: number = item.protocolTypeProcessId;
      this.protocolTypeProcessService.delete(index).subscribe(
        (data) => {},
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );
      setTimeout(() => (this.protocolTypeProcessService._sweetAlert.delete("İşlem Ayarları")),2000);
      this.selection = new SelectionModel<ProtocolTypeProcessDto>(true, []);
    });
    this.refresh();
  }
  addNew() {
    const dialogRef = this.dialog.open(SaveProtocolTypeProcessComponent,{height:'90%',width:'90%',minHeight:'60%',minWidth:'60%',
      data: {
        action: "add"
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refresh();
      }
    });
  }
  editCall(row) {
    const dialogRef = this.dialog.open(SaveProtocolTypeProcessComponent, {
      data: {
        protocolTypeProcessDto:this.protocolTypeProcessDto,
        action: "edit"
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refresh();
      }
    });
  }
  deleteItem(i: number, row) {
    const dialogRef = this.dialog.open(DeleteProtocolTypeProcessComponent, {
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

}
