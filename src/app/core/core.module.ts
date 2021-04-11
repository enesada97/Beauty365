import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightSidebarService } from './service/rightsidebar.service';
import { DynamicScriptLoaderService } from './service/dynamic-script-loader.service';
import { throwIfAlreadyLoaded } from './guard/module-import.guard';
import { SweetalertService } from './service/sweetalert.service';
import { AuthService } from './service/system-service/auth.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    RightSidebarService,
    AuthService,
    DynamicScriptLoaderService,
    SweetalertService
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
