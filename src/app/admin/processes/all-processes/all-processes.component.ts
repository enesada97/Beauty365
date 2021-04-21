import { ProcessgroupService } from './../../../core/service/processgroup.service';
import { ProcessGroup } from './../../../core/models/processgroup.model';
import { ProcessService } from './../../../core/service/process.service';
import { Process } from './../../../core/models/process.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SaveProcessDialogComponent } from './dialog/save-process-dialog/save-process-dialog.component';

@Component({
  selector: 'app-all-processes',
  templateUrl: './all-processes.component.html',
  styleUrls: ['./all-processes.component.sass']
})
export class AllProcessesComponent implements OnInit{
    searchedProcesses: Process[];
    displayedColumns = ['name', 'processGroupId', 'unit','doctorRatio','cost','taxRatio','isLab','isRad','actions'];
    processes: Process[];
    process:Process;
    processForm: FormGroup;
    processGroups:ProcessGroup[];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: MatTableDataSource<Process>;
    constructor(private fb: FormBuilder,private processGroupService:ProcessgroupService,private processService: ProcessService,public dialog: MatDialog) {
       this.processForm = this.fb.group({
        processGroupId:[null]
       });
    }
    ngOnInit():void{
      this.processGroupService.getList().subscribe((data)=>{
        this.processGroups=data;
      })
    }
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  addNew() {
    const dialogRef = this.dialog.open(SaveProcessDialogComponent, {
      data: {
        process: this.process,
        action: "add",
      },
    });
    dialogRef.afterClosed();
  }
  editCall(row) {
    const dialogRef = this.dialog.open(SaveProcessDialogComponent, {
      data: {
        process: row,
        action: "edit",
      },
    });
    dialogRef.afterClosed();
  }

     onSubmit(): void {

      this.processes = Object.assign({}, this.processForm.value);
      var  test=this.processForm.get('processGroupId').value;
      test.forEach(element => {
        this.processService.getListByGroupId(element).subscribe(data=>{
          this.searchedProcesses=data;
          this.processService.isTblLoading=false;
          this.dataSource = new MatTableDataSource<Process>(this.searchedProcesses);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator=this.paginator;
        });
      })
    }
  }



