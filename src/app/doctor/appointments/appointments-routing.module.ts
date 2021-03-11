import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from 'src/app/authentication/page404/page404.component';
import { AllAppointmentsComponent } from 'src/app/doctor/appointments/all-appointments/all-appointments.component';
import { AppointmentsCalendarComponent } from './calendar/appointments-calendar/appointments-calendar.component';

const routes: Routes = [
  // {
  //   path: 'all-appointments',
  //   component: AllAppointmentsComponent,
  // },
  {
    path: 'all-appointments',
    component: AppointmentsCalendarComponent,
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
