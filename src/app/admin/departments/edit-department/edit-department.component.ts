import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Department } from 'src/app/core/models/department.model';
import { DepartmentService } from 'src/app/core/service/department.service';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.sass']
})
export class EditDepartmentComponent{
  departmentForm: FormGroup;
  formdata;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private departmentService: DepartmentService
  ) {}
  department: Department;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getDepartmentById(params["id"]);
    });
  }
  getDepartmentById(id) {
    this.departmentService.getById(id).subscribe((data) => {
      this.formdata = data;
      this.department = this.formdata;
      this.departmentForm = this.createContactForm();
    });
  }
  public onSubmit(): void {
    if (this.departmentForm.valid) {
      console.log(this.departmentForm.value);
      this.department = Object.assign({}, this.departmentForm.value);
      console.log(this.department);
      // this.patient.userId=this.authService.getCurrentUserId();
      this.departmentService.save(this.department).subscribe(data=>{
        this.departmentService.isTblLoading=false;
        this.departmentService._sweetAlert.success(data['name']);
        },
        (error: HttpErrorResponse) => {
          this.departmentService.isTblLoading = false;
          console.log(error.name + " " + error.message);
        }
        );
    }
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.department.id],
      departmentName: [this.department.departmentName, [Validators.required]],
      status: [this.department.status]
    });
  }
}