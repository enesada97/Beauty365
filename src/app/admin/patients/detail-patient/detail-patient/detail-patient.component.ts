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
import { ActivatedRoute, Router } from "@angular/router";
import { Appointment } from "src/app/core/models/appointment.model";
import { AppointmentDto } from "src/app/core/models/appointmentdto.model";
import { Collection } from "src/app/core/models/collection.model";
import { DynamicTableData } from "src/app/core/models/dynamic-table-data.model";
import { FormField } from "src/app/core/models/form-field.model";
import { InvoiceDto } from "src/app/core/models/invoice-dto.model";
import { MedicalAlert } from "src/app/core/models/medical-alert.mode";
import { Medical } from "src/app/core/models/medical.model";
import { OptionalSetting } from "src/app/core/models/optional-setting.model";
import { Patient } from "src/app/core/models/patient.model";
import { ProtocolDto } from "src/app/core/models/protocoldto";
import { AppointmentService } from "src/app/core/service/appointment.service";
import { CollectionService } from "src/app/core/service/collection.service";
import { DynamicTableDataService } from "src/app/core/service/dynamic-table-data.service";
import { FormFieldSelectionValueService } from "src/app/core/service/form-field-selection-value.service";
import { FormFieldService } from "src/app/core/service/form-field.service";
import { FormTableService } from "src/app/core/service/form-table.service";
import { InvoiceService } from "src/app/core/service/invoice.service";
import { MedicalAlertService } from "src/app/core/service/medical-alert.service";
import { MedicalService } from "src/app/core/service/medical.service";
import { OptionalSettingService } from "src/app/core/service/optional-setting.service";
import { PatientService } from "src/app/core/service/patient.service";
import { Print } from "src/app/core/service/print";
import { ProtocolService } from "src/app/core/service/protocol.service";
import { SweetalertService } from "src/app/core/service/sweetalert.service";
import { AuthService } from "src/app/core/service/system-service/auth.service";
import { NoteForPatientComponent } from "../../all-patients/dialog/note-for-patient/note-for-patient.component";
import { AddProtocolDialogComponent } from "../../search-patient/add-protocol-dialog/add-protocol-dialog.component";
import { MedicalAlertComponent } from "./dialog/medical-alert/medical-alert.component";
import Swal from "sweetalert2";
import { FormDialogComponent } from "../../all-patients/dialog/form-dialog/form-dialog.component";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-detail-patient",
  templateUrl: "./detail-patient.component.html",
  styleUrls: ["./detail-patient.component.sass"],
  providers: [
    FormTableService,
    FormFieldService,
    FormFieldSelectionValueService,
    DynamicTableDataService,
  ],
})
export class DetailPatientComponent implements OnInit {
  medicalAlerts: MedicalAlert[] | null;
  //claimsleri menüden yönet
  menuItems = [
    {
      id: 2,
      name: "Notes",
      icon: "note_add",
      claim: "GetMedicalByProtocolIdQuery",
      subItems: [
        {
          id: 2.1,
          name: "AddNote",
          icon: "note_add",
          claim: "CreateMedicalCommand",
        },
      ],
    },
    {
      id: 3,
      name: "Appointments",
      icon: "date_range",
      claim: "GetAppointmentsDtoByPatientIdQuery",
    },
    {
      id: 4,
      name: "Invoices",
      icon: "local_mall",
      claim: "GetInvoiceDtoByProtocolIdQuery",
    },
    {
      id: 5,
      name: "Payments",
      icon: "shopping_cart",
      claim: "GetCollectionsByProtocolIdQuery",
    },
  ];
  @ViewChild(MatSelectionList) select: MatSelectionList;
  @ViewChild(MatSelectionList) selectAppointmentForNoteAdd: MatSelectionList;
  optionalSettingForIdentityRequired:OptionalSetting;
  constructor(
    private activatedRoute: ActivatedRoute,
    private patientService: PatientService,
    private appointmentService: AppointmentService,
    private medicalAlertService: MedicalAlertService,
    private medicalService: MedicalService,
    private protocolService: ProtocolService,
    public collectionService: CollectionService,
    public invoiceService: InvoiceService,
    private dateAdapter: DateAdapter<any>,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private formTableService: FormTableService,
    private formFieldService: FormFieldService,
    private formFieldSelectionValueService: FormFieldSelectionValueService,
    private dynamicTableDataService: DynamicTableDataService,
    private authService: AuthService,
    private sweetAlert: SweetalertService,
    private optionalSettingService:OptionalSettingService,
    private router:Router,
    private translate:TranslateService
  ) {
    this.dateAdapter.setLocale("tr");
    this.selectedNoteType = "Muayene";
    this.selectedNoteTypeForAdd = "Muayene";
    this.medical = new Medical({});
    this.medicalForm = this.createContactForm();
    this.dynamicFormGroup = this.createDynamicContactForm();
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
  displayedColumnsForInvoices = [
    "protocolId",
    "totalPrice",
    "paymentBillNo",
    "discountValue",
    "addedDate",
    "addedBy",
    "actions",
  ];
  dataSourceForCollections: MatTableDataSource<Collection>;
  dataSourceForInvoices: MatTableDataSource<InvoiceDto>;
  @ViewChild(MatPaginator, { static: false })
  paginatorForCollections: MatPaginator;
  @ViewChild(MatSort, { static: false }) sortingForCollections: MatSort;
  paginatorForInvoices: MatPaginator;
  @ViewChild(MatSort, { static: false }) sortingForInvoices: MatSort;
  protocols: ProtocolDto[] | null;
  medicals: Medical[] | null = [];
  selectedNoteType: any = undefined;
  selectedNoteTypeForAdd: any = "Muayene";
  selectionForAppointment: any = undefined;
  medicalForm: FormGroup;
  medical: Medical;
  dynamicTableDatas: DynamicTableData[] | null = [];
  collections: Collection[] | null = [];
  invoices: InvoiceDto[] | null = [];
  clickToAddNote: boolean = false;
  action: string = "add";
  dynamicFormArray: any;
  dynamicFormGroup: FormGroup;
  formFields: FormField[];
  counter: any[];
  userName: string;
  ngOnInit(): void {
    this.userName = this.authService.getUserName();
    this.getParamValue();
    this.getMedicalAlertsById();
    this.getPatientById();
    this.getOptionalSetting();
  }
  getOptionalSetting(){
    this.optionalSettingService.getById(2).subscribe(data=>{
      this.optionalSettingForIdentityRequired=data;
    })
  }
  checkClaim(claim: string): boolean {
    return this.authService.claimGuard(claim);
  }
  getSubItems(item: any): any {
    let acceptedClaims: any[] = [];
    if (item.subItems) {
      for (let i = 0; i < item.subItems.length; i++) {
        const element = item.subItems[i];
        if (this.checkClaim(element.claim) == true) {
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
  getAppointmentsById(protocolId?: number) {
    this.appointmentService
      .getListByPatientId(this.patientDataId)
      .subscribe((data) => {
        if (data) {
          this.appointments = data;
          setTimeout(() =>
            this.appointments[this.appointments.length - 1].appointmentNo &&
            this.appointments
              ? protocolId
                ? (this.selectionForAppointment = this.appointments.find(
                    (a) => a.protocolNo === protocolId
                  ).appointmentNo)
                : (this.selectionForAppointment = this.appointments[
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
        setTimeout(() =>
          this.protocols.forEach((p) => {
            if (selected == 2) {
              this.getMedicalNotesByProtocolsId(p.protocolNo);
              this.getDynamicTablesDatas(p.protocolNo);
            } else if (selected == 5) {
              this.getCollectionsByProtocolsId(p.protocolNo);
            } else {
              this.getInvoices(p.protocolNo);
            }
          })
        );
      });
  }
  getDynamicTablesDatas(protocolId) {
    this.dynamicTableDatas = [];
    this.dynamicTableDataService
      .getListByProtocolId(protocolId)
      .subscribe((data) => {
        data == null
          ? null
          : this.dynamicTableDatas.findIndex((m) =>
              data.forEach((dataElement) => {
                dataElement.id == m.id;
              })
            ) === -1
          ? (this.dynamicTableDatas = this.dynamicTableDatas.concat(data))
          : null;
      });
  }
  getMedicalNotesByProtocolsId(protocolId: number) {
    this.medicalService.getByProtocolId(protocolId).subscribe((data) => {
      data == null
        ? null
        : this.medicals.findIndex((m) => m.id == data.id) === -1
        ? (this.medicals = this.medicals.concat(data))
        : null;
    });
  }
  getCollectionsByProtocolsId(protocolId: number) {
    this.collections = [];
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
    });
  }
  getInvoices(protocolId: number) {
    this.invoices = [];
    this.invoiceService.getDtoByProtocolId(protocolId).subscribe((data) => {
      this.invoices = this.invoices.concat(data);
      this.dataSourceForInvoices = new MatTableDataSource<InvoiceDto>(
        this.invoices
      );
      setTimeout(
        () => (this.dataSourceForInvoices.sort = this.sortingForInvoices)
      );
      setTimeout(
        () => (this.dataSourceForInvoices.paginator = this.paginatorForInvoices)
      );
    });
  }
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
    switch (event.option.value) {
      case 1:
        break;
      case 2:
        this.getProtocolsById(2);
        this.getFormOfTables();
        break;
      case 2.1:
        this.clickToAddNote = true;
        this.getFormOfTables();
        this.getProtocolsById(2);
        this.getAppointmentsById();
        break;
      case 3:
        this.getAppointmentsById();
        break;
      case 4:
        this.getProtocolsById(4);
        break;
      case 5:
        this.getProtocolsById(5);
        break;
    }
  }
  protocolControl(row:Patient) {
    this.protocolService.getProtocolDtoListByPatientId(row.id).subscribe(data=>{
      if(data.length){
        // let isOpenControl=data.find(m=>m.isOpen==true);
        // isOpenControl==undefined?this.passParameter(row):null;
        if(this.optionalSettingForIdentityRequired.isOpen==true){
          row.identityNumber?this.addProtocolForPatient(row):this.passParameterForIdentity(row);
        }else{
          this.addProtocolForPatient(row);
        }
      }else{
        if(this.optionalSettingForIdentityRequired.isOpen==true){
          row.identityNumber?this.addProtocolForPatient(row):this.passParameterForIdentity(row);
        }else{
          this.addProtocolForPatient(row);
        }
      }
    })
  }
  passParameterForIdentity(row:Patient) {
    Swal.fire({
      title:
      this.translate.instant('CannotOpenTheProtocolBeforeAddingIdentityNumberForPatient'),
      text:
        row.name +
        " " +
        row.surName +
        " "+this.translate.instant('IdentityNumberRecordNotFound'),
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: this.translate.instant('No'),
      confirmButtonText: this.translate.instant('Yes'),
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const dialogRef = this.dialog.open(FormDialogComponent, {
          data: {
            patient: row,
            action: "edit",
            optionalSettingForIdentityRequired:this.optionalSettingForIdentityRequired,
          },
        });
        dialogRef.afterClosed().subscribe((result:Patient) => {
          if(result){
              this.addProtocolForPatient(row);
            }
        });
      }
    })
  }
  addProtocolForPatient(row:Patient) {
    const dialogRef = this.dialog.open(AddProtocolDialogComponent, {
      data: {
        patient: row,
        action: "add",
        userName:this.userName
      },
    });
    dialogRef.afterClosed().subscribe((result:number) => {
      if(result){
        this.router.navigateByUrl("admin/working/working-processes/"+result);
        }
    });
  }
  addNoteForMedical(value: any, protocolId) {
    this.action = "add";
    this.select.selectedOptions.clear();
    this.select.options.find((m) => m.value == 2.1).selected = true;
    this.clickToAddNote = true;
    this.getProtocolsById(2);
    this.getAppointmentsById(protocolId);
    this.onOptionsSelectedForm(value);
    this.selectedNoteTypeForAdd = value;
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
    // this.medicalForm.controls["ozgecmisPreNatal"].setValue(medical.notlar);
    // this.medicalForm.controls["ozgecmisNatal"].setValue(medical.notlar);
    // this.medicalForm.controls["ozgecmisPostNatal"].setValue(medical.notlar);
    this.medicalForm.controls["solunumSistemi"].setValue(medical.notlar);
    this.medicalForm.controls["kardiyo"].setValue(medical.notlar);
    this.medicalForm.controls["extremiteler"].setValue(medical.notlar);
    this.medicalForm.controls["karinMuayene"].setValue(medical.notlar);
    this.medicalForm.controls["analGenital"].setValue(medical.notlar);
    this.medicalForm.controls["norolojikMuayene"].setValue(medical.notlar);
    this.medicalForm.controls["uygulamalar"].setValue(medical.notlar);
    this.medicalForm.controls["oneriler"].setValue(medical.notlar);
    this.medicalForm.controls["tedavi"].setValue(medical.notlar);
    this.medicalForm.controls["cilt"].setValue(medical.notlar);
    this.medicalForm.controls["gecirilenOperasnyonlar"].setValue(medical.notlar);
    this.medicalForm.controls["alerjiler"].setValue(medical.notlar);
    this.medicalForm.controls["kullanilanIlaclar"].setValue(medical.notlar);
    this.medicalForm.controls["bagimlilik"].setValue(medical.notlar);
    this.medicalForm.controls["updatedBy"].setValue(medical.notlar);
    if (action == "edit") {
      this.getAppointmentsById();
      this.appointmentService
        .getByProtocolId(medical.protocolId)
        .subscribe((a) => {
          let appointment: Appointment = a;
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
    // this.medicalForm.controls["ozgecmisPreNatal"].setValue(medical.notlar);
    // this.medicalForm.controls["ozgecmisNatal"].setValue(medical.notlar);
    // this.medicalForm.controls["ozgecmisPostNatal"].setValue(medical.notlar);
    this.medicalForm.controls["solunumSistemi"].setValue(medical.notlar);
    this.medicalForm.controls["kardiyo"].setValue(medical.notlar);
    this.medicalForm.controls["extremiteler"].setValue(medical.notlar);
    this.medicalForm.controls["karinMuayene"].setValue(medical.notlar);
    this.medicalForm.controls["analGenital"].setValue(medical.notlar);
    this.medicalForm.controls["norolojikMuayene"].setValue(medical.notlar);
    this.medicalForm.controls["uygulamalar"].setValue(medical.notlar);
    this.medicalForm.controls["oneriler"].setValue(medical.notlar);
    this.medicalForm.controls["tedavi"].setValue(medical.notlar);
    this.medicalForm.controls["cilt"].setValue(medical.notlar);
    this.medicalForm.controls["gecirilenOperasnyonlar"].setValue(medical.notlar);
    this.medicalForm.controls["alerjiler"].setValue(medical.notlar);
    this.medicalForm.controls["kullanilanIlaclar"].setValue(medical.notlar);
    this.medicalForm.controls["bagimlilik"].setValue(medical.notlar);
    this.medicalForm.controls["updatedBy"].setValue(medical.notlar);
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
      // ozgecmisPreNatal: [this.medical.ozgecmisPreNatal],
      // ozgecmisNatal: [this.medical.ozgecmisNatal],
      // ozgecmisPostNatal: [this.medical.ozgecmisPostNatal],
      basBoyunTiroid: [this.medical.basBoyunTiroid],
      solunumSistemi: [this.medical.solunumSistemi],
      kardiyo: [this.medical.kardiyo],
      extremiteler: [this.medical.extremiteler],
      addedDate: [this.medical.addedDate],
      updatedDate: [this.medical.updatedDate],
      notlar: [this.medical.notlar],
      alerjiler: [this.medical.alerjiler],
      analGenital: [this.medical.analGenital],
      bagimlilik: [this.medical.bagimlilik],
      cilt: [this.medical.cilt],
      gecirilenOperasnyonlar: [this.medical.gecirilenOperasnyonlar],
      karinMuayene: [this.medical.karinMuayene],
      kullanilanIlaclar: [this.medical.kullanilanIlaclar],
      norolojikMuayene: [this.medical.norolojikMuayene],
      oneriler: [this.medical.oneriler],
      tedavi: [this.medical.tedavi],
      updatedBy: [this.medical.updatedBy],
      uygulamalar: [this.medical.uygulamalar],
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
          if (this.medical.id == 0) {
            this.medicalService.add(this.medical).subscribe((data) => {
              this.sweetAlert.success(data.toString());
              this.backToNote();
            });
          } else {
            this.medicalService.update(this.medical).subscribe((data) => {
              this.sweetAlert.info(data.toString());
              this.backToNote();
            });
          }
        });
    }
  }
  onSubmitDynamicForm() {
    if (this.dynamicFormGroup.valid) {
      let dataControls = Object.assign(
        {},
        Object.keys(this.dynamicFormGroup.controls)
      );
      dataControls = Object.values(dataControls);
      let data = Object.assign({}, this.dynamicFormGroup.value);
      data = Object.values(data);
      this.appointmentService
        .getById(this.selectionForAppointment)
        .subscribe((ap) => {
          for (let i = 0; i < dataControls.length; i++) {
            const element = dataControls[i];
            let dynamicTableData = new DynamicTableData({});
            // dynamicTableData.addedBy = this.userName;
            dynamicTableData.addedBy = '';
            dynamicTableData.fieldValue = data[i];
            dynamicTableData.formTableId = this.selectedNoteTypeForAdd;
            dynamicTableData.protocolId = ap.protocolId;
            let field = this.formFields[
              this.formFields.findIndex((m) => m.formControlName == element)
            ];
            dynamicTableData.formFieldId = field.id;
            dynamicTableData.fieldLabel = field.label;
            dynamicTableData.formControlName = field.formControlName;
            if (this.action == "edit") {
              // dynamicTableData.id=this.dynamicTableDatas.find(m=>{
              //   m.formTableId==dynamicTableData.formTableId&&m.formFieldId==dynamicTableData.formFieldId
              // }).id;
              for (let y = 0; y < this.dynamicTableDatas.length; y++) {
                const element2 = this.dynamicTableDatas[y];
                if (
                  dynamicTableData.formTableId == element2.formTableId &&
                  dynamicTableData.formFieldId == element2.formFieldId
                ) {
                  dynamicTableData.id = element2.id;
                }
              }
              dynamicTableData.updatedDate = new Date();
            }
            if (dynamicTableData.id == 0) {
              this.dynamicTableDataService
                .add(dynamicTableData)
                .subscribe((data) => {
                  this.sweetAlert.success(
                    this.dynamicFormArray.find(
                      (m) => m.id == this.selectedNoteTypeForAdd
                    ).name + " Notu"
                  );
                  i == dataControls.length - 1 ? this.backToNote() : null;
                });
            } else {
              this.dynamicTableDataService
                .update(dynamicTableData)
                .subscribe((data) => {
                  this.sweetAlert.success(
                    this.dynamicFormArray.find(
                      (m) => m.id == this.selectedNoteTypeForAdd
                    ).name + " Notu"
                  );
                  i == dataControls.length - 1 ? this.backToNote() : null;
                });
            }
          }
        });
    }
  }
  onOptionsSelected(value: any) {
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
  getFormOfTables() {
    this.formTableService.getList().subscribe((table) => {
      this.dynamicFormArray = table;
      for (let i = 0; i < this.dynamicFormArray.length; i++) {
        this.getFormFieldOfTables(this.dynamicFormArray[i].id, i);
      }
    });
  }
  getFormFieldOfTables(tableId, i) {
    this.formFieldService.getListByFormTableId(tableId).subscribe((field) => {
      this.dynamicFormArray[i].fields = field;
      for (let y = 0; y < this.dynamicFormArray[i].fields.length; y++) {
        this.getFormFieldSelectionValues(
          this.dynamicFormArray[i].fields[y].id,
          i,
          y
        );
      }
    });
  }
  getFormFieldSelectionValues(fieldId, i, y) {
    let index = i;
    this.formFieldSelectionValueService
      .getListByFormFieldId(fieldId)
      .subscribe((value) => {
        this.dynamicFormArray[i].fields[y].values = value;
      });
  }
  createDynamicContactForm(): FormGroup {
    return this.fb.group({});
  }
  onOptionsSelectedForm(value: any) {
    this.selectedNoteTypeForAdd = value;
    //Eğer dinamik formlardan biri seçilmiş ise
    if (typeof value === "number") {
      this.dynamicFormGroup = this.createDynamicContactForm();
      let data = this.dynamicFormArray.find((m) => m.id == value);
      this.createFormControl(data);
      this.protocols.forEach((m) => this.getDynamicTablesDatas(m.protocolNo));
    }
  }
  createFormControl(data: any) {
    this.formFields = data.fields;
    data.fields.forEach((element) => {
      this.dynamicFormGroup.addControl(
        element.formControlName,
        new FormControl("")
      );
    });
  }
  onOptionsSelectedNote(value: any, protocolId: number) {
    //Eğer dinamik notlardan biri seçilmiş ise
    if (typeof value === "number") {
      this.protocols.forEach((m) => this.getDynamicTablesDatas(m.protocolNo));
    }
  }
  public dynamicTableControl(
    dynamicTableDatas: DynamicTableData[],
    protocol: ProtocolDto,
    formId
  ): boolean {
    if (
      dynamicTableDatas.some(
        (m) => m.protocolId == protocol.protocolNo && m.formTableId == formId
      )
    ) {
      return true;
    } else {
      return false;
    }
  }
  editNoteForDynamicData(
    dynamicTableDatas: DynamicTableData[],
    action: string,
    formId?
  ) {
    this.action = action;
    if (action == "edit") {
      this.onOptionsSelectedForm(formId);
      this.getAppointmentsById();
      this.appointmentService
        .getByProtocolId(dynamicTableDatas[0].protocolId)
        .subscribe((a) => {
          let appointment: Appointment = a;
          this.selectionForAppointment = appointment.id;
        });
    }
    for (let i = 0; i < dynamicTableDatas.length; i++) {
      const element = dynamicTableDatas[i];
      this.dynamicFormGroup.controls[element.formControlName].setValue(
        element.fieldValue
      );
    }
    this.select.selectedOptions.clear();
    this.select.options.find((m) => m.value == 2.1).selected = true;
    this.clickToAddNote = true;
    this.getProtocolsById(2);
    this.getAppointmentsById();
  }
  deleteNoteForDynamicData(dynamicTableDatas: DynamicTableData[], formId?) {
    for (let i = 0; i < dynamicTableDatas.length; i++) {
      const element = dynamicTableDatas[i];
      if (element.formTableId == formId) {
        this.dynamicTableDataService.delete(element.id).subscribe((data) => {
          if (dynamicTableDatas[dynamicTableDatas.length - 1] == element) {
            this.getDynamicTablesDatas(element.protocolId);
            this.sweetAlert.delete(data.toString());
          }
        });
      }
    }
  }
  getNoteForDynamicData(dynamicTableDatas: DynamicTableData[], formId?) {
    for (let i = 0; i < dynamicTableDatas.length; i++) {
      const element = dynamicTableDatas[i];
      this.dynamicFormGroup.controls[element.formControlName].setValue(
        element.fieldValue
      );
    }
    this.select.selectedOptions.clear();
    this.select.options.find((m) => m.value == 2.1).selected = true;
    this.clickToAddNote = true;
    this.getProtocolsById(2);
    this.getAppointmentsById();
  }
  public dynamicTableProtocolControl(formId): any[] {
    this.counter = [];
    for (let i = 0; i < this.dynamicTableDatas.length; i++) {
      const element = this.dynamicTableDatas[i];
      if (element.formTableId == formId) {
        if (this.counter.some((e) => e == element.protocolId) === false) {
          this.counter.push(element.protocolId);
        }
      }
    }
    return this.counter;
  }
  public dynamicTableDataControl(formId): any[] {
    let activeData = [];
    for (let i = 0; i < this.dynamicTableDatas.length; i++) {
      if (this.dynamicTableDatas[i].formTableId == formId) {
        activeData.push(this.dynamicTableDatas[i]);
      }
    }
    this.dynamicTableDatas = [];
    this.dynamicTableDatas = activeData;
    return this.dynamicTableDatas;
  }
  addNotePatient(data: Patient) {
    data = this.patient;
    this.id = data.id;
    const dialogRef = this.dialog.open(NoteForPatientComponent, {
      data: {
        patient: data,
        action: "note",
        dialogTitle: "Not Ekle",
      },
    });
    dialogRef.afterClosed();
  }
  public dynamicTableDataFormControl(): boolean {
    if (typeof this.selectedNoteTypeForAdd === "number") {
      if (
        this.dynamicTableDatas.some(
          (d) => d.formTableId == this.selectedNoteTypeForAdd
        ) == true
      ) {
        return true;
      }
      return false;
    } else {
      if (this.medicals.length) {
        return true;
      }
    }
  }
  public protocolHaveOneNote(): boolean {
    if (
      this.dynamicTableDatas.some(
        (d) =>
          d.protocolId ==
          this.appointments.find(
            (a) => a.appointmentNo == this.selectionForAppointment
          ).protocolNo
      ) == true &&
      this.action != "edit"
    ) {
      return false;
    }
    return true;
  }
  public protocolHaveOneMedicalNote(): boolean {
    if (this.medicals.length||
      this.medicals.some(
        (d) =>
          d.protocolId ==
          this.appointments.find(
            (a) => a.appointmentNo == this.selectionForAppointment
          ).protocolNo
      ) == true &&
      this.action != "edit"
    ) {
      return false;
    }
    return true;
  }
}
