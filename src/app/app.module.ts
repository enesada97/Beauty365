import { NgModule } from "@angular/core";

import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";

import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./layout/header/header.component";
import { PageLoaderComponent } from "./layout/page-loader/page-loader.component";
import { SidebarComponent } from "./layout/sidebar/sidebar.component";
import { RightSidebarComponent } from "./layout/right-sidebar/right-sidebar.component";
import { AuthLayoutComponent } from "./layout/app-layout/auth-layout/auth-layout.component";
import { MainLayoutComponent } from "./layout/app-layout/main-layout/main-layout.component";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
} from "ngx-perfect-scrollbar";
import { ClickOutsideModule } from "ng-click-outside";
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import { AuthInterceptorService } from "./core/interceptor/auth-interceptor.service";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslationService } from './core/service/system-service/Translation.service';
import { JwtModule } from "@auth0/angular-jwt";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CookieService } from "ngx-cookie-service";
import { FirmService } from "./core/service/firm.service";

// i18 kullanıclak ise aşağıdaki metod aktif edilecek

//  export function HttpLoaderFactory(http: HttpClient) {
//
//    var asd=new TranslateHttpLoader(http, '../../../../assets/i18n/', '.json');
//    return asd;
//  }


export function tokenGetter() {
  return localStorage.getItem("token");
}
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageLoaderComponent,
    SidebarComponent,
    RightSidebarComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    PerfectScrollbarModule,
    ClickOutsideModule,

    // core & shared
    CoreModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
     TranslateModule.forRoot({
       loader:{
         provide:TranslateLoader,
         //useFactory:HttpLoaderFactory, //i18 kullanılacak ise useClass kapatılıp yukarıda bulunan HttpLoaderFactory ve bu satır aktif edilecek
         useClass:TranslationService,
         deps:[HttpClient]
       }

    })
  ],
  providers: [
  //   {
  //   provide: ErrorHandler,
  //   useClass: GlobalErrorHandler
  // },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    AuthInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    CookieService,
    FirmService
  ],
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
