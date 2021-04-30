import { SelectionModel } from "@angular/cdk/collections";
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
import { Protocol } from "src/app/core/models/protocol.model";
import { Working } from "src/app/core/models/working.model";
import { ProcessService } from "src/app/core/service/process.service";
import { ProcessgroupService } from "src/app/core/service/processgroup.service";
import { ProtocolService } from "src/app/core/service/protocol.service";
import { SweetalertService } from "src/app/core/service/sweetalert.service";
import { AuthService } from "src/app/core/service/system-service/auth.service";
import { WorkingService } from "src/app/core/service/working.service";

@Component({
  selector: "app-add-workings-dialog",
  templateUrl: "./add-workings-dialog.component.html",
  styleUrls: ["./add-workings-dialog.component.sass"],
})
export class AddWorkingsDialogComponent implements OnInit {
  filterText: string = "";
  selectedOptions = [];
  selectedOption = "all";
  displayedProcessColumns = [
    "select",
    "groupName",
    "processName",
    "price",
    "taxRatio",
    "isLab",
    "isRad",
    "actions",
  ];
  displayedProcessAddColumns = [
    "groupName",
    "processName",
    "price",
    "taxRatio",
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
  userName: string;
  protocol: Protocol;
  constructor(
    public dialogRef: MatDialogRef<AddWorkingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public workingService: WorkingService,
    private processService: ProcessService,
    private processGroupService: ProcessgroupService,
    private authService: AuthService,
    private protocolService: ProtocolService,
    private sweetAlert: SweetalertService
  ) {
    this.processDtoForWorking = data.processDtoForWorking;
    this.protocolId = data.protocolId;
    this.userName = this.authService.getUserName();
    this.getProtocol();
  }
  dataSource: MatTableDataSource<ProcessDtoForWorking>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;

  dataSourceForProcess: MatTableDataSource<ProcessDtoForWorking>;
  @ViewChild(MatPaginator, { static: false }) paginatorAdd: MatPaginator;

  ngOnInit(): void {
    this.processGroupService.getList().subscribe((data) => {
      this.categories = data;
    });
    this.getProcesses(this.selectedOption);
  }
  checkClaim(claim: string): boolean {
    return this.authService.claimGuard(claim);
  }
  getProtocol() {
    this.protocolService.getById(this.protocolId).subscribe((data) => {
      this.protocol = data;
    });
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
    this.id = row.processId;
    this.processService.getById(this.id).subscribe((data) => {
      this.process = data;
      this.working = new Working({});
      this.working.processId = this.process.id;
      this.working.protocolId = this.protocolId;
      this.working.workingDateTime = new Date();
      this.working.quantity = 1;
      data.taxRatio>0?this.working.price=row.price+((row.price/100)*data.taxRatio):this.working.price=row.price;
      this.working.taxRatio=data.taxRatio;
      this.working.nonTaxablePrice=row.price;
      this.working.paidValue = 0;
      this.working.arrearsValue = this.working.price;
      this.working.doctorId = this.protocol.doctorId;
      // this.working.user = this.userName;
      this.working.user = '';
          this.workingService.add(this.working).subscribe((data) => {
            this.processesForAdd.splice(i, 1);
            this.getProcessesAdd();
            this.sweetAlert.success(data);
          });
    });
  }
  scroll(el: HTMLElement) {
    setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }, 500);
  }
  addSelectedRowProcesses() {
    this.dataSourceForProcess.data.sort((a, b) => a.processId - b.processId);
    console.log(this.dataSourceForProcess.data);
    let alertCounter = this.dataSourceForProcess.data[
      this.dataSourceForProcess.data.length - 1
    ].processId;
    this.dataSourceForProcess.data.forEach((item) => {
      const index: number = item.processId;
      this.processService.getById(index).subscribe((pr) => {
      this.working = new Working({});
      // this.working.user = this.userName;
      this.working.user = '';
      this.working.processId = item.processId;
      this.working.protocolId = this.protocolId;
      this.working.workingDateTime = new Date();
      this.working.quantity = 1;
      this.working.paidValue = 0;
      this.working.doctorId = this.protocol.doctorId;
      pr.taxRatio>0?this.working.price=item.price+((item.price/100)*pr.taxRatio):this.working.price=item.price;
      this.working.taxRatio=pr.taxRatio;
      this.working.nonTaxablePrice=item.price;
      this.working.arrearsValue = this.working.price;
      this.workingService.add(this.working).subscribe((data) => {
        if (index == alertCounter) {
          alertCounter=null;
          setTimeout(()=>this.dialogRef.close(1),500);
          setTimeout(()=> this.sweetAlert.success(data),500);
        }
      });
  });
});
  }
  addNewProcesses(row) {
    this.processesForAdd.push(row);
    this.getProcessesAdd();
  }
  deleteNewProcess(i: number, row) {
    this.id = row.id;
    this.processesForAdd.splice(i, 1);
    this.getProcessesAdd();
  }
  deleteAllNewProcess() {
    this.processesForAdd = [];
    this.getProcessesAdd();
  }
  addSelectedRowsForProcess() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      this.processesForAdd.push(item);
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
