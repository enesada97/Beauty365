import { Component } from '@angular/core';
import {
  Event,
  Router,
  NavigationStart,
  NavigationEnd,
} from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { PlatformLocation } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './core/service/system-service/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUrl: string;
  constructor(private authService: AuthService,private translate: TranslateService,public _router: Router, location: PlatformLocation, private spinner: NgxSpinnerService) {
    translate.setDefaultLang("en-US");
    translate.use("en-US");
    if (!this.authService.loggedIn()) {
      this.authService.logOut();
      this._router.navigateByUrl('/authentication/signin');
    }
    this._router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.spinner.show();
        // location.onPopState(() => {
        //   window.location.reload();
        // });
        this.currentUrl = routerEvent.url.substring(
          routerEvent.url.lastIndexOf('/') + 1
        );
      }
      if (routerEvent instanceof NavigationEnd) {
        this.spinner.hide();
      }
      window.scrollTo(0, 0);
    });
  }
  isLoggedIn(): boolean {
    return this.authService.loggedIn();
  }
}
