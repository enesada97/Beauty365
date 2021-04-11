import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Department } from 'src/app/core/models/department.model';
import { Doctor } from 'src/app/core/models/doctor.model';
import { DepartmentService } from 'src/app/core/service/department.service';
import { DepForDoctorsService } from 'src/app/core/service/depfordoctors.service';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.sass']
})
export class DoctorDetailComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private depForDoctorsService: DepForDoctorsService,
    private departmentService: DepartmentService
  ) {}
  doctor:Doctor;
  department:Department;
  notEntered:"Belirtilmemiş"


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getDoctorById(params['id']);
    });


  }
  getDoctorById(id) {
    this.depForDoctorsService.getById(id).subscribe(data => {
      this.doctor = data;
      this.getDepartment(this.doctor.departmentId)
    });
  }
   getDepartment(id){
     this.departmentService.getById(id).subscribe((data) => (this.department = data));
   }
}
