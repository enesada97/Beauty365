// import { HttpErrorResponse } from "@angular/common/http";
// import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
// import { FormBuilder, FormGroup } from "@angular/forms";
// import { DateAdapter } from "@angular/material/core";
// import { MatDialog } from "@angular/material/dialog";
// import {
//   MatSelectionList,
//   MatSelectionListChange,
// } from "@angular/material/list";
// import { MatPaginator } from "@angular/material/paginator";
// import { MatSort } from "@angular/material/sort";
// import { MatTableDataSource } from "@angular/material/table";
// import { ActivatedRoute } from "@angular/router";
// import { Appointment } from "src/app/core/models/appointment.model";
// import { AppointmentDto } from "src/app/core/models/appointmentdto.model";
// import { Collection } from "src/app/core/models/collection.model";
// import { MedicalAlert } from "src/app/core/models/medical-alert.mode";
// import { Medical } from "src/app/core/models/medical.model";
// import { Patient } from "src/app/core/models/patient.model";
// import { ProtocolDto } from "src/app/core/models/protocoldto";
// import { AppointmentService } from "src/app/core/service/appointment.service";
// import { CollectionService } from "src/app/core/service/collection.service";
// import { MedicalAlertService } from "src/app/core/service/medical-alert.service";
// import { MedicalService } from "src/app/core/service/medical.service";
// import { PatientService } from "src/app/core/service/patient.service";
// import { Print } from "src/app/core/service/print";
// import { ProtocolService } from "src/app/core/service/protocol.service";
// import { NoteForPatientComponent } from "../../all-patients/dialog/note-for-patient/note-for-patient.component";
// import { AddProtocolDialogComponent } from "../../search-patient/add-protocol-dialog/add-protocol-dialog.component";
// import { MedicalAlertComponent } from "./dialog/medical-alert/medical-alert.component";

// @Component({
//   selector: "app-detail-patient",
//   templateUrl: "./detail-patient.component.html",
//   styleUrls: ["./detail-patient.component.sass"],
// })
// export class DetailPatientComponent implements OnInit {
//   medicalAlerts: MedicalAlert[] | null;
//   menuItems = [
//     {
//       id: 2,
//       name: "Hastalık Notları",
//       icon: "note_add",
//       subItems: [{ id: 2.1, name: "Not Ekle", icon: "note_add" }],
//     },
//     { id: 3, name: "Randevuları", icon: "date_range" },
//     { id: 4, name: "Faturaları", icon: "local_mall" },
//     { id: 5, name: "Ödemeleri", icon: "shopping_cart" },
//   ];
//   @ViewChild(MatSelectionList) select: MatSelectionList;
//   constructor(
//     private activatedRoute: ActivatedRoute,
//     private patientService: PatientService,
//     private appointmentService: AppointmentService,
//     private medicalAlertService: MedicalAlertService,
//     private medicalService: MedicalService,
//     private protocolService: ProtocolService,
//     private collectionService: CollectionService,
//     private dateAdapter: DateAdapter<any>,
//     public dialog: MatDialog,
//     private fb: FormBuilder
//   ) {
//     this.dateAdapter.setLocale("tr");
//     this.selectedNoteType = "1";
//     this.selectedNoteTypeForAdd = "1";
//     this.medical = new Medical({});
//     this.medicalForm = this.createContactForm();
//   }
//   appointments: AppointmentDto[] | null;
//   patient: Patient;
//   patientDataId: number;
//   id: number;
//   notEntered: "Belirtilmemiş";
//   displayedColumns = [
//     "departmentName",
//     "doctorName",
//     "doctorSurname",
//     "typeName",
//     "time",
//     "patientHasArrive",
//     "actions",
//   ];
//   dataSource: MatTableDataSource<AppointmentDto>;
//   @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
//   @ViewChild(MatSort, { static: false }) sort: MatSort;
//   @ViewChild("filter", { static: true }) filter: ElementRef;
//   filterValue: string = "";
//   displayedColumnsForCollections = [
//     "protocolId",
//     "paymentType",
//     "price",
//     "discount",
//     "paymentValue",
//     "discountValue",
//     "addedDate",
//     "actions",
//   ];
//   dataSourceForCollections: MatTableDataSource<Collection>;
//   @ViewChild(MatPaginator, { static: false })
//   paginatorForCollections: MatPaginator;
//   @ViewChild(MatSort, { static: false }) sortingForCollections: MatSort;
//   protocols: ProtocolDto[] | null;
//   dateTimeNow = new Date();
//   medicals: Medical[] | null = [];
//   selectedNoteType: any = undefined;
//   selectedNoteTypeForAdd: any = undefined;
//   selectionForAppointment: any = undefined;
//   protocolDtoForNote: ProtocolDto;
//   medicalForm: FormGroup;
//   medical: Medical;
//   collections: Collection[] | null = [];
//   clickToAddNote: boolean = false;
//   action: string = "add";
//   ngOnInit(): void {
//     this.getParamValue();
//     this.getMedicalAlertsById();
//     this.getPatientById();
//   }
//   getParamValue() {
//     this.activatedRoute.params.subscribe((params) => {
//       this.patientDataId = params["id"];
//     });
//   }
//   getMedicalAlertsById() {
//     this.medicalAlertService
//       .getListByPatientId(this.patientDataId)
//       .subscribe((data) => {
//         this.medicalAlerts = data;
//       });
//   }
//   getPatientById() {
//     this.patientService.getById(this.patientDataId).subscribe((data) => {
//       this.patient = data;
//       this.patientService.isTblLoading = false;
//     });
//   }
//   getAppointmentsById() {
//     this.appointmentService
//       .getListByPatientId(this.patientDataId)
//       .subscribe((data) => {
//         this.appointments = data;
//         console.log(this.appointments);
//         setTimeout(() =>
//           this.appointments[this.appointments.length - 1].appointmentNo &&
//           this.appointments
//             ? (this.selectionForAppointment = this.appointments[
//                 this.appointments.length - 1
//               ].appointmentNo)
//             : null
//         );
//         this.dataSource = new MatTableDataSource<AppointmentDto>(
//           this.appointments
//         );
//         setTimeout(() => (this.dataSource.sort = this.sort));
//         setTimeout(() => (this.dataSource.paginator = this.paginator));
//       });
//   }
//   getProtocolsById(selected: number) {
//     this.protocolService
//       .getListByPatientId(this.patientDataId)
//       .subscribe((data) => {
//         this.protocols = data;
//         this.protocols.sort((a, b) => b.protocolNo - a.protocolNo);
//         console.log(this.protocols);
//         setTimeout(() =>
//           this.protocols.forEach((p) => {
//             if (selected == 2) {
//               this.getNotesByProtocolsId(p.protocolNo);
//             } else {
//               this.getCollectionsByProtocolsId(p.protocolNo);
//             }
//           })
//         );
//       });
//   }
//   getNotesByProtocolsId(protocolId: number) {
//     this.medicalService.getByProtocolId(protocolId).subscribe((data) => {
//       data == null
//         ? null
//         : this.medicals.findIndex((m) => m.id == data.id) === -1
//         ? (this.medicals = this.medicals.concat(data))
//         : null;
//       console.log(this.medicals);
//     });
//   }
//   getCollectionsByProtocolsId(protocolId: number) {
//     this.collectionService.getListByProtocolId(protocolId).subscribe((data) => {
//       this.collections = this.collections.concat(data);
//       this.dataSourceForCollections = new MatTableDataSource<Collection>(
//         this.collections
//       );
//       setTimeout(
//         () => (this.dataSourceForCollections.sort = this.sortingForCollections)
//       );
//       setTimeout(
//         () =>
//           (this.dataSourceForCollections.paginator = this.paginatorForCollections)
//       );
//       console.log(this.collections);
//     });
//   }
//   getInvoices() {}
//   addProtocolForPatient(row: Patient) {
//     row = this.patient;
//     this.id = row.id;
//     const dialogRef = this.dialog.open(AddProtocolDialogComponent, {
//       data: {
//         patient: row,
//         action: "add",
//       },
//     });
//     dialogRef.afterClosed();
//   }
//   addNoteForMedical(protocol: ProtocolDto) {
//     this.select.selectedOptions.clear();
//     this.select.options.find((m) => m.value == 2.1).selected = true;
//     this.clickToAddNote = true;
//     this.getProtocolsById(2);
//     this.getAppointmentsById();
//   }
//   editNoteForMedical(medical: Medical, action: string) {
//     this.action = action;
//     this.medicalForm.controls["id"].setValue(medical.id);
//     this.medicalForm.controls["addedBy"].setValue(medical.addedBy);
//     this.medicalForm.controls["protocolId"].setValue(medical.protocolId);
//     this.medicalForm.controls["icd"].setValue(medical.icd);
//     this.medicalForm.controls["sikayet"].setValue(medical.sikayet);
//     this.medicalForm.controls["hikaye"].setValue(medical.hikaye);
//     this.medicalForm.controls["soygecmis"].setValue(medical.soygecmis);
//     this.medicalForm.controls["durum"].setValue(medical.durum);
//     this.medicalForm.controls["basBoyunTiroid"].setValue(
//       medical.basBoyunTiroid
//     );
//     this.medicalForm.controls["addedDate"].setValue(medical.addedDate);
//     this.medicalForm.controls["notlar"].setValue(medical.notlar);
//     this.medicalForm.controls["updatedDate"].setValue(new Date());
//     if (action == "edit") {
//       this.getAppointmentsById();
//       this.appointmentService
//         .getByProtocolId(medical.protocolId)
//         .subscribe((a) => {
//           let appointment: Appointment = a;
//           console.log("geri dönen randevu id:" + appointment.id);
//           this.selectionForAppointment = appointment.id;
//         });
//     }
//     this.select.selectedOptions.clear();
//     this.select.options.find((m) => m.value == 2.1).selected = true;
//     this.clickToAddNote = true;
//     this.getProtocolsById(2);
//     this.getAppointmentsById();
//   }
//   deleteNoteForMedical(id) {
//     for (let i = 0; i < this.medicals.length; i++) {
//       if (this.medicals[i].id === id) {
//         this.medicals.splice(i, 1);
//       }
//     }
//     this.medicalService.delete(id).subscribe((m) => {
//       this.medicalService._sweetAlert.delete("Not");
//       this.getProtocolsById(2);
//     });
//   }
//   editNote(medicalAlert: MedicalAlert) {
//     const dialogRef = this.dialog.open(MedicalAlertComponent, {
//       height: "270px",
//       width: "240px",
//       minHeight: "45%",
//       minWidth: "40%",
//       data: {
//         medicalAlert: medicalAlert,
//         action: "edit",
//         dialogTitle: "Sağlık Bildirimi Detayı",
//       },
//     });
//     dialogRef.afterClosed().subscribe((result) => {
//       if (result === 1) {
//         this.patientService._sweetAlert.success("Hasta notu");
//       }
//     });
//   }
//   addNote() {
//     const dialogRef = this.dialog.open(MedicalAlertComponent, {
//       height: "270px",
//       width: "240px",
//       minHeight: "45%",
//       minWidth: "40%",
//       data: {
//         patientDataId: this.patientDataId,
//         action: "add",
//         dialogTitle: "Yeni Sağlık Bildirimi",
//       },
//     });
//     dialogRef.afterClosed().subscribe((result) => {
//       if (result === 1) {
//         this.refreshForMedicalAlerts();
//         this.patientService._sweetAlert.success("Hasta notu");
//       }
//     });
//   }
//   refreshForMedicalAlerts() {
//     this.getMedicalAlertsById();
//   }
//   refreshForAppointments() {
//     this.getAppointmentsById();
//   }
//   applyFilter(filterValue: string) {
//     this.dataSource.filter = filterValue.trim().toLowerCase();
//   }
//   createContactForm(): FormGroup {
//     return this.fb.group({
//       id: [this.medical.id],
//       addedBy: [this.medical.addedBy],
//       protocolId: [this.medical.protocolId],
//       icd: [this.medical.icd],
//       sikayet: [this.medical.sikayet],
//       hikaye: [this.medical.hikaye],
//       soygecmis: [this.medical.soygecmis],
//       durum: [this.medical.durum],
//       // ozgecmisPreNatal:[this.medical.ozgecmisPreNatal],
//       // ozgecmisNatal:[this.medical.ozgecmisNatal],
//       // ozgecmisPostNatal:[this.medical.ozgecmisPostNatal],
//       basBoyunTiroid: [this.medical.basBoyunTiroid],
//       // solunumSistemi:[this.medical.solunumSistemi],
//       // kardiyo:[this.medical.kardiyo],
//       // extremiteler: [this.medical.extremiteler],
//       addedDate: [this.medical.addedDate],
//       updatedDate: [this.medical.updatedDate],
//       notlar: [this.medical.notlar],
//     });
//   }
//   onSubmit() {
//     if (this.medicalForm.valid) {
//       this.medical = Object.assign({}, this.medicalForm.value);
//       // this.patient.userId=this.authService.getCurrentUserId();
//       this.appointmentService
//         .getById(this.selectionForAppointment)
//         .subscribe((ap) => {
//           this.medical.protocolId = ap.protocolId;
//           this.medicalService.save(this.medical).subscribe(
//             (data) => {
//               this.medicalService._sweetAlert.success("Muayene Notu");
//               this.backToNote();
//             },
//             (error: HttpErrorResponse) => {
//               this.patientService.isTblLoading = false;
//               console.log(error.name + " " + error.message);
//             }
//           );
//         });
//     }
//   }
//   onOptionsSelected(value: any) {
//     console.log("the selected value is " + value);
//     this.appointmentService
//       .getById(value)
//       .subscribe((data) =>
//         this.medicalForm.controls["protocolId"].setValue(data.protocolId)
//       );
//   }
//   backToNote() {
//     this.select.selectedOptions.clear();
//     this.clickToAddNote = false;
//     this.getProtocolsById(2);
//     this.select.options.find((m) => m.value == 2).selected = true;
//   }
//   exportMedicalNote(id) {
//     Print.exportToPdf("Medical" + id);
//   }
//   onSelectionChange(event: MatSelectionListChange) {
//     console.log(
//       "onSelectionChange",
//       event.option.value,
//       event.option.selected ? "added" : "removed"
//     );
//     switch (event.option.value) {
//       case 1:
//         console.log("switch:1");
//         break;
//       case 2:
//         this.getProtocolsById(2);
//         console.log(this.medicals);
//         break;
//       case 2.1:
//         this.clickToAddNote = true;
//         this.getProtocolsById(2);
//         this.getAppointmentsById();
//         console.log(this.medicals);
//         break;
//       case 3:
//         this.getAppointmentsById();
//         console.log(this.appointments);
//         break;
//       case 4:
//         this.getInvoices();
//         break;
//       case 5:
//         this.getProtocolsById(5);
//         console.log(this.collections);
//         break;
//     }
//   }
// }
import { HttpErrorResponse } from "@angular/common/http";
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
import { MedicalAlert } from "src/app/core/models/medical-alert.mode";
import { Medical } from "src/app/core/models/medical.model";
import { Patient } from "src/app/core/models/patient.model";
import { ProtocolDto } from "src/app/core/models/protocoldto";
import { AppointmentService } from "src/app/core/service/appointment.service";
import { CollectionService } from "src/app/core/service/collection.service";
import { FormFieldSelectionValueService } from "src/app/core/service/form-field-selection-value.service";
import { FormFieldService } from "src/app/core/service/form-field.service";
import { FormTableService } from "src/app/core/service/form-table.service";
import { MedicalAlertService } from "src/app/core/service/medical-alert.service";
import { MedicalService } from "src/app/core/service/medical.service";
import { PatientService } from "src/app/core/service/patient.service";
import { Print } from "src/app/core/service/print";
import { ProtocolService } from "src/app/core/service/protocol.service";
import { NoteForPatientComponent } from "../../all-patients/dialog/note-for-patient/note-for-patient.component";
import { AddProtocolDialogComponent } from "../../search-patient/add-protocol-dialog/add-protocol-dialog.component";
import { MedicalAlertComponent } from "./dialog/medical-alert/medical-alert.component";

@Component({
  selector: "app-detail-patient",
  templateUrl: "./detail-patient.component.html",
  styleUrls: ["./detail-patient.component.sass"],
  providers:[FormTableService,FormFieldService,FormFieldSelectionValueService],
})
export class DetailPatientComponent implements OnInit {
  medicalAlerts: MedicalAlert[] | null;
  menuItems = [
    {
      id: 2,
      name: "Hastalık Notları",
      icon: "note_add",
      subItems: [{ id: 2.1, name: "Not Ekle", icon: "note_add" }],
    },
    { id: 3, name: "Randevuları", icon: "date_range" },
    { id: 4, name: "Faturaları", icon: "local_mall" },
    { id: 5, name: "Ödemeleri", icon: "shopping_cart" },
  ];
  @ViewChild(MatSelectionList) select: MatSelectionList;
  constructor(
    private activatedRoute: ActivatedRoute,
    private patientService: PatientService,
    private appointmentService: AppointmentService,
    private medicalAlertService: MedicalAlertService,
    private medicalService: MedicalService,
    private protocolService: ProtocolService,
    private collectionService: CollectionService,
    private dateAdapter: DateAdapter<any>,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private formTableService:FormTableService,
    private formFieldService:FormFieldService,
    private formFieldSelectionValueService:FormFieldSelectionValueService
  ) {
    this.dateAdapter.setLocale("tr");
    this.selectedNoteType = "1";
    this.selectedNoteTypeForAdd = "1";
    this.medical = new Medical({});
    this.medicalForm = this.createContactForm();
    this.dynamicFormGroup =this.createDynamicContactForm();
  }
  appointments: AppointmentDto[] | null;
  patient: Patient;
  patientDataId: number;
  id: number;
  notEntered: "Belirtilmemiş";
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
  dateTimeNow = new Date();
  medicals: Medical[] | null = [];
  selectedNoteType: any = undefined;
  selectedNoteTypeForAdd: any = 1;
  selectionForAppointment: any = undefined;
  protocolDtoForNote: ProtocolDto;
  medicalForm: FormGroup;
  medical: Medical;
  collections: Collection[] | null = [];
  clickToAddNote: boolean = false;
  action: string = "add";
  dynamicFormArray:any;
  dynamicFormGroup:FormGroup;
  ngOnInit(): void {
    this.getParamValue();
    this.getMedicalAlertsById();
    this.getPatientById();
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
  getAppointmentsById() {
    this.appointmentService
      .getListByPatientId(this.patientDataId)
      .subscribe((data) => {
        this.appointments = data;
        console.log(this.appointments);
        setTimeout(() =>
          this.appointments[this.appointments.length - 1].appointmentNo &&
          this.appointments
            ? (this.selectionForAppointment = this.appointments[
                this.appointments.length - 1
              ].appointmentNo)
            : null
        );
        this.dataSource = new MatTableDataSource<AppointmentDto>(
          this.appointments
        );
        setTimeout(() => (this.dataSource.sort = this.sort));
        setTimeout(() => (this.dataSource.paginator = this.paginator));
      });
  }
  getProtocolsById(selected: number) {
    this.protocolService
      .getListByPatientId(this.patientDataId)
      .subscribe((data) => {
        this.protocols = data;
        this.protocols.sort((a, b) => b.protocolNo - a.protocolNo);
        console.log(this.protocols);
        setTimeout(() =>
          this.protocols.forEach((p) => {
            if (selected == 2) {
              this.getNotesByProtocolsId(p.protocolNo);
            } else {
              this.getCollectionsByProtocolsId(p.protocolNo);
            }
          })
        );
      });
  }
  getNotesByProtocolsId(protocolId: number) {
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
  addNoteForMedical(protocol: ProtocolDto) {
    this.select.selectedOptions.clear();
    this.select.options.find((m) => m.value == 2.1).selected = true;
    this.clickToAddNote = true;
    this.getProtocolsById(2);
    this.getAppointmentsById();
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
  deleteNoteForMedical(id) {
    for (let i = 0; i < this.medicals.length; i++) {
      if (this.medicals[i].id === id) {
        this.medicals.splice(i, 1);
      }
    }
    this.medicalService.delete(id).subscribe((m) => {
      this.medicalService._sweetAlert.delete("Not");
      this.getProtocolsById(2);
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
        this.patientService._sweetAlert.success("Hasta notu");
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
        this.patientService._sweetAlert.success("Hasta notu");
      }
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
          this.medicalService.save(this.medical).subscribe(
            (data) => {
              this.medicalService._sweetAlert.success("Muayene Notu");
              this.backToNote();
            },
            (error: HttpErrorResponse) => {
              this.patientService.isTblLoading = false;
              console.log(error.name + " " + error.message);
            }
          );
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
  onSelectionChange(event: MatSelectionListChange) {
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
  getFormOfTables(){
    this.formTableService.getAll().subscribe(table=>{
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
  onSubmitDynamicForm(){

  }
  createDynamicContactForm(): FormGroup {
    return this.fb.group({
    });
  }
  onOptionsSelectedForm(value: any) {
    this.selectedNoteTypeForAdd=value;
    console.log("the selected value is " + value);
    if(typeof value=="string"){
      this.dynamicFormGroup=this.createDynamicContactForm();
      let data=this.dynamicFormArray.find(m=>m.name==value);
      this.createFormControl(data);
    }
  }
  createFormControl(data:any){
    data.fields.forEach(element => {
      this.dynamicFormGroup.addControl(element.formControlName,new FormControl(''));
    });
    console.log(this.dynamicFormGroup);
  }
}

