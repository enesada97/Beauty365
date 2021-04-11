import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from 'src/app/authentication/page404/page404.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { AllPatientsComponent } from './all-patients/all-patients.component';
import { DetailPatientComponent } from './detail-patient/detail-patient/detail-patient.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { SearchPatientComponent } from './search-patient/search-patient.component';

const routes: Routes = [
  {
    path: 'all-patients',
    component: AllPatientsComponent,
  },
  {
    path: 'add-patient',
    component: AddPatientComponent,
  },
  {
    path: 'search-patient',
    component: SearchPatientComponent,
  },
  {
    path:"all-patients/patient-detail/:id",
    component:DetailPatientComponent
  },
  {
    path:"search-patient/patient-detail/:id",
    component:PatientDetailComponent
  },
  {
    path:"search-patient/edit-patient/:id",
    component:EditPatientComponent
  },
  {
    path:"all-patients/patient-detail/:id/edit-patient/:id",
    component:EditPatientComponent
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
