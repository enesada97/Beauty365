import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Appointment } from 'src/app/core/models/appointment.model';
import { AppointmentDto } from 'src/app/core/models/appointmentdto.model';
import { Department } from 'src/app/core/models/department.model';
import { Doctor } from 'src/app/core/models/doctor.model';
import { OptionalSetting } from 'src/app/core/models/optional-setting.model';
import { Patient } from 'src/app/core/models/patient.model';
import { ProtocolType } from 'src/app/core/models/protocoltype.model';
import { AppointmentService } from 'src/app/core/service/appointment.service';
import { DepartmentService } from 'src/app/core/service/department.service';
import { DepForDoctorsService } from 'src/app/core/service/depfordoctors.service';
import { PatientService } from 'src/app/core/service/patient.service';
import { ProtocoltypeService } from 'src/app/core/service/protocoltype.service';

@Component({
  selector: 'app-add-appointment-dialog',
  templateUrl: './add-appointment-dialog.component.html',
  styleUrls: ['./add-appointment-dialog.component.sass'],
  providers: [
    ProtocoltypeService,
    AppointmentService,
    DepartmentService,
    DepForDoctorsService,
    PatientService
  ],
})
export class AddAppointmentDialogComponent implements OnInit{
  action: string;
  dialogTitle: string;
  appointmentForm: FormGroup;
  appointment: Appointment;
  optionalSetting:OptionalSetting;
  protocolTypes: ProtocolType[];
  department: Department;
  departments: Department[];
  doctor: Doctor;
  doctors: Doctor[];
  appointmentDto:AppointmentDto;
  panelOpenState: boolean = false;
  searchedPatients: Patient[];
  displayedColumns: string[] = ['name', 'surName', 'identityNumber', 'phoneNumber','actions'];
  patient: Patient;
  patientForm: FormGroup;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  dataSource: MatTableDataSource<Patient>;
  id: any;
  constructor(
    public dialogRef: MatDialogRef<AddAppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private protocolTypeService: ProtocoltypeService,
    private appointmentService: AppointmentService,
    private departmentService: DepartmentService,
    private depForDoctorsService: DepForDoctorsService,
    private patientService:PatientService,
    private fb: FormBuilder,
    private dateAdapter: DateAdapter<any>
  ) {
    this.dateAdapter.setLocale("tr");
    this.action = data.action;
    if (this.action === "edit") {
      this.appointment = data.appointment;
    }else {
      this.optionalSetting=data.optionalSetting;
      this.dialogTitle = 'Yeni Randevu';
      this.appointment = new Appointment({});
      this.appointment.protocolId=0;
      this.appointment.arriveDateTime=new Date();
      this.appointment.inspectionEndDateTime=new Date();
      this.appointment.inspectionStartDateTime=new Date();
    }
    this.appointmentForm = this.createContactForm();
    this.patientForm = this.createContactFormForSearch();
    }
    createContactForm(): FormGroup {
      return this.fb.group({
        id: [this.appointment.id],
        doctorId: [this.appointment.doctorId],
        departmentId: [this.appointment.departmentId],
        protocolId: [this.appointment.protocolId],
        arriveDateTime: [this.appointment.arriveDateTime],
        inspectionStartDateTime: [this.appointment.inspectionStartDateTime],
        inspectionEndDateTime: [this.appointment.inspectionEndDateTime],
        date:[this.appointment.date],
        patientDataId: [this.appointment.patientDataId],
        time:[this.appointment.time],
        name:[this.appointment.name],
        surName:[this.appointment.surName],
        phoneNumber:[this.appointment.phoneNumber],
        description:[this.appointment.description],
        identityNumber:[this.appointment.identityNumber],
        protocolTypeId: [this.appointment.protocolTypeId, [Validators.required]],
        createdAppointmentDateTime: [this.appointment.createdAppointmentDateTime],
        patientHasArrive:[this.appointment.patientHasArrive],
        status: [this.appointment.status],
      });
    }
    createContactFormForSearch(): FormGroup {
      return this.fb.group({
       identityNumber:[null],
       name: [null],
       surName: [null],
       phoneNumber:[null]
      });
    }
    onOptionsSelected(value: any) {
      console.log("the selected value is " + value);
      this.depForDoctorsService
        .getDoctorListByDepId(value)
        .subscribe((data) => (this.doctors = data));
    }
  ngOnInit(): void {
    if(this.action=="edit"){
      this.departmentService
      .getById(this.appointment.departmentId)
      .subscribe((data) => (this.department = data));
    this.depForDoctorsService.getDoctorById(this.appointment.doctorId).subscribe((data) => (this.doctor = data));
    }else{
      this.departmentService
      .getAll()
      .subscribe((data) => (this.departments = data));
    }
    this.protocolTypeService
      .getAllProtocolTypesForAny()
      .subscribe((data) => (this.protocolTypes = data));
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
}
  formControl = new FormControl("", [
    Validators.required,
    // Validators.email,
  ]);

  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    if (this.appointmentForm.valid) {
      this.appointment = Object.assign({}, this.appointmentForm.value);
      this.appointment.createdAppointmentDateTime = new Date();
      // this.patient.userId=this.authService.getCurrentUserId();
      //Hasta kontrol
      this.patient=new Patient({});
      this.patient.phoneNumber=this.appointment.phoneNumber;
      this.patient.identityNumber=this.appointment.identityNumber;
      this.patientService.getSearchedPatients(this.patient).subscribe(res=>{
        if(res.length){
          console.log("Hasta kaydı var");
        }else{
          this.patient.name=this.appointment.name;
          this.patient.surName=this.appointment.surName;
          this.patientService.save(this.patient).subscribe(p=>{
            console.log(p);
          });
        }
      },
      (error: HttpErrorResponse) => {
        this.patient.name=this.appointment.name;
          this.patient.surName=this.appointment.surName;
          this.patientService.save(this.patient).subscribe(pa=>{
            console.log(pa);
          });
      },
      )
      this.appointmentService.save(this.appointment).subscribe(data=>{
        console.log(this.appointment);
        this.patientService._sweetAlert.success(data['date'].toLocaleString() + "tarihli randevu");
        },
        (error: HttpErrorResponse) => {
          this.patientService.isTblLoading = false;
          console.log(error.name + " " + error.message);
        }
        );
    }
  }
  onSearchSubmit(): void {
    this.patient = Object.assign({}, this.patientForm.value);
    // this.patient.userId=this.authService.getCurrentUserId();
    this.patientService.getSearchedPatients(this.patient).subscribe(data=>{
      this.searchedPatients=data;
      this.dataSource = new MatTableDataSource<Patient>(
        this.searchedPatients
      );
      setTimeout(() => (this.dataSource.sort = this.sort));
      setTimeout(() => (this.dataSource.paginator = this.paginator));
    })
  }
  addAppointmentForSearch(row:Patient){
    this.appointmentForm.controls['patientDataId'].setValue(row.id);
    this.appointmentForm.controls['name'].setValue(row.name);
    this.appointmentForm.controls['surName'].setValue(row.surName);
    this.appointmentForm.controls['phoneNumber'].setValue(row.phoneNumber);
    this.appointmentForm.controls['identityNumber'].setValue(row.identityNumber);
    this.panelOpenState = false;
  }
  openPanel(){
    this.panelOpenState = true;
  }
}
