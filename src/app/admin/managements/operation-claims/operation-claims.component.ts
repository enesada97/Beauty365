import { Component,ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { OperationClaim } from "src/app/core/models/operationclaim";
import { AuthService } from "src/app/core/service/system-service/auth.service";
import { OperationClaimService } from "src/app/core/service/system-service/operationclaim.service";
import { OperationClaimSaveComponent } from "./operation-claims-dialog/operation-claim-save/operation-claim-save.component";

@Component({
  selector: "app-operation-claims",
  templateUrl: "./operation-claims.component.html",
  styleUrls: ["./operation-claims.component.sass"],
})
export class OperationClaimsComponent {
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    "id",
    "name",
    "alias",
    "description",
    "actions",
  ];
  operationClaimList: OperationClaim[];
  constructor(
    public dialog: MatDialog,
    public operationClaimService: OperationClaimService,
    private authService: AuthService
  ) {}

  ngAfterViewInit(): void {
    this.getOperationClaimList();
  }
  refresh() {
    this.getOperationClaimList();
  }

  getOperationClaimList() {
    this.operationClaimService.getList().subscribe((data) => {
      setTimeout(() => (this.operationClaimService.isTblLoading = false), 1000);
      this.operationClaimList = data;
      this.dataSource = new MatTableDataSource<OperationClaim>(
        this.operationClaimList
      );
      setTimeout(() => (this.dataSource.sort = this.sort));
      setTimeout(() => (this.dataSource.paginator = this.paginator));
    });
  }

  checkClaim(claim: string): boolean {
    return this.authService.claimGuard(claim);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  editCall(row) {
    const dialogRef = this.dialog.open(OperationClaimSaveComponent, {
      data: {
        operationClaim: row
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refresh();
      }
    });
  }
}
