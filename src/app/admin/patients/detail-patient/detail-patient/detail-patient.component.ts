import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { DateAdapter } from "@angular/material/core";
import { MatDialog } from "@angular/material/dialog";
import {
  MatSelectionList,
  MatSelectionListChange,
} from "@angular/material/list";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { Appointment } from "src/app/core/models/appointment.model";
import { AppointmentDto } from "src/app/core/models/appointmentdto.model";
import { Collection } from "src/app/core/models/collection.model";
import { DynamicTableData } from "src/app/core/models/dynamic-table-data.model";
import { FormField } from "src/app/core/models/form-field.model";
import { MedicalAlert } from "src/app/core/models/medical-alert.mode";
import { Medical } from "src/app/core/models/medical.model";
import { Patient } from "src/app/core/models/patient.model";
import { ProtocolDto } from "src/app/core/models/protocoldto";
import { AppointmentService } from "src/app/core/service/appointment.service";
import { CollectionService } from "src/app/core/service/collection.service";
import { DynamicTableDataService } from "src/app/core/service/dynamic-table-data.service";
import { FormFieldSelectionValueService } from "src/app/core/service/form-field-selection-value.service";
import { FormFieldService } from "src/app/core/service/form-field.service";
import { FormTableService } from "src/app/core/service/form-table.service";
import { MedicalAlertService } from "src/app/core/service/medical-alert.service";
import { MedicalService } from "src/app/core/service/medical.service";
import { PatientService } from "src/app/core/service/patient.service";
import { Print } from "src/app/core/service/print";
import { ProtocolService } from "src/app/core/service/protocol.service";
import { SweetalertService } from "src/app/core/service/sweetalert.service";
import { AuthService } from "src/app/core/service/system-service/auth.service";
import { NoteForPatientComponent } from "../../all-patients/dialog/note-for-patient/note-for-patient.component";
import { AddProtocolDialogComponent } from "../../search-patient/add-protocol-dialog/add-protocol-dialog.component";
import { MedicalAlertComponent } from "./dialog/medical-alert/medical-alert.component";

@Component({
  selector: "app-detail-patient",
  templateUrl: "./detail-patient.component.html",
  styleUrls: ["./detail-patient.component.sass"],
  providers:[FormTableService,FormFieldService,FormFieldSelectionValueService,DynamicTableDataService],
})
export class DetailPatientComponent implements OnInit {
  medicalAlerts: MedicalAlert[] | null;
  //claimsleri menüden yönet
  menuItems = [
    {
      id: 2,
      name: "Notes",
      icon: "note_add",
      claim:"GetMedicalByProtocolIdQuery",
      subItems: [{ id: 2.1, name: "AddNote", icon: "note_add",claim:"CreateMedicalCommand"}],
    },
    { id: 3, name: "Appointments", icon: "date_range",claim:"GetAppointmentsDtoByPatientIdQuery"},
    { id: 4, name: "Invoices", icon: "local_mall",claim:"GetAppointmentsDtoByPatientIdQuery"},
    { id: 5, name: "Payments", icon: "shopping_cart",claim:"GetCollectionsByProtocolIdQuery"},
  ];
  @ViewChild(MatSelectionList) select: MatSelectionList;
  @ViewChild(MatSelectionList) selectAppointmentForNoteAdd: MatSelectionList;
  constructor(
    private activatedRoute: ActivatedRoute,
    private patientService: PatientService,
    private appointmentService: AppointmentService,
    private medicalAlertService: MedicalAlertService,
    private medicalService: MedicalService,
    private protocolService: ProtocolService,
    public collectionService: CollectionService,
    private dateAdapter: DateAdapter<any>,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private formTableService:FormTableService,
    private formFieldService:FormFieldService,
    private formFieldSelectionValueService:FormFieldSelectionValueService,
    private dynamicTableDataService:DynamicTableDataService,
    private authService:AuthService,
    private sweetAlert:SweetalertService
  ) {
    this.dateAdapter.setLocale("tr");
    this.selectedNoteType = "Muayene";
    this.selectedNoteTypeForAdd = "Muayene";
    this.medical = new Medical({});
    this.medicalForm = this.createContactForm();
    this.dynamicFormGroup =this.createDynamicContactForm();
  }
  appointments: AppointmentDto[] | null;
  patient: Patient;
  patientDataId: number;
  id: number;
  displayedColumns = [
    "departmentName",
    "doctorName",
    "doctorSurname",
    "typeName",
    "time",
    "patientHasArrive",
    "actions",
  ];
  dataSource: MatTableDataSource<AppointmentDto>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  filterValue: string = "";
  displayedColumnsForCollections = [
    "protocolId",
    "paymentType",
    "price",
    "discount",
    "paymentValue",
    "discountValue",
    "addedDate",
    "actions",
  ];
  dataSourceForCollections: MatTableDataSource<Collection>;
  @ViewChild(MatPaginator, { static: false })
  paginatorForCollections: MatPaginator;
  @ViewChild(MatSort, { static: false }) sortingForCollections: MatSort;
  protocols: ProtocolDto[] | null;
  medicals: Medical[] | null = [];
  selectedNoteType: any = undefined;
  selectedNoteTypeForAdd: any = "Muayene";
  selectionForAppointment: any = undefined;
  medicalForm: FormGroup;
  medical: Medical;
  dynamicTableDatas:DynamicTableData[] | null=[];
  collections: Collection[] | null = [];
  clickToAddNote: boolean = false;
  action: string = "add";
  dynamicFormArray:any;
  dynamicFormGroup:FormGroup;
  formFields:FormField[];
  counter:any[];
  ngOnInit(): void {
    this.getParamValue();
    this.getMedicalAlertsById();
    this.getPatientById();
  }
  checkClaim(claim: string): boolean {
    return this.authService.claimGuard(claim);
  }
  getSubItems(item: any): any {
    let acceptedClaims:any[]=[];
    if(item.subItems){
      for (let i = 0; i < item.subItems.length; i++) {
        const element = item.subItems[i];
        if(this.checkClaim(element.claim)==true){
          acceptedClaims.push(element);
        }
      }
    }
    return acceptedClaims;
  }
  getParamValue() {
    this.activatedRoute.params.subscribe((params) => {
      this.patientDataId = params["id"];
    });
  }
  getMedicalAlertsById() {
    this.medicalAlertService
      .getListByPatientId(this.patientDataId)
      .subscribe((data) => {
        this.medicalAlerts = data;
      });
  }
  getPatientById() {
    this.patientService.getById(this.patientDataId).subscribe((data) => {
      this.patient = data;
      this.patientService.isTblLoading = false;
    });
  }
  getAppointmentsById(protocolId?:number) {
    this.appointmentService
      .getListByPatientId(this.patientDataId)
      .subscribe((data) => {
        if(data){
          this.appointments = data;
          console.log(this.appointments);
          setTimeout(() =>
           ((this.appointments[this.appointments.length - 1].appointmentNo )&&
           (this.appointments))
              ? protocolId?this.selectionForAppointment=this.appointments.find(a=>a.protocolNo===protocolId).appointmentNo:(this.selectionForAppointment = this.appointments[
                  this.appointments.length - 1
                ].appointmentNo)
              : null
          );
          this.dataSource = new MatTableDataSource<AppointmentDto>(
            this.appointments
          );
          setTimeout(() => (this.dataSource.sort = this.sort));
          setTimeout(() => (this.dataSource.paginator = this.paginator));
        }
      });
  }
  getProtocolsById(selected: number) {
    this.protocolService
      .getProtocolDtoListByPatientId(this.patientDataId)
      .subscribe((data) => {
        this.protocols = data;
        this.protocols.sort((a, b) => b.protocolNo - a.protocolNo);
        console.log(this.protocols);
        setTimeout(() =>
          this.protocols.forEach((p) => {
            if (selected == 2) {
              this.getMedicalNotesByProtocolsId(p.protocolNo);
              this.getDynamicTablesDatas(p.protocolNo);
            } else {
              this.getCollectionsByProtocolsId(p.protocolNo);
            }
          })
        );
      });
  }
  getDynamicTablesDatas(protocolId){
    this.dynamicTableDatas=[];
    this.dynamicTableDataService.getListByProtocolId(protocolId).subscribe(data=>{
      data == null
        ? null
        : this.dynamicTableDatas.findIndex((m) => data.forEach(dataElement=>{
          dataElement.id==m.id
        })) === -1
        ? (this.dynamicTableDatas = this.dynamicTableDatas.concat(data))
        : null;
        console.log(this.dynamicTableDatas);
    })
  }
  getMedicalNotesByProtocolsId(protocolId: number) {
    this.medicalService.getByProtocolId(protocolId).subscribe((data) => {
      data == null
        ? null
        : this.medicals.findIndex((m) => m.id == data.id) === -1
        ? (this.medicals = this.medicals.concat(data))
        : null;
      console.log(this.medicals);
    });
  }
  getCollectionsByProtocolsId(protocolId: number) {
    this.collectionService.getListByProtocolId(protocolId).subscribe((data) => {
      this.collections = this.collections.concat(data);
      this.dataSourceForCollections = new MatTableDataSource<Collection>(
        this.collections
      );
      setTimeout(
        () => (this.dataSourceForCollections.sort = this.sortingForCollections)
      );
      setTimeout(
        () =>
          (this.dataSourceForCollections.paginator = this.paginatorForCollections)
      );
      console.log(this.collections);
    });
  }
  getInvoices() {}
  editNote(medicalAlert: MedicalAlert) {
    const dialogRef = this.dialog.open(MedicalAlertComponent, {
      height: "270px",
      width: "240px",
      minHeight: "45%",
      minWidth: "40%",
      data: {
        medicalAlert: medicalAlert,
        action: "edit",
        dialogTitle: "Sağlık Bildirimi Detayı",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refreshForMedicalAlerts();
      }
    });
  }
  addNote() {
    const dialogRef = this.dialog.open(MedicalAlertComponent, {
      height: "270px",
      width: "240px",
      minHeight: "45%",
      minWidth: "40%",
      data: {
        patientDataId: this.patientDataId,
        action: "add",
        dialogTitle: "Yeni Sağlık Bildirimi",
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refreshForMedicalAlerts();
      }
    });
  }
  sideBarSelectionChange(event: MatSelectionListChange) {
    console.log(
      "onSelectionChange",
      event.option.value,
      event.option.selected ? "added" : "removed"
    );
    switch (event.option.value) {
      case 1:
        console.log("switch:1");
        break;
      case 2:
        this.getProtocolsById(2);
        this.getFormOfTables();
        console.log(this.medicals);
        break;
      case 2.1:
        this.clickToAddNote = true;
        this.getFormOfTables();
        this.getProtocolsById(2);
        this.getAppointmentsById();
        console.log(this.medicals);
        break;
      case 3:
        this.getAppointmentsById();
        console.log(this.appointments);
        break;
      case 4:
        this.getInvoices();
        break;
      case 5:
        this.getProtocolsById(5);
        console.log(this.collections);
        break;
    }
  }
  addProtocolForPatient(row: Patient) {
    row = this.patient;
    this.id = row.id;
    const dialogRef = this.dialog.open(AddProtocolDialogComponent, {
      data: {
        patient: row,
        action: "add",
      },
    });
    dialogRef.afterClosed();
  }
  addNoteForMedical(value:any,protocolId) {
    this.action="add";
    this.select.selectedOptions.clear();
    this.select.options.find((m) => m.value == 2.1).selected = true;
    this.clickToAddNote = true;
    this.getProtocolsById(2);
    this.getAppointmentsById(protocolId);
    this.onOptionsSelectedForm(value);
    this.selectedNoteTypeForAdd=value;
  }
  editNoteForMedical(medical: Medical, action: string) {
    this.action = action;
    this.medicalForm.controls["id"].setValue(medical.id);
    this.medicalForm.controls["addedBy"].setValue(medical.addedBy);
    this.medicalForm.controls["protocolId"].setValue(medical.protocolId);
    this.medicalForm.controls["icd"].setValue(medical.icd);
    this.medicalForm.controls["sikayet"].setValue(medical.sikayet);
    this.medicalForm.controls["hikaye"].setValue(medical.hikaye);
    this.medicalForm.controls["soygecmis"].setValue(medical.soygecmis);
    this.medicalForm.controls["durum"].setValue(medical.durum);
    this.medicalForm.controls["basBoyunTiroid"].setValue(
      medical.basBoyunTiroid
    );
    this.medicalForm.controls["addedDate"].setValue(medical.addedDate);
    this.medicalForm.controls["notlar"].setValue(medical.notlar);
    this.medicalForm.controls["updatedDate"].setValue(new Date());
    if (action == "edit") {
      this.getAppointmentsById();
      this.appointmentService
        .getByProtocolId(medical.protocolId)
        .subscribe((a) => {
          let appointment: Appointment = a;
          console.log("geri dönen randevu id:" + appointment.id);
          this.selectionForAppointment = appointment.id;
        });
    }
    this.select.selectedOptions.clear();
    this.select.options.find((m) => m.value == 2.1).selected = true;
    this.clickToAddNote = true;
    this.getProtocolsById(2);
    this.getAppointmentsById();
  }
  getNoteForMedical(medical: Medical) {
    this.medicalForm.controls["id"].setValue(medical.id);
    this.medicalForm.controls["addedBy"].setValue(medical.addedBy);
    this.medicalForm.controls["protocolId"].setValue(medical.protocolId);
    this.medicalForm.controls["icd"].setValue(medical.icd);
    this.medicalForm.controls["sikayet"].setValue(medical.sikayet);
    this.medicalForm.controls["hikaye"].setValue(medical.hikaye);
    this.medicalForm.controls["soygecmis"].setValue(medical.soygecmis);
    this.medicalForm.controls["durum"].setValue(medical.durum);
    this.medicalForm.controls["basBoyunTiroid"].setValue(
      medical.basBoyunTiroid
    );
    this.medicalForm.controls["addedDate"].setValue(medical.addedDate);
    this.medicalForm.controls["notlar"].setValue(medical.notlar);
    this.medicalForm.controls["updatedDate"].setValue(new Date());
    this.select.selectedOptions.clear();
    this.select.options.find((m) => m.value == 2.1).selected = true;
    this.clickToAddNote = true;
    this.getProtocolsById(2);
    this.getAppointmentsById();
  }
  deleteNoteForMedical(id) {
    for (let i = 0; i < this.medicals.length; i++) {
      if (this.medicals[i].id === id) {
        this.medicals.splice(i, 1);
      }
    }
    this.medicalService.delete(id).subscribe((m) => {
      this.sweetAlert.delete(m.toString());
      this.getProtocolsById(2);
    });
  }
  refreshForMedicalAlerts() {
    this.getMedicalAlertsById();
  }
  refreshForAppointments() {
    this.getAppointmentsById();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.medical.id],
      addedBy: [this.medical.addedBy],
      protocolId: [this.medical.protocolId],
      icd: [this.medical.icd],
      sikayet: [this.medical.sikayet],
      hikaye: [this.medical.hikaye],
      soygecmis: [this.medical.soygecmis],
      durum: [this.medical.durum],
      // ozgecmisPreNatal:[this.medical.ozgecmisPreNatal],
      // ozgecmisNatal:[this.medical.ozgecmisNatal],
      // ozgecmisPostNatal:[this.medical.ozgecmisPostNatal],
      basBoyunTiroid: [this.medical.basBoyunTiroid],
      // solunumSistemi:[this.medical.solunumSistemi],
      // kardiyo:[this.medical.kardiyo],
      // extremiteler: [this.medical.extremiteler],
      addedDate: [this.medical.addedDate],
      updatedDate: [this.medical.updatedDate],
      notlar: [this.medical.notlar],
    });
  }
  onSubmit() {
    if (this.medicalForm.valid) {
      this.medical = Object.assign({}, this.medicalForm.value);
      // this.patient.userId=this.authService.getCurrentUserId();
      this.appointmentService
        .getById(this.selectionForAppointment)
        .subscribe((ap) => {
          this.medical.protocolId = ap.protocolId;
          if(this.medical.id==0){
            this.medicalService.add(this.medical).subscribe(data=>{
              this.sweetAlert.success(data.toString());
              this.backToNote();
              }
              );
          }else{
            this.medicalService.update(this.medical).subscribe(data=>{
              this.sweetAlert.info(data.toString());
              this.backToNote();
              }
              );
          }
        });
    }
  }
  onSubmitDynamicForm(){
    if(this.dynamicFormGroup.valid){
      let dataControls=Object.assign({},Object.keys(this.dynamicFormGroup.controls));
      dataControls=Object.values(dataControls);
      console.log(dataControls);
      let data=Object.assign({}, this.dynamicFormGroup.value);
      data=Object.values(data);
      console.log(data);
      this.appointmentService
        .getById(this.selectionForAppointment)
        .subscribe((ap) => {
          for (let i = 0; i < dataControls.length; i++) {
            const element = dataControls[i];
            let dynamicTableData=new DynamicTableData({});
            dynamicTableData.fieldValue=data[i];
            dynamicTableData.formTableId=this.selectedNoteTypeForAdd;
            dynamicTableData.protocolId=ap.protocolId;
            let field=this.formFields[this.formFields.findIndex(m=>m.formControlName==element)];
            dynamicTableData.formFieldId=field.id;
            dynamicTableData.fieldLabel=field.label;
            dynamicTableData.formControlName=field.formControlName;
            console.log(dynamicTableData);
            if(this.action=="edit"){
              // dynamicTableData.id=this.dynamicTableDatas.find(m=>{
              //   m.formTableId==dynamicTableData.formTableId&&m.formFieldId==dynamicTableData.formFieldId
              // }).id;
              for (let y = 0; y < this.dynamicTableDatas.length; y++) {
                const element2 = this.dynamicTableDatas[y];
                if(dynamicTableData.formTableId==element2.formTableId&&dynamicTableData.formFieldId==element2.formFieldId){
                  dynamicTableData.id=element2.id;
                  console.log(dynamicTableData);
                  console.log(element2);
                }

              }
              dynamicTableData.updatedDate= new Date();
            }
            if(dynamicTableData.id==0){
              this.dynamicTableDataService.add(dynamicTableData).subscribe(data=>{
                this.sweetAlert.success(this.dynamicFormArray.find(m=>m.id==this.selectedNoteTypeForAdd).name+" Notu");
                i==dataControls.length-1?this.backToNote():null;
              })
            }else{
              this.dynamicTableDataService.update(dynamicTableData).subscribe(data=>{
                this.sweetAlert.success(this.dynamicFormArray.find(m=>m.id==this.selectedNoteTypeForAdd).name+" Notu");
                i==dataControls.length-1?this.backToNote():null;
              })
            }
          }
      });
    }
  }
  onOptionsSelected(value: any) {
    console.log("the selected value is " + value);
    this.appointmentService
      .getById(value)
      .subscribe((data) =>
        this.medicalForm.controls["protocolId"].setValue(data.protocolId)
      );
  }
  backToNote() {
    this.select.selectedOptions.clear();
    this.clickToAddNote = false;
    this.getProtocolsById(2);
    this.select.options.find((m) => m.value == 2).selected = true;
  }
  exportMedicalNote(id) {
    Print.exportToPdf("Medical" + id);
  }
  exportDynamicNote(id) {
    Print.exportToPdf("Dynamic" + id);
  }
  getFormOfTables(){
    this.formTableService.getList().subscribe(table=>{
      this.dynamicFormArray=table;
      for (let i = 0; i < this.dynamicFormArray.length; i++) {
        this.getFormFieldOfTables(this.dynamicFormArray[i].id,i);
      }
    });
  }
  getFormFieldOfTables(tableId,i){
    this.formFieldService.getListByFormTableId(tableId).subscribe(field=>{
      this.dynamicFormArray[i].fields=field;
        for (let y = 0; y < this.dynamicFormArray[i].fields.length; y++) {
          this.getFormFieldSelectionValues(this.dynamicFormArray[i].fields[y].id,i,y);
        }
    })
  }
  getFormFieldSelectionValues(fieldId,i,y){
    let index=i;
    this.formFieldSelectionValueService.getListByFormFieldId(fieldId).subscribe(value=>{
      this.dynamicFormArray[i].fields[y].values=value;
      console.log(this.dynamicFormArray);
    })
  }
  createDynamicContactForm(): FormGroup {
    return this.fb.group({
    });
  }
  onOptionsSelectedForm(value: any) {
    console.log("seçilen"+this.selectedNoteTypeForAdd);
    this.selectedNoteTypeForAdd=value;
    console.log("the selected value is " + value);
    //Eğer dinamik formlardan biri seçilmiş ise
    if(typeof value==='number'){
      this.dynamicFormGroup=this.createDynamicContactForm();
      let data=this.dynamicFormArray.find(m=>m.id==value);
      this.createFormControl(data);
      this.protocols.forEach(m=>this.getDynamicTablesDatas(m.protocolNo));
    }
  }
  createFormControl(data:any){
    this.formFields=data.fields;
    data.fields.forEach(element => {
      this.dynamicFormGroup.addControl(element.formControlName,new FormControl(''));
    });
    console.log(this.dynamicFormGroup);
  }
  onOptionsSelectedNote(value:any,protocolId:number){
    console.log(value +"-protokolno:"+protocolId);
    //Eğer dinamik notlardan biri seçilmiş ise
    if(typeof value==='number'){
      this.protocols.forEach(m=>this.getDynamicTablesDatas(m.protocolNo))
    }
  }
  public dynamicTableControl(dynamicTableDatas:DynamicTableData[],protocol:ProtocolDto,formId): boolean {
    if(dynamicTableDatas.some(m=>m.protocolId==protocol.protocolNo&&m.formTableId==formId)){
      return true;
    }else{
      return false;
    }
  }
  editNoteForDynamicData(dynamicTableDatas: DynamicTableData[], action: string,formId?) {
    this.action = action;
    if (action == "edit") {
      this.onOptionsSelectedForm(formId);
       this.getAppointmentsById();
       this.appointmentService
         .getByProtocolId(dynamicTableDatas[0].protocolId)
         .subscribe((a) => {
           let appointment: Appointment = a;
           console.log("geri dönen randevu id:" + appointment.id);
           this.selectionForAppointment = appointment.id;
         });
    }
    for (let i = 0; i < dynamicTableDatas.length; i++) {
      const element = dynamicTableDatas[i];
      console.log("control:"+this.dynamicFormGroup.controls[element.formControlName]);
    this.dynamicFormGroup.controls[element.formControlName].setValue(element.fieldValue);
    }
    this.select.selectedOptions.clear();
    this.select.options.find((m) => m.value == 2.1).selected = true;
    this.clickToAddNote = true;
    this.getProtocolsById(2);
    this.getAppointmentsById();
  }
  deleteNoteForDynamicData(dynamicTableDatas: DynamicTableData[],formId?) {
    for (let i = 0; i < dynamicTableDatas.length; i++) {
      const element = dynamicTableDatas[i];
      if (element.formTableId==formId) {
        this.dynamicTableDataService.delete(element.id).subscribe(data=>{
          if(dynamicTableDatas[dynamicTableDatas.length-1]==element){
            this.getDynamicTablesDatas(element.protocolId);
            this.sweetAlert.delete(data.toString());
          }
        })
      }

    }
  }
  getNoteForDynamicData(dynamicTableDatas: DynamicTableData[],formId?) {
    for (let i = 0; i < dynamicTableDatas.length; i++) {
      const element = dynamicTableDatas[i];
      console.log("control:"+this.dynamicFormGroup.controls[element.formControlName]);
    this.dynamicFormGroup.controls[element.formControlName].setValue(element.fieldValue);
    }
    this.select.selectedOptions.clear();
    this.select.options.find((m) => m.value == 2.1).selected = true;
    this.clickToAddNote = true;
    this.getProtocolsById(2);
    this.getAppointmentsById();
  }
  public dynamicTableProtocolControl(formId): any[] {
    this.counter=[];
    for (let i = 0; i < this.dynamicTableDatas.length; i++) {
      const element=this.dynamicTableDatas[i];
      if(element.formTableId==formId){
        if(this.counter.some(e=>e==element.protocolId)===false){
          this.counter.push(element.protocolId);
        }
      }
    }
    return this.counter;
  }
  public dynamicTableDataControl(formId): any[] {
    let activeData=[];
    for (let i = 0; i < this.dynamicTableDatas.length; i++) {
      if(this.dynamicTableDatas[i].formTableId==formId){
        activeData.push(this.dynamicTableDatas[i]);
      }
    }
    this.dynamicTableDatas=[];
    this.dynamicTableDatas=activeData;
    return this.dynamicTableDatas;
  }
  addNotePatient(data:Patient){
    data=this.patient;
    this.id = data.id;
    const dialogRef = this.dialog.open(NoteForPatientComponent, {
      data: {
        patient: data,
        action: "note",
        dialogTitle:"Not Ekle"
      },
    });
    dialogRef.afterClosed();
  }
  public dynamicTableDataFormControl(): boolean {
    if(typeof this.selectedNoteTypeForAdd==='number'){
      if(this.dynamicTableDatas.some(d=>d.formTableId==this.selectedNoteTypeForAdd)==true){
        return true;
      }
    return false;
    }
    else{
      if (this.medicals.length) {
        return true;
      }
    }
  }
  public protocolHaveOneNote(): boolean {
      if((this.dynamicTableDatas.some(d=>d.protocolId==this.appointments.find(a=>a.appointmentNo==this.selectionForAppointment).protocolNo)==true)&&(this.action!="edit")){
        return false;
      }
    return true;
  }
  public protocolHaveOneMedicalNote(): boolean {
    if((this.medicals.some(d=>d.protocolId==this.appointments.find(a=>a.appointmentNo==this.selectionForAppointment).protocolNo)==true)&&(this.action!="edit")){
      return false;
    }
  return true;
}
}

