import { SelectionModel } from "@angular/cdk/collections";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { FormTable } from "src/app/core/models/form-table.model";
import { FormFieldSelectionValueService } from "src/app/core/service/form-field-selection-value.service";
import { FormFieldService } from "src/app/core/service/form-field.service";
import { FormTableService } from "src/app/core/service/form-table.service";
import { SweetalertService } from "src/app/core/service/sweetalert.service";
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
  index: number;
  id: number;
  formTables: FormTable[];
  formTable: FormTable | null;
  veri: any;
  dataSource: MatTableDataSource<FormTable>;
  constructor(
    public httpClient: HttpClient,
    public router: Router,
    public dialog: MatDialog,
    public formTableService: FormTableService,
    private formFieldService: FormFieldService,
    private formFieldSelectionValueService: FormFieldSelectionValueService,
    private fb: FormBuilder,
    private _sweetAlert: SweetalertService
  ) {}
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  ngOnInit() {
    this.getFormOfTables();
  }
  getFormOfTables() {
    this.formTableService.getAll().subscribe(
      (table) => {
        this.formTables = table;
        setTimeout(() => (this.formTableService.isTblLoading = false), 1000);
        this.dataSource = new MatTableDataSource<FormTable>(this.formTables);
        setTimeout(() => (this.dataSource.sort = this.sort));
        setTimeout(() => (this.dataSource.paginator = this.paginator));
      },
      (error: HttpErrorResponse) => {
        this.formTableService.isTblLoading = false;
        console.log(error.name + " " + error.message);
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
      console.log("result:" +result);
      if(result){
          this.refresh();
          this.router.navigateByUrl("admin/options/detail-table/"+result.id);
        }
        this.refresh();
    });
  }
  previewItem(row){
    this.id = row.id;
    const dialogRef = this.dialog.open(PreviewComponent, {width:'40%',minHeight:'60%',
      data: row
    });
  }
  deleteItem(i: number, row) {
    this.index = i;
    this.id = row.id;
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
