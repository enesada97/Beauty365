import { ProcessDtoForWorking } from "./../../../core/models/process-dto-for-working.model";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { PatientForWorkingDto } from "./../../../core/models/patient-for-working-dto.model";
import { WorkingService } from "./../../../core/service/working.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { WorkingDto } from "src/app/core/models/workingdto.model";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { TableUtil } from "src/app/core/tableUtil";
import { SelectionModel } from "@angular/cdk/collections";
import { DeleteComponent } from "./dialog/delete/delete.component";
import { EditDialogComponent } from "./dialog/edit-dialog/edit-dialog.component";
import { AddWorkingsDialogComponent } from "./dialog/add-workings-dialog/add-workings-dialog.component";
import { AddCollectionsDialogComponent } from "./dialog/add-collections-dialog/add-collections-dialog.component";
import { AuthService } from "src/app/core/service/system-service/auth.service";
import { SweetalertService } from "src/app/core/service/sweetalert.service";

@Component({
  selector: "app-working-processes",
  templateUrl: "./working-processes.component.html",
  styleUrls: ["./working-processes.component.sass"],
})
export class WorkingProcessesComponent implements OnInit {
  //variables
  workingDtos: WorkingDto[];
  totalPrice: number = 0;
  paidValue: number = 0;
  discount:number=0;
  arrearsValue: number = 0;
  selection = new SelectionModel<WorkingDto>(true, []);
  displayedColumns = [
    "select",
    "workingDateTime",
    "groupName",
    "processName",
    "quantity",
    "price",
    "saleValue",
    "paidValue",
    "arrearsValue",
    "actions",
  ];
  patientForWorkingDto: PatientForWorkingDto;
  processDtoForWorking: ProcessDtoForWorking[];
  workingForCollectionDtos: WorkingDto[];
  protocolId: number;
  //Hizmetler
  dataSource: MatTableDataSource<WorkingDto>;
  @ViewChild("Sort", { static: false }) sort: MatSort;
  @ViewChild("Paginator", { static: false }) paginator: MatPaginator;
  constructor(
    public workingService: WorkingService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private authService:AuthService,
    private sweetAlert:SweetalertService
  ) {}
  ngOnInit(): void {
    this.getParamValue();
    this.getWorkingDetails();
    this.getPatientDetail();
    this.getProcesses();
  }
  getParamValue() {
    this.activatedRoute.params.subscribe((params) => {
      this.protocolId = params["id"];
    });
  }
  getPatientDetail() {
    //Bu kısım hastanın üst kısımda bulunan bilgilerini getirir
    this.workingService
      .getPatientForWorkingDtoByProtocolId(this.protocolId)
      .subscribe((data) => {
        this.patientForWorkingDto = data;
        this.protocolId = data.protocolId;
      });
  }
  getProcesses(){
    this.workingService
      .getProcessForWorkingDtoListByProtocolId(this.protocolId)
      .subscribe((data) => (this.processDtoForWorking = data));
  }
  getWorkingDetails() {
    this.workingService.getWorkingDtoListByProtocolId(this.protocolId).subscribe((data) => {
      setTimeout(() => (this.workingService.isTblLoading = false), 1000);
      this.workingDtos = data
  this.totalPrice= 0;
  this.paidValue= 0;
  this.discount= 0;
  this.arrearsValue= 0;
      this.workingDtos.forEach((element) => {
        this.totalPrice = this.totalPrice + element.price;
        this.paidValue = this.paidValue + element.paidValue;
        this.discount = this.discount + element.saleValue;
      });
      this.arrearsValue = this.totalPrice - (this.paidValue+this.discount);
      this.dataSource = new MatTableDataSource<WorkingDto>(this.workingDtos);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  exportTable() {
    TableUtil.exportToPdf("Table");
  }
  editCall(row) {
      const dialogRef = this.dialog.open(EditDialogComponent, {
        data: {
          workingDto: row,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result === 1) {
          this.refresh();
        }
      });
  }
  getProcessesDialog() {
    if (this.processDtoForWorking) {
      console.log(this.processDtoForWorking);
      console.log(this.protocolId);
      const dialogRef = this.dialog.open(AddWorkingsDialogComponent, {height:'90%',width:'90%',minHeight:'60%',minWidth:'60%',
        data: {
          protocolId:this.protocolId,
          processDtoForWorking: this.processDtoForWorking,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result === 1) {
          this.refresh();
        }else{
          this.refresh();
        }
      });
    }
  }
  getCollectionsDialog() {
      this.workingForCollectionDtos=this.workingDtos.filter((workingDtos) => workingDtos.arrearsValue > 0)
      this.workingForCollectionDtos.sort(function(a, b) {
        return a.workingNo - b.workingNo;
      });
      console.log(this.workingForCollectionDtos);
    if (this.workingForCollectionDtos) {
      const dialogRef = this.dialog.open(AddCollectionsDialogComponent, {width:'90%',minHeight:'60%',minWidth:'60%',
        data: {
          protocolId:this.protocolId,
          workingForCollectionDtos: this.workingForCollectionDtos,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result === 1) {
          this.refresh();
        }this.refresh();
      });
    }
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
    const alertCounter = this.selection.selected[this.selection.selected.length-1].workingNo;
    this.selection.selected.forEach((item) => {
      const index: number = item.workingNo;
      this.workingService.delete(index).subscribe(
        (data) => {
          if(index==alertCounter){
            this.refresh();
            this.sweetAlert.delete(data.toString());
          }
        }
      );
      this.selection = new SelectionModel<WorkingDto>(true, []);
    });
  }
  deleteItem(row) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {
        row,
        action:"delete"
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refresh();
      }
    });
  }
  refresh() {
  this.getWorkingDetails();
  }
  checkClaim(claim: string): boolean {
    return this.authService.claimGuard(claim);
  }
}
