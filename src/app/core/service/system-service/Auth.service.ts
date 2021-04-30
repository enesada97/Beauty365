import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginUser } from '../../models/login-user';
import { TokenModel } from '../../models/token-model';
import { SweetalertService } from '../sweetalert.service';
import { LocalStorageService } from './local-storage.service';
import { SharedService } from './shared.service';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userName: string;
  isLoggin: boolean;
  decodedToken: any;
  userToken: string;
  jwtHelper: JwtHelperService = new JwtHelperService();
  claims: string[];
  clickEventSubscription: Subscription;
  constructor(private sweetAlert:SweetalertService,private httpClient: HttpClient, private storageService: LocalStorageService, private router: Router,private sharedService:SharedService) {
    this.clickEventSubscription = this.sharedService.getChangeUserNameClickEvent().subscribe(() => {
      this.setUserName();
    });
    this.setClaims();
  }

  login(loginUser: LoginUser) {

    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json")
    var request=this.httpClient.post<TokenModel>(environment.apiUrl + "/Auth/login", loginUser, { headers: headers }).toPromise();
    this.httpClient.post<TokenModel>(environment.apiUrl + "/Auth/login", loginUser, { headers: headers }).subscribe(data => {


      if (data.success) {

        this.storageService.setToken(data.data.token);
        this.claims=data.data.claims;
        localStorage.setItem("claim",data.data.claims.toString());


         var decode = this.jwtHelper.decodeToken(this.storageService.getToken());


        var propUserName = Object.keys(decode).filter(x => x.endsWith("/name"))[0];
        this.userName = decode[propUserName];
        this.sharedService.sendChangeUserNameEvent();

        this.router.navigate(["/admin/dashboard/main"]);
      }
      else {
        this.sweetAlert.error(data.message);
      }

    }
    );
  }

  getUserName(): string {
    return this.userName;
  }
  setUserName() {
    this.userName = this.getUserName();
  }

  setClaims() {

    if ((this.claims == undefined || this.claims.length == 0) && this.storageService.getToken() != null && this.loggedIn() ) {

      this.httpClient.get<string[]>(environment.apiUrl + "/OperationClaims/getuserclaimsfromcache").subscribe(data => {
        this.claims =data;
      })


      var token = this.storageService.getToken();
      var decode = this.jwtHelper.decodeToken(token);

      var propUserName = Object.keys(decode).filter(x => x.endsWith("/name"))[0];
      this.userName = decode[propUserName];
      this.sharedService.sendChangeUserNameEvent();
    }
  }

  logOut() {
    ("Çıkış Yapıldı");
    this.storageService.removeToken();
    this.storageService.removeItem("lang");
    this.storageService.removeItem("claim");
    this.claims = [];
  }

  loggedIn(): boolean {

    let isExpired = this.jwtHelper.isTokenExpired(this.storageService.getToken());
    return !isExpired;
  }

  getCurrentUserId() {
    this.jwtHelper.decodeToken(this.storageService.getToken()).userId;
  }

  claimGuard(claim: string): boolean {
    if(this.claims.length==0){
      this.claims=localStorage.getItem("claim").split(',');
      console.log("a");
    }
    var check = this.claims.some(function (item) {
      return item == claim;
    })
    return check;
  }

}
