import { AddAppointmentListComponent } from './add-appointment-list/add-appointment-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from 'src/app/authentication/page404/page404.component';
import { AllAppointmentsComponent } from './all-appointments/all-appointments.component';

const routes: Routes = [
  {
    path: 'all-appointments',
    component: AllAppointmentsComponent,
  },
  {
    path: 'add-appointment-list',
    component: AddAppointmentListComponent,
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
