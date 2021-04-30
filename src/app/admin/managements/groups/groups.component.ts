import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Group } from 'src/app/core/models/Group';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';
import { AuthService } from 'src/app/core/service/system-service/auth.service';
import { GroupService } from 'src/app/core/service/system-service/group.service';
import { GroupClaimComponent } from './group-dialog/group-claim/group-claim.component';
import { GroupDeleteComponent } from './group-dialog/group-delete/group-delete.component';
import { GroupSaveComponent } from './group-dialog/group-save/group-save.component';
import { GroupUsersComponent } from './group-dialog/group-users/group-users.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.sass']
})
export class GroupsComponent implements OnInit {
  displayedColumns: string[] = ["id","groupName","actions"];
  selection = new SelectionModel<Group>(true, []);
  groupList: Group[];
  dataSource: MatTableDataSource<Group>;
  constructor(
    public groupService: GroupService,
    private authService: AuthService,
    public dialog: MatDialog,
    private sweetAlert:SweetalertService
  ) {}
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;

  ngOnInit(): void {
    this.getGroupList();
  }
  editGroupClaim(groupId:number){
    const dialogRef = this.dialog.open(GroupClaimComponent, {
      data: {
        groupId: groupId
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refresh();
      }
    });
  }

  editGroupUsers(groupId:number){
    const dialogRef = this.dialog.open(GroupUsersComponent, {
      data: {
        groupId: groupId
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refresh();
      }
    });
  }
  refresh() {
    this.getGroupList();
  }
  getGroupList() {
    this.groupService.getList().subscribe((data) => {
      setTimeout(() => (this.groupService.isTblLoading = false), 1000);
      this.groupList = data;
      this.dataSource = new MatTableDataSource<Group>(this.groupList);
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
  addNew() {
    const dialogRef = this.dialog.open(GroupSaveComponent, {
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
    const dialogRef = this.dialog.open(GroupSaveComponent, {
      data: {
        group: row,
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
    const dialogRef = this.dialog.open(GroupDeleteComponent, {
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
      this.groupService.delete(index).subscribe((data) => {
        if (index==alertCounter) {
          this.refresh();
          this.sweetAlert.delete(data.toString());
        }
      });
      this.selection = new SelectionModel<Group>(true, []);
    });
  }
}
