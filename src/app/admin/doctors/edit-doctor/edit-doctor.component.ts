import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/core/models/department.model';
import { Doctor } from 'src/app/core/models/doctor.model';
import { DepartmentService } from 'src/app/core/service/department.service';
import { DepForDoctorsService } from 'src/app/core/service/depfordoctors.service';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.sass']
})
export class EditDoctorComponent implements OnInit {
  doctorForm: FormGroup;
  doctor: Doctor;
  departments:Department[];
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private depForDoctorsService: DepForDoctorsService,
    private departmentService:DepartmentService,
    private sweetAlert:SweetalertService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getDoctorById(params["id"]);
    });
    this.departmentService.getList().subscribe((data) => (this.departments = data));
  }
  getDoctorById(id) {
    this.depForDoctorsService.getById(id).subscribe((data) => {
      this.doctor = data;
      this.doctorForm = this.createContactForm();
    });
  }
  public onSubmit(): void {
    if (this.doctorForm.valid) {
      this.doctor = Object.assign({}, this.doctorForm.value);
      this.depForDoctorsService.update(this.doctor).subscribe(data=>{
        this.router.navigateByUrl('/admin/doctors/doctor-detail/'+data.doctor.id);
        this.sweetAlert.info(data.toString());
      })
    }
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.doctor.id],
      identityNumber: [this.doctor.identityNumber, [Validators.required]],
      name: [this.doctor.name, [Validators.required]],
      surName: [this.doctor.surName, [Validators.required]],
      status: [this.doctor.status],
      speciality: [this.doctor.speciality, [Validators.required]],
      departmentId: [this.doctor.departmentId, [Validators.required]],
      phone: [this.doctor.phone, [Validators.required]],
      eMail: [this.doctor.eMail],
      address: [this.doctor.address],
      licenceNumber: [this.doctor.licenceNumber],
    });
  }
}
