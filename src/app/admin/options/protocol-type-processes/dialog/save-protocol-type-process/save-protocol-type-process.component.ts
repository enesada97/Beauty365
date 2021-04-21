import { DepForDoctorsService } from 'src/app/core/service/depfordoctors.service';
import { Institution } from 'src/app/core/models/institution.model';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ProcessInstitueDto } from 'src/app/core/models/process-institue-dto.model';
import { ProtocolType } from 'src/app/core/models/protocoltype.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProcessInstitueService } from 'src/app/core/service/process-institue.service';
import { InstitutionService } from 'src/app/core/service/institution.service';
import { ProtocoltypeService } from 'src/app/core/service/protocoltype.service';
import { ProtocolTypeProcessService } from 'src/app/core/service/protocol-type-process.service';
import { ProtocolTypeProcess } from 'src/app/core/models/protocolTypeProcess.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Doctor } from 'src/app/core/models/doctor.model';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';
import { ProcessService } from 'src/app/core/service/process.service';

@Component({
  selector: 'app-save-protocol-type-process',
  templateUrl: './save-protocol-type-process.component.html',
  styleUrls: ['./save-protocol-type-process.component.sass']
})
export class SaveProtocolTypeProcessComponent implements OnInit {
  filterText:string = '';
  selectedInstitutionId :number[];
  selectedProtocolTypeId:number[];
  selectedDoctorId:number[];
  displayedColumns = ["select", "processGroupName","processName","institutionName","price"];
  selection = new SelectionModel<ProcessInstitueDto>(true, []);
  processInstitueDtos: ProcessInstitueDto[];
  institutions: Institution[];
  protocolTypes: ProtocolType[];
  doctors:Doctor[]=[];
  protocolTypeProcess:ProtocolTypeProcess|null;
  constructor(
    public dialogRef: MatDialogRef<SaveProtocolTypeProcessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private processInstitueService: ProcessInstitueService,
    private institutionService: InstitutionService,
    private protocolTypeServices: ProtocoltypeService,
    private depForDoctorsService: DepForDoctorsService,
    public protocolTypeProcessService: ProtocolTypeProcessService,
    private sweetAlert:SweetalertService,
    private processService:ProcessService
  ) {
    }
  dataSource: MatTableDataSource<ProcessInstitueDto>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;

  ngOnInit(): void {
    this.getInstitutions();
    this.getProtocolTypes();
    this.getDoctors();
  }
  getInstitutions(){
    this.institutionService.getList().subscribe((data) => {
      this.institutions = data;
    });
  }
  getProtocolTypes(){
    this.protocolTypeServices.getList().subscribe((data) => {
      this.protocolTypes = data;
    });
  }
  getDoctors(){
    this.depForDoctorsService.getAllDoctorsSub().subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        this.doctors[i]=element.doctor;
      }
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onNgModelChange($event) {
    console.log($event);
    console.log("kurum"+this.selectedInstitutionId.toString());
    console.log("protokol"+this.selectedProtocolTypeId);
    console.log("doktor"+this.selectedDoctorId);
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
    this.getProcessTable(this.selectedInstitutionId[0]);
  }
  getProcessTable(id:number){
    this.processInstitueService.getDtoListByInstitueId(id).subscribe(data=>{
      this.processInstitueDtos=data;
      this.getProcesses();
    });
  }
  getProcesses() {
      this.dataSource = new MatTableDataSource<ProcessInstitueDto>(
        this.processInstitueDtos
      );
      setTimeout(() => (this.dataSource.sort = this.sort));
      setTimeout(() => (this.dataSource.paginator = this.paginator));
  }
  addSelectedRowsForProcess() {
    const alertCounter = this.selection.selected[this.selection.selected.length-1].processInstitueNo;
    this.selection.selected.forEach((item) => {
      const index: number = item.processInstitueNo;
      this.protocolTypeProcess = new ProtocolTypeProcess({});
      this.protocolTypeProcess.doctorId=this.selectedDoctorId[0];
      this.protocolTypeProcess.institueId=this.selectedInstitutionId[0];
      this.protocolTypeProcess.processId=index;
      this.protocolTypeProcess.protocolTypeId=this.selectedProtocolTypeId[0];
      this.protocolTypeProcess.price=item.price;
      this.processInstitueService.getById(item.processInstitueNo).subscribe(pi=>{
        this.processService.getById(pi.processId).subscribe(pr=>{
          this.protocolTypeProcess.doctorRatio=pr.doctorRatio;
          this.protocolTypeProcess.taxRatio=pr.taxRatio;
          this.protocolTypeProcessService.add(this.protocolTypeProcess).subscribe(
            (data) => {
              if (index==alertCounter) {
                this.dialogRef.close(1);
                this.sweetAlert.success(data);
              }
            }
          );
        })
      })
    });
    this.selection = new SelectionModel<ProcessInstitueDto>(true, []);
  }
}
