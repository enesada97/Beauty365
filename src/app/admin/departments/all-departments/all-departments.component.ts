import { SelectionModel } from "@angular/cdk/collections";
import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Department } from "src/app/core/models/department.model";
import { DepartmentService } from "src/app/core/service/department.service";
import { SweetalertService } from "src/app/core/service/sweetalert.service";
import { AuthService } from "src/app/core/service/system-service/auth.service";
import { DeleteComponent } from "./dialog/delete/delete.component";
import { FormDialogComponent } from "./dialog/form-dialog/form-dialog.component";

@Component({
  selector: "app-all-departments",
  templateUrl: "./all-departments.component.html",
  styleUrls: ["./all-departments.component.sass"],
})
export class AllDepartmentsComponent implements OnInit {
  displayedColumns = ["select", "departmentName", "actions"];
  selection = new SelectionModel<Department>(true, []);
  departmentList: Department[];
  dataSource: MatTableDataSource<Department>;
  department: Department | null;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public departmentService: DepartmentService,
    private authService:AuthService,
    private sweetAlert:SweetalertService
  ) {}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  ngOnInit(): void {
    this.getDepartmentList();
  }
  refresh() {
    this.getDepartmentList();
  }
  getDepartmentList() {
    this.departmentService.getList().subscribe((data) => {
      setTimeout(() => (this.departmentService.isTblLoading = false), 1000);
      this.departmentList = data;
      this.dataSource = new MatTableDataSource<Department>(this.departmentList);
           setTimeout(() => this.dataSource.sort = this.sort);
           setTimeout(() => this.dataSource.paginator = this.paginator);
           });
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
        this.refresh();
      }
    });
  }
  editCall(row) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        department: row,
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
    const alertCounter = this.selection.selected[this.selection.selected.length-1].id;
    this.selection.selected.forEach((item) => {
      item.status=false;
      this.departmentService.update(item).subscribe((data) => {
        if(item.id==alertCounter){
          this.refresh();
          this.sweetAlert.delete(data.toString());
        }
      });
      this.selection = new SelectionModel<Department>(true, []);
    });
  }
  checkClaim(claim: string): boolean {
    return this.authService.claimGuard(claim);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
