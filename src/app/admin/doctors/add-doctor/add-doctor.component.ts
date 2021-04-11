import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Department } from 'src/app/core/models/department.model';
import { Doctor } from 'src/app/core/models/doctor.model';
import { DepartmentService } from 'src/app/core/service/department.service';
import { DepForDoctorsService } from 'src/app/core/service/depfordoctors.service';
import { SweetalertService } from 'src/app/core/service/sweetalert.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.sass'],
  providers:[DepartmentService]
})
export class AddDoctorComponent implements OnInit {
  doctor: Doctor;
  departments:Department[];
  doctorForm: FormGroup;
  constructor(private router:Router,private sweetAlert:SweetalertService,private fb: FormBuilder, private depForDoctorsService: DepForDoctorsService,private departmentService:DepartmentService) {
    this.doctorForm = this.fb.group({
      id: [0],
      identityNumber: ["", [Validators.required]],
      name: ["", [Validators.required]],
      surName: ["", [Validators.required]],
      speciality: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      departmentId: ["", [Validators.required]],
      eMail: [""],
      address: [""],
      licenceNumber: ["", [Validators.required]],
      status: [true]
    });
  }
  ngOnInit(): void {
      this.departmentService.getList().subscribe((data) => (this.departments = data));

  }
  public onSubmit(): void {
    if (this.doctorForm.valid) {
      console.log(this.doctorForm.value);
      this.doctor = Object.assign({}, this.doctorForm.value);
      this.depForDoctorsService.add(this.doctor).subscribe(data=>{
        this.router.navigateByUrl('/admin/doctors/all-doctors');
        this.sweetAlert.success(data.toString());
      })
    }
  }
}
