import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from 'src/app/core/guard/login.guard';
import { GroupsComponent } from './groups/groups.component';
import { LanguageComponent } from './language/language.component';
import { LogComponent } from './log/log.component';
import { OperationClaimsComponent } from './operation-claims/operation-claims.component';
import { TranslateComponent } from './translate/translate.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    canActivate:[LoginGuard]
  },
  {
    path: 'logs',
    component: LogComponent,
    canActivate:[LoginGuard]
  },
  {
    path: 'groups',
    component: GroupsComponent,
    canActivate:[LoginGuard]
  },
  {
    path: 'translates',
    component: TranslateComponent,
    canActivate:[LoginGuard]
  },
  {
    path: 'all-operations',
    component: OperationClaimsComponent,
    canActivate:[LoginGuard]
  },
  {
    path: 'languages',
    component: LanguageComponent,
    canActivate:[LoginGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementsRoutingModule { }
