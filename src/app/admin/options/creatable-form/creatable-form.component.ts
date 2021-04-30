import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { FormTable } from "src/app/core/models/form-table.model";
import { FormTableService } from "src/app/core/service/form-table.service";
import { AuthService } from "src/app/core/service/system-service/auth.service";
import { DeleteComponent } from "./dialog/delete/delete.component";
import { PreviewComponent } from "./dialog/preview/preview.component";
import { SaveComponent } from "./dialog/save/save.component";

@Component({
  selector: "app-creatable-form",
  templateUrl: "./creatable-form.component.html",
  styleUrls: ["./creatable-form.component.sass"],
})
export class CreatableFormComponent implements OnInit {
  displayedColumns = ["id", "name", "isOpen", "addedBy", "actions"];
  formTables: FormTable[];
  formTable: FormTable | null;
  dataSource: MatTableDataSource<FormTable>;
  constructor(
    public httpClient: HttpClient,
    public router: Router,
    public dialog: MatDialog,
    public formTableService: FormTableService,
    private authService:AuthService
  ) {}
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  ngOnInit() {
    this.getFormOfTables();
  }
  checkClaim(claim: string): boolean {
    return this.authService.claimGuard(claim);
  }
  getFormOfTables() {
    this.formTableService.getList().subscribe(
      (table) => {
        setTimeout(() => (this.formTableService.isTblLoading = false), 1000);
        this.formTables = table;
        this.dataSource = new MatTableDataSource<FormTable>(this.formTables);
        setTimeout(() => (this.dataSource.sort = this.sort));
        setTimeout(() => (this.dataSource.paginator = this.paginator));
      }
    );
  }
  refresh() {
    this.getFormOfTables();
  }
  editCall(row) {
        const dialogRef = this.dialog.open(SaveComponent, {
          data: {
            formTable: row,
            action: "edit",
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result === 1) {
            this.refresh();
          }
        });
  }
  addNew() {
    const dialogRef = this.dialog.open(SaveComponent, {
      data: {
        action: "add"
      },
    });
    dialogRef.afterClosed().subscribe((result:FormTable) => {
      if(result){
          this.refresh();
          this.router.navigateByUrl("admin/options/detail-table/"+result.id);
        }
    });
  }
  previewItem(row){
    this.dialog.open(PreviewComponent, {width:'40%',minHeight:'60%',
      data: row
    });
  }
  deleteItem(row) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: row
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refresh();
      }
    });
  }
  applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
