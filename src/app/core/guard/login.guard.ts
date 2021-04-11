import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../service/system-service/auth.service";
import { LocalStorageService } from "../service/system-service/local-storage.service";


@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {

    constructor(private router: Router, storageService: LocalStorageService, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        console.log(this.authService.loggedIn());
        if (this.authService.loggedIn()){
            return true;
        }
        this.router.navigate(['/authentication/signin']);
        return false;

    }


}
