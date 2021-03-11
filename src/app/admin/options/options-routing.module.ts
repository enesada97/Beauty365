import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from 'src/app/authentication/page404/page404.component';
import { CreatableFormComponent } from './creatable-form/creatable-form.component';
import { OptionalSettingsComponent } from './optional-settings/optional-settings.component';
import { ProtocolTypeProcessesComponent } from './protocol-type-processes/protocol-type-processes.component';

const routes: Routes = [
  {
    path: 'all-protocol-type-processes',
    component: ProtocolTypeProcessesComponent,
  },
  {
    path: 'optional-settings',
    component: OptionalSettingsComponent,
  },
  {
    path: 'creatable-forms',
    component: CreatableFormComponent,
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OptionsRoutingModule { }
