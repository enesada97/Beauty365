import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from 'src/app/authentication/page404/page404.component';
import { AllDepartmentsComponent } from './all-departments/all-departments.component';
import { DepartmentDetailComponent } from './department-detail/department-detail.component';
import { EditDepartmentComponent } from './edit-department/edit-department.component';

const routes: Routes = [
  {
    path: 'all-departments',
    component: AllDepartmentsComponent,
  },
  {
    path:"all-departments/department-detail/:id",
    component:DepartmentDetailComponent
  },
  {
    path:"all-departments/department-detail/:id/edit-department/:id",
    component:EditDepartmentComponent
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
