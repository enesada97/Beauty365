import { SelectionModel } from "@angular/cdk/collections";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Language } from "src/app/core/models/language";
import { ProtocolDto } from "src/app/core/models/protocoldto";
import { SweetalertService } from "src/app/core/service/sweetalert.service";
import { AuthService } from "src/app/core/service/system-service/auth.service";
import { LanguageService } from "src/app/core/service/system-service/language.service";
import { LanguageDeleteComponent } from "./language-dialog/language-delete/language-delete.component";
import { LanguageSaveComponent } from "./language-dialog/language-save/language-save.component";

@Component({
  selector: "app-language",
  templateUrl: "./language.component.html",
  styleUrls: ["./language.component.sass"],
})
export class LanguageComponent implements OnInit {
  displayedColumns: string[] = ["id", "name", "code", "actions"];
  selection = new SelectionModel<Language>(true, []);
  languageList: Language[];
  dataSource: MatTableDataSource<Language>;
  constructor(
    public languageService: LanguageService,
    private authService: AuthService,
    public dialog: MatDialog,
    private sweetAlert:SweetalertService
  ) {}
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;

  ngOnInit(): void {
    this.getLanguageList();
  }
  refresh() {
    this.getLanguageList();
  }
  getLanguageList() {
    this.languageService.getList().subscribe((data) => {
      setTimeout(() => (this.languageService.isTblLoading = false), 1000);
      this.languageList = data;
      this.dataSource = new MatTableDataSource<Language>(data);
      this.configDataTable();
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
    const dialogRef = this.dialog.open(LanguageSaveComponent, {
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
    const dialogRef = this.dialog.open(LanguageSaveComponent, {
      data: {
        language: row,
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
    const dialogRef = this.dialog.open(LanguageDeleteComponent, {
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
      const index: number = item.id;
      this.languageService.delete(index).subscribe((data) => {
        if(index==alertCounter){
          this.refresh();
          this.sweetAlert.delete(data.toString());
        }
      });
      this.selection = new SelectionModel<Language>(true, []);
    });
  }
}
