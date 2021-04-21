import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { OptionalSettingService } from 'src/app/core/service/optional-setting.service';
import { PatientService } from 'src/app/core/service/patient.service';
import { ProtocoltypeService } from 'src/app/core/service/protocoltype.service';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-appointment-dialog',
  templateUrl: './add-appointment-dialog.component.html',
  styleUrls: ['./add-appointment-dialog.component.sass'],
  providers: [
    ProtocoltypeService,
    AppointmentService,
    DepartmentService,
    DepForDoctorsService,
    PatientService,
    OptionalSettingService
  ],
})
export class AddAppointmentDialogComponent implements OnInit{
  action: string;
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
  optionalSettingForCreatePatient:OptionalSetting;
  constructor(
    public dialogRef: MatDialogRef<AddAppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private protocolTypeService: ProtocoltypeService,
    private appointmentService: AppointmentService,
    private departmentService: DepartmentService,
    private depForDoctorsService: DepForDoctorsService,
    private patientService:PatientService,
    private fb: FormBuilder,
    private dateAdapter: DateAdapter<any>,
    private optionalSettingService:OptionalSettingService,
    private sweetAlert:SweetalertService
  ) {
    this.dateAdapter.setLocale("tr");
    this.action = data.action;
    if (this.action === "edit") {
      this.appointment = data.appointment;
    }else {
      this.optionalSetting=data.optionalSetting;
      this.appointment = new Appointment({});
      this.appointment.protocolId=0;
      this.appointment.createdAppointmentDateTime=new Date();
      // this.appointment.arriveDateTime=new Date();
      // this.appointment.inspectionEndDateTime=new Date();
      // this.appointment.inspectionStartDateTime=new Date();
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
    getOptionalSetting(){
      this.optionalSettingService.getById(1).subscribe(data=>{
        this.optionalSettingForCreatePatient=data;
      })
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
    this.getOptionalSetting();
    if(this.action=="edit"){
      this.departmentService
      .getById(this.appointment.departmentId)
      .subscribe((data) => (this.department = data));
    this.depForDoctorsService.getById(this.appointment.doctorId).subscribe((data) => (this.doctor = data));
    }else{
      this.departmentService
      .getList()
      .subscribe((data) => {this.departments = data;
        if(this.departments[0]){
      this.appointmentForm.controls['departmentId'].setValue(this.departments[0].id);
      this.depForDoctorsService.getDoctorListByDepId(this.departments[0].id).subscribe(m=>{
        this.doctors=m;
        if(this.doctors[0]){
          this.appointmentForm.controls['doctorId'].setValue(this.doctors[0].id);
            }});
        }});
        this.protocolTypeService
      .getList()
      .subscribe((data) => {this.protocolTypes = data;
        if(this.protocolTypes[0]){
      this.appointmentForm.controls['protocolTypeId'].setValue(this.protocolTypes[0].id);
        }});
    }
    this.protocolTypeService
      .getList()
      .subscribe((data) => (this.protocolTypes = data));
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
}

  submit() {
    if (this.appointmentForm.valid) {
      this.appointment = Object.assign({}, this.appointmentForm.value);
      //Hasta kontrol
      this.patient=new Patient({});
      this.patient.phoneNumber=this.appointment.phoneNumber;
      this.patient.identityNumber=this.appointment.identityNumber;
      if(this.appointment.id==0){
        this.patientService.getSearchedPatients(this.patient).subscribe(res=>{
          if(res&&res.length){
            //Hasta varsa alert telefon numarası bu olan hasta var randevuyu mu buna açmak istersiniz ?
            const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
              },
              buttonsStyling: false,
            });
            swalWithBootstrapButtons
              .fire({
                title: "Bu telefon numarası ile zaten kayıtlı bir hasta bulundu,randevu bu hasta üzerine eklensin mi?",
                showClass: {
                  popup: "animate__animated animate__fadeInDown",
                },
                hideClass: {
                  popup: "animate__animated animate__fadeOutUp",
                },
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Evet ",
                cancelButtonText: " Hayır",
                reverseButtons: true,
              })
              .then((result) => {
                if (result.isConfirmed) {
                  this.patient=res[0];
                  this.appointment.patientDataId=this.patient.id;
                  console.log("Hasta kaydı var");
                  this.appointmentService.add(this.appointment).subscribe(data=>{
                    this.dialogRef.close(1);
                    });
                  swalWithBootstrapButtons.fire("Varolan hasta için randevu eklendi", "", "success");
                }else{
                  this.appointment.patientDataId=0;
                  this.appointmentService.add(this.appointment).subscribe(data=>{
                    this.dialogRef.close(1);
                    this.sweetAlert.success(data);
                    });
                }
              });
          }else{
            if(this.optionalSettingForCreatePatient.isOpen==true){
              this.patient.name=this.appointment.name;
              this.patient.surName=this.appointment.surName;
              this.patient.phoneNumber=this.appointment.phoneNumber;
              this.patient.identityNumber=this.appointment.identityNumber;
              this.patientService.add(this.patient).subscribe(p=>{
                this.patient=JSON.parse(p).data;
                this.appointment.patientDataId=this.patient.id;
                this.appointmentService.add(this.appointment).subscribe(data=>{
                  this.dialogRef.close(1);
                  this.sweetAlert.success(data);
                  }
                  );
              });
            }else{
              this.appointment.patientDataId=0;
                this.appointmentService.add(this.appointment).subscribe(data=>{
                  this.dialogRef.close(1);
                  this.sweetAlert.success(data);
                  });
              }
            }
          }
        );
      }else{
        if (this.appointment.patientDataId!=0) {
          this.appointmentService.update(this.appointment).subscribe(data=>{
            this.dialogRef.close(1);
            this.sweetAlert.success(data);
            });
        } else {
          this.patientService.getSearchedPatients(this.patient).subscribe(res=>{
            if(res&&res.length){
              //Hasta varsa alert telefon numarası bu olan hasta var randevuyu mu buna açmak istersiniz ?
              const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: "btn btn-success",
                  cancelButton: "btn btn-danger",
                },
                buttonsStyling: false,
              });
              swalWithBootstrapButtons
                .fire({
                  title: "Bu telefon numarası ile zaten kayıtlı bir hasta bulundu,randevu bu hasta üzerine güncellensin mi?",
                  showClass: {
                    popup: "animate__animated animate__fadeInDown",
                  },
                  hideClass: {
                    popup: "animate__animated animate__fadeOutUp",
                  },
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Evet ",
                  cancelButtonText: " Hayır",
                  reverseButtons: true,
                })
                .then((result) => {
                  if (result.isConfirmed) {
                    this.patient=res[0];
                    this.appointment.patientDataId=this.patient.id;
                    console.log("Hasta kaydı var");
                    this.appointmentService.update(this.appointment).subscribe(data=>{
                      this.dialogRef.close(1);
                      });
                    swalWithBootstrapButtons.fire("Varolan hasta için randevu güncellendi", "", "success");
                  }else{
                    this.appointment.patientDataId=0;
                    this.appointmentService.update(this.appointment).subscribe(data=>{
                      this.dialogRef.close(1);
                      this.sweetAlert.success(data);
                      });
                  }
                });
            }else{
              if(this.optionalSettingForCreatePatient.isOpen==true){
                this.patient.name=this.appointment.name;
                this.patient.surName=this.appointment.surName;
                this.patient.phoneNumber=this.appointment.phoneNumber;
                this.patient.identityNumber=this.appointment.identityNumber;
                this.patientService.add(this.patient).subscribe(p=>{
                  this.patient=JSON.parse(p).data;
                  this.appointment.patientDataId=this.patient.id;
                  this.appointmentService.update(this.appointment).subscribe(data=>{
                    this.dialogRef.close(1);
                    this.sweetAlert.success(data);
                    }
                    );
                });
              }else{
                  this.appointmentService.update(this.appointment).subscribe(data=>{
                    this.dialogRef.close(1);
                    this.sweetAlert.success(data);
                    });
                }
              }
            }
          );
        }

      }
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSearchSubmit(): void {
    this.patient = Object.assign({}, this.patientForm.value);
    this.patient.identityNumber==null?this.patient.identityNumber=0:null;
    this.patient.phoneNumber==null?this.patient.phoneNumber=0:null;
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
