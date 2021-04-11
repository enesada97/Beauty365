import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/models/user';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';
import { AuthService } from 'src/app/core/service/system-service/auth.service';
import { UserService } from 'src/app/core/service/system-service/user.service';
import { UserClaimComponent } from './user-dialog/user-claim/user-claim.component';
import { UserDeleteComponent } from './user-dialog/user-delete/user-delete.component';
import { UserGroupsComponent } from './user-dialog/user-groups/user-groups.component';
import { UserPasswordComponent } from './user-dialog/user-password/user-password.component';
import { UserSaveComponent } from './user-dialog/user-save/user-save.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {
	displayedColumns: string[] = ["select","userId","email","fullName","status","mobilePhones","address","notes","actions"];
  selection = new SelectionModel<User>(true, []);
  userList: User[];
  dataSource: MatTableDataSource<User>;
  constructor(
    public userService: UserService,
    private authService: AuthService,
    public dialog: MatDialog,
    private sweetAlert:SweetalertService
  ) {}
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;

  ngOnInit(): void {
    this.getUserList();
  }
  refresh() {
    this.getUserList();
  }
  getUserList() {
    this.userService.getList().subscribe((data) => {
      setTimeout(() => (this.userService.isTblLoading = false), 1000);
      this.userList = data;
      this.dataSource = new MatTableDataSource<User>(this.userList);
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
    const dialogRef = this.dialog.open(UserSaveComponent, {
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
    const dialogRef = this.dialog.open(UserSaveComponent, {
      data: {
        user: row,
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
    const dialogRef = this.dialog.open(UserDeleteComponent, {
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
    const alertCounter = this.selection.selected[this.selection.selected.length-1].userId;
    let latestId = this.selection.selected[this.selection.selected.length - 1]
      .userId;
    this.selection.selected.forEach((item) => {
      const index: number = item.userId;
      this.userService.delete(index).subscribe((data) => {
        index==alertCounter?this.sweetAlert.delete(data.toString()):null;
        this.refresh();
      });
      this.selection = new SelectionModel<User>(true, []);
    });
  }
  passwordChange(userId:number){
    const dialogRef = this.dialog.open(UserPasswordComponent, {
      data: {
        userId: userId
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refresh();
      }
    });
  }
  editUserClaims(userId:number){
    const dialogRef = this.dialog.open(UserClaimComponent, {
      data: {
        userId: userId
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refresh();
      }
    });
  }
  editUserGroup(userId:number){
    const dialogRef = this.dialog.open(UserGroupsComponent, {
      data: {
        userId: userId
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refresh();
      }
    });
  }
}
