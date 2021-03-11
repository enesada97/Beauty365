import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from 'src/app/authentication/page404/page404.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { AllDoctorsComponent } from './all-doctors/all-doctors.component';
import { DoctorDetailComponent } from './doctor-detail/doctor-detail.component';
import { EditDoctorComponent } from './edit-doctor/edit-doctor.component';

const routes: Routes = [
  {
    path: 'all-doctors',
    component: AllDoctorsComponent,
  },
  {
    path: 'add-doctor',
    component: AddDoctorComponent,
  },
  {
    path:"all-doctors/doctor-detail/:id",
    component:DoctorDetailComponent
  },
  {
    path:"all-doctors/doctor-detail/:id/edit-doctor/:id",
    component:EditDoctorComponent
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsRoutingModule { }
