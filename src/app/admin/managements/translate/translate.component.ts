import { SelectionModel } from "@angular/cdk/collections";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Translate } from "src/app/core/models/translate";
import { SweetalertService } from "src/app/core/service/sweetalert.service";
import { AuthService } from "src/app/core/service/system-service/auth.service";
import { TranslateService } from "src/app/core/service/system-service/translate.service";
import { TranslateDeleteComponent } from "./translate-dialog/translate-delete/translate-delete.component";
import { TranslateSaveComponent } from "./translate-dialog/translate-save/translate-save.component";

@Component({
  selector: "app-translate",
  templateUrl: "./translate.component.html",
  styleUrls: ["./translate.component.sass"],
})
export class TranslateComponent implements OnInit {
  displayedColumns: string[] = ['id', 'language', 'code', 'value','actions'];
  selection = new SelectionModel<Translate>(true, []);
  translateList: Translate[];
  dataSource: MatTableDataSource<Translate>;
  constructor(
    public translateService: TranslateService,
    private authService: AuthService,
    public dialog: MatDialog,
    private sweetAlert:SweetalertService
  ) {}
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;

  ngOnInit(): void {
    this.getTranslateList();
  }
  refresh() {
    this.getTranslateList();
  }
  getTranslateList() {
    this.translateService.getList().subscribe((data) => {
      setTimeout(() => (this.translateService.isTblLoading = false), 1000);
      this.translateList = data;
      this.dataSource = new MatTableDataSource<Translate>(this.translateList);
           setTimeout(() => this.dataSource.sort = this.sort);
           setTimeout(() => this.dataSource.paginator = this.paginator);
           });
  }
  checkClaim(claim: string): boolean {
    return this.authService.claimGuard(claim);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  configDataTable(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  addNew() {
    const dialogRef = this.dialog.open(TranslateSaveComponent, {
      data: {
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
    const dialogRef = this.dialog.open(TranslateSaveComponent, {
      data: {
        translate: row,
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
    const dialogRef = this.dialog.open(TranslateDeleteComponent, {
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

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }
  removeSelectedRows() {
    const alertCounter = this.selection.selected[this.selection.selected.length-1].id;
    this.selection.selected.forEach((item) => {
      const index: number = item.id;
      this.translateService.delete(index).subscribe((data) => {
        if (index==alertCounter) {
          this.refresh();
          this.sweetAlert.delete(data.toString());
        }
      });
      this.selection = new SelectionModel<Translate>(true, []);
    });
  }
}
