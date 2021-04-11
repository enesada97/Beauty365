import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { Page500Component } from './page500/page500.component';
import { Page404Component } from './page404/page404.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { LockedComponent } from './locked/locked.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../core/service/system-service/auth.service';
import { HttpClient } from '@angular/common/http';
import { TranslationService } from '../core/service/system-service/Translation.service';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
  declarations: [
    Page500Component,
    Page404Component,
    SigninComponent,
    SignupComponent,
    LockedComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          //useFactory:layoutHttpLoaderFactory,
          useClass: TranslationService,
          deps: [HttpClient]
      }
  })
  ],
  providers:[AuthService,TranslateService,TranslationService]
})
export class AuthenticationModule {}
