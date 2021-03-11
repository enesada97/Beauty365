import { InstitueProcessSaveComponent } from './institue-process-save/institue-process-save.component';
import { AllProcessGroupComponent } from './all-process-group/all-process-group.component';
import { AllProcessesComponent } from './all-processes/all-processes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from 'src/app/authentication/page404/page404.component';

const routes: Routes = [
  {
    path: 'all-processes',
    component: AllProcessesComponent,
  },
  {
    path: 'all-process-groups',
    component: AllProcessGroupComponent,
  },
  {
    path: 'institue-process-save',
    component: InstitueProcessSaveComponent,
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessesRoutingModule { }
