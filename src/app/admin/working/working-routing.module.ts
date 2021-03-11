import { WorkingProcessesComponent } from './working-processes/working-processes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from 'src/app/authentication/page404/page404.component';

const routes: Routes = [
  {
    path: 'working-processes/:id',
    component: WorkingProcessesComponent,
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkingRoutingModule { }
