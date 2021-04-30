import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { FormField } from "src/app/core/models/form-field.model";
import { FormTable } from "src/app/core/models/form-table.model";
import { FormFieldService } from "src/app/core/service/form-field.service";
import { FormTableService } from "src/app/core/service/form-table.service";
import { SaveFieldComponent } from "src/app/admin/options/creatable-form/detail-table/dialog/save-field/save-field.component";
import { DeleteFieldComponent } from "./dialog/delete-field/delete-field.component";
import { SaveFieldValueComponent } from "./dialog/save-field-value/save-field-value.component";
import { AuthService } from "src/app/core/service/system-service/auth.service";

@Component({
  selector: "app-detail-table",
  templateUrl: "./detail-table.component.html",
  styleUrls: ["./detail-table.component.sass"],
})
export class DetailTableComponent implements OnInit {
  formTable: FormTable;
  formFields: FormField[];
  displayedColumns = ["formTableId", "label", "isOpen", "type", "actions"];
  dataSource: MatTableDataSource<FormField>;
  constructor(
    private activatedRoute: ActivatedRoute,
    public formFieldService: FormFieldService,
    private formTableService: FormTableService,
    public dialog: MatDialog,
    private authService:AuthService
  ) {}
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  id: number;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params["id"];
      this.getListByFormTableId(this.id);
      this.getFormTableById(this.id);
    });
  }
  checkClaim(claim:string):boolean{
		return this.authService.claimGuard(claim)
	}
  getListByFormTableId(id: number) {
    this.formFieldService.getListByFormTableId(id).subscribe(
      (data) => {
        setTimeout(() => (this.formFieldService.isTblLoading = false), 1000);
        this.formFields = data;
        this.dataSource = new MatTableDataSource<FormField>(this.formFields);
        setTimeout(() => (this.dataSource.sort = this.sort));
        setTimeout(() => (this.dataSource.paginator = this.paginator));
      }
    );
  }
  getFormTableById(id: number) {
    this.formTableService.getById(id).subscribe((data) => {
      this.formTable = data;
    });
  }
  refresh() {
    this.getListByFormTableId(this.id);
  }
  addNew() {
    const dialogRef = this.dialog.open(SaveFieldComponent, {
      data: {
        action: "add",
        formTableId:this.id
      },
    });
    dialogRef.afterClosed().subscribe((result: FormField) => {
      if (result && result != undefined) {
        if (result.type != "input") {
          this.refresh();
        }
      }
    });
  }
  editCall(row) {
    const dialogRef = this.dialog.open(SaveFieldComponent, {
      data: {
        formField: row,
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
    this.id = row.id;
    const dialogRef = this.dialog.open(DeleteFieldComponent, {
      data: row,
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
  editFieldValueCall(row) {
    const dialogRef = this.dialog.open(SaveFieldValueComponent, {
      data: row
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refresh();
      }
    });
  }
}
