import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DepForDocDto } from 'src/app/core/models/depfordoctors.model';
import { DepForDoctorsService } from 'src/app/core/service/depfordoctors.service';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';
import { AuthService } from 'src/app/core/service/system-service/auth.service';
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
  selection = new SelectionModel<DepForDocDto>(true, []);
  doctorList: DepForDocDto[];
  dataSource: MatTableDataSource<DepForDocDto>;
  doctor: DepForDocDto | null;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public depForDoctorsService: DepForDoctorsService,
    private authService:AuthService,
    private sweetAlert:SweetalertService
  ) {}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  ngOnInit(): void {
    this.getDepForDocDtoList();
  }
  refresh() {
    this.getDepForDocDtoList();
  }
  getDepForDocDtoList() {
    this.depForDoctorsService.getAllDoctorsSub().subscribe((data) => {
      setTimeout(() => (this.depForDoctorsService.isTblLoading = false), 1000);
      this.doctorList = data;
      this.dataSource = new MatTableDataSource<DepForDocDto>(this.doctorList);
           setTimeout(() => this.dataSource.sort = this.sort);
           setTimeout(() => this.dataSource.paginator = this.paginator);
           });
  }
  addNew() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        doctor: this.doctor,
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
        depForDocDto: row,
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
    const alertCounter = this.selection.selected[this.selection.selected.length-1].doctor.id;
    this.selection.selected.forEach((item) => {
      item.doctor.status=false;
      this.depForDoctorsService.update(item.doctor).subscribe((data) => {
        if(item.doctor.id==alertCounter){
          this.refresh();
          this.sweetAlert.delete(data.toString());
        }
      });
      this.selection = new SelectionModel<DepForDocDto>(true, []);
    });
  }
  checkClaim(claim: string): boolean {
    return this.authService.claimGuard(claim);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
