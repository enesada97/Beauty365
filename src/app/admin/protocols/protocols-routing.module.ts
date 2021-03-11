import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from 'src/app/authentication/page404/page404.component';
import { AllProtocolsComponent } from './all-protocols/all-protocols.component';
import { AllProtocoltypesComponent } from './all-protocoltypes/all-protocoltypes.component';

const routes: Routes = [
  {
    path: 'all-protocols',
    component: AllProtocolsComponent,
  },
  {
    path: 'all-protocoltypes',
    component: AllProtocoltypesComponent,
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtocolsRoutingModule { }
