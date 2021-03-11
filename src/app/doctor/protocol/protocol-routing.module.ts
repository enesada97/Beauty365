import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from 'src/app/authentication/page404/page404.component';
import { AppointmentProcessComponent } from './appointment-process/appointment-process.component';

const routes: Routes = [
  {
    path: 'appointment-process/:id',
    component: AppointmentProcessComponent,
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtocolRoutingModule { }
