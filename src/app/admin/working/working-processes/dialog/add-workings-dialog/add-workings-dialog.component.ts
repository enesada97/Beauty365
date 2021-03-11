import { SelectionModel } from "@angular/cdk/collections";
import { HttpErrorResponse } from "@angular/common/http";
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ProcessDtoForWorking } from "src/app/core/models/process-dto-for-working.model";
import { Process } from "src/app/core/models/process.model";
import { ProcessGroup } from "src/app/core/models/processgroup.model";
import { Working } from "src/app/core/models/working.model";
import { ProcessService } from "src/app/core/service/process.service";
import { ProcessgroupService } from "src/app/core/service/processgroup.service";
import { WorkingService } from "src/app/core/service/working.service";

@Component({
  selector: "app-add-workings-dialog",
  templateUrl: "./add-workings-dialog.component.html",
  styleUrls: ["./add-workings-dialog.component.sass"],
})
export class AddWorkingsDialogComponent implements OnInit {
  filterText:string = '';
  selectedOptions = [];
  selectedOption = "all";
  displayedProcessColumns = [
    "select",
    "groupName",
    "processName",
    "price",
    "isLab",
    "isRad",
    "actions",
  ];
  displayedProcessAddColumns = [
    "groupName",
    "processName",
    "price",
    "isLab",
    "isRad",
    "actions",
  ];
  selection = new SelectionModel<ProcessDtoForWorking>(true, []);
  processDtoForWorking: ProcessDtoForWorking[];
  processesForAdd: ProcessDtoForWorking[] = [];
  protocolId: number;
  filterValue: string = "";
  process: Process;
  working: Working;
  dialogTitle: string;
  id: any;
  categories: ProcessGroup[];
  constructor(
    public dialogRef: MatDialogRef<AddWorkingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public workingService: WorkingService,
    private processService: ProcessService,
    private processGroupService: ProcessgroupService
  ) {
    this.processDtoForWorking = data.processDtoForWorking;
    this.protocolId = data.protocolId;
    console.log(this.processDtoForWorking);
    this.dialogTitle = "Yeni Hizmet Ekle";
  }
  dataSource: MatTableDataSource<ProcessDtoForWorking>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;

  dataSourceForProcess: MatTableDataSource<ProcessDtoForWorking>;
  @ViewChild(MatPaginator, { static: false }) paginatorAdd: MatPaginator;

  ngOnInit(): void {
    this.processGroupService.getAll().subscribe((data) => {
      this.categories = data;
      console.log(data);
      console.log(JSON.stringify(data));
    });
    this.getProcesses(this.selectedOption);
  }
  getProcesses(selectedOption: string) {
    if (selectedOption == "all") {
      this.dataSource = new MatTableDataSource<ProcessDtoForWorking>(
        this.processDtoForWorking
      );
      setTimeout(() => (this.dataSource.sort = this.sort));
      setTimeout(() => (this.dataSource.paginator = this.paginator));
    } else {
      this.dataSource = new MatTableDataSource<ProcessDtoForWorking>(
        this.processDtoForWorking.filter(
          (processDtoForWorking) =>
            processDtoForWorking.groupName == selectedOption
        )
      );
      setTimeout(() => (this.dataSource.sort = this.sort));
      setTimeout(() => (this.dataSource.paginator = this.paginator));
    }
  }
  getProcessesAdd() {
    this.dataSourceForProcess = new MatTableDataSource<ProcessDtoForWorking>(
      this.processesForAdd
    );
    setTimeout(() => (this.dataSource.paginator = this.paginatorAdd));
  }
  addNewProcess(i, row) {
    this.id = row.id;
    console.log(row);
    this.processService.getById(this.id).subscribe((data) => {
      this.process = data;
      this.working = new Working({});
      this.working.processId = this.process.id;
      this.working.protocolId = this.protocolId;
      this.working.workingDateTime = new Date();
      this.working.quantity = 1;
      this.working.price = row.price;
      this.working.paidValue = 0;
      this.working.arrearsValue = row.price;
      this.workingService.save(this.working).subscribe((data) => {
        this.workingService._sweetAlert.success("İşlem");
        this.processesForAdd.splice(i, 1);
        this.getProcessesAdd();
      });
    });
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  }
  addSelectedRowProcesses() {
    this.dataSourceForProcess.data.forEach((item) => {
      const index: number = item.id;
      this.working = new Working({});
      this.working.processId = item.id;
      this.working.protocolId = this.protocolId;
      this.working.workingDateTime = new Date();
      this.working.quantity = 1;
      this.working.price = item.price;
      this.working.paidValue = 0;
      this.working.arrearsValue = item.price;
      this.workingService.save(this.working).subscribe(
        (data) => {},
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );
      this.workingService._sweetAlert.success("Hizmetler");
    });
  }
  addNewProcesses(row) {
    this.processesForAdd.push(row);
    this.getProcessesAdd();
  }
  deleteNewProcess(i: number, row) {
    const index = i;
    this.id = row.id;
    this.processesForAdd.splice(i,1);
    this.getProcessesAdd();
  }
  deleteAllNewProcess() {
    this.processesForAdd=[];
    this.getProcessesAdd();
  }
  addSelectedRowsForProcess() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      this.processesForAdd.push(item);
      console.log(JSON.stringify(this.processesForAdd));
    });
    this.selection = new SelectionModel<ProcessDtoForWorking>(true, []);
    this.getProcessesAdd();
  }
  applyFilter(filterValue: string) {
    this.filterValue = filterValue;
    if (this.selectedOption != "all") {
      this.onNgModelChange("all");
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onNgModelChange($event) {
    this.filterValue = "";
    console.log($event);
    this.selectedOption = $event;
    this.refresh();
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
  refresh() {
    this.getProcesses(this.selectedOption);
  }
}
