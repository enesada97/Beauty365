import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementsRoutingModule } from './managements-routing.module';
import { OperationClaimsComponent } from './operation-claims/operation-claims.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskModule } from 'ngx-mask';
import { TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslationService } from 'src/app/core/service/system-service/Translation.service';
import { LanguageComponent } from './language/language.component';
import { LanguageDeleteComponent } from './language/language-dialog/language-delete/language-delete.component';
import { LanguageSaveComponent } from './language/language-dialog/language-save/language-save.component';
import { TranslateComponent } from './translate/translate.component';
import { TranslateSaveComponent } from './translate/translate-dialog/translate-save/translate-save.component';
import { TranslateDeleteComponent } from './translate/translate-dialog/translate-delete/translate-delete.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupSaveComponent } from './groups/group-dialog/group-save/group-save.component';
import { GroupDeleteComponent } from './groups/group-dialog/group-delete/group-delete.component';
import { UsersComponent } from './users/users.component';
import { LogComponent } from './log/log.component';
import { OperationClaimSaveComponent } from './operation-claims/operation-claims-dialog/operation-claim-save/operation-claim-save.component';
import { GroupClaimComponent } from './groups/group-dialog/group-claim/group-claim.component';
import { GroupUsersComponent } from './groups/group-dialog/group-users/group-users.component';
import { UserSaveComponent } from './users/user-dialog/user-save/user-save.component';
import { UserDeleteComponent } from './users/user-dialog/user-delete/user-delete.component';
import { UserClaimComponent } from './users/user-dialog/user-claim/user-claim.component';
import { UserGroupsComponent } from './users/user-dialog/user-groups/user-groups.component';
import { UserPasswordComponent } from './users/user-dialog/user-password/user-password.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { GroupService } from 'src/app/core/service/system-service/group.service';
import { LogDtoService } from 'src/app/core/service/system-service/logdto.service';
import { OperationClaimService } from 'src/app/core/service/system-service/operationclaim.service';
import { UserService } from 'src/app/core/service/system-service/user.service';
import { LanguageService } from 'src/app/core/service/system-service/language.service';
import { TranslateService } from 'src/app/core/service/system-service/translate.service';
// export function layoutHttpLoaderFactory(http: HttpClient) {
//
//   return new TranslateHttpLoader(http,'../../../../../../assets/i18n/','.json');
// }

@NgModule({
  declarations: [OperationClaimsComponent, LanguageComponent, LanguageDeleteComponent, LanguageSaveComponent, TranslateComponent, TranslateSaveComponent, TranslateDeleteComponent, GroupsComponent, GroupSaveComponent, GroupDeleteComponent, UsersComponent, LogComponent, OperationClaimSaveComponent, GroupClaimComponent, GroupUsersComponent, UserSaveComponent, UserDeleteComponent, UserClaimComponent, UserGroupsComponent, UserPasswordComponent],
  imports: [
    CommonModule,
    ManagementsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatSelectModule,
    MatRadioModule,
    MatMenuModule,
    MatCheckboxModule,
    MaterialFileInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    NgMultiSelectDropDownModule,
    NgxMaskModule,
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          //useFactory:layoutHttpLoaderFactory,
          useClass: TranslationService,
          deps: [HttpClient]
      }
  })
  ],
  providers:[GroupService,LogDtoService,OperationClaimService,UserService,LanguageService,TranslateService]
})
export class ManagementsModule { }
