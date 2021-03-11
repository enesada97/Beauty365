import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Department } from 'src/app/core/models/department.model';
import { DepartmentService } from 'src/app/core/service/department.service';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.sass']
})
export class DepartmentDetailComponent{
 
  constructor(
    private activatedRoute: ActivatedRoute,
    private departmentService: DepartmentService
  ) {}
  department:Department;
  notEntered:"Belirtilmemiş"
  

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getdepartmentById(params['id']);
    });
  }
  getdepartmentById(id) {
    this.departmentService.getById(id).subscribe(data=>{
      this.department=data;
      this.departmentService.isTblLoading=false;
    })
  }
}