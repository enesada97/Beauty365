import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginUser } from "src/app/core/models/login-user";
import { LookUp } from "src/app/core/models/LookUp";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { AuthService } from "src/app/core/service/system-service/auth.service";
import { TranslateService } from "@ngx-translate/core";
import { LocalStorageService } from "src/app/core/service/system-service/local-storage.service";
import { LookUpService } from "src/app/core/service/system-service/lookUp.service";
import { SweetalertService } from "src/app/core/service/sweetalert.service";
import { CookieService } from "ngx-cookie-service";
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent implements OnInit {
  username:string="";
  loginUser:LoginUser=new LoginUser();
  langugelookUp:LookUp[];
  remember:boolean=false;
  constructor(
    private auth:AuthService,
    private storageService:LocalStorageService,
    private lookupService:LookUpService,
    private httpClient:HttpClient,
    public translateService:TranslateService,
    private sweetAlertService:SweetalertService,
    private router:Router,
    private cookieService:CookieService
  ) {
    this.auth.loggedIn()?this.auth.logOut():null;
    if (this.cookieService.get('remember')!=undefined) {
      if (this.cookieService.get('remember')==="Yes") {
        this.loginUser.email=this.cookieService.get('email');
        this.loginUser.password=this.cookieService.get('password');
        this.loginUser.lang=this.cookieService.get('lang');
        this.remember=true;
        this.changeLang(this.loginUser.lang);
      }
    }
  }
  ngOnInit() {
    this.username=this.auth.userName;

    this.httpClient.get<LookUp[]>(environment.apiUrl +"/languages/getlookupwithcode").subscribe(data=>{
      this.langugelookUp=data;
    })

  }
  getUserName(){
    return this.username;
  }

  login(){
    this.auth.login(this.loginUser);
    if(this.remember){
      this.cookieService.set('remember','Yes');
      this.cookieService.set('email',this.loginUser.email);
      this.cookieService.set('password',this.loginUser.password);
       this.cookieService.set('lang',this.loginUser.lang);
    }else{
      this.cookieService.set('remember','No');
      this.cookieService.set('email',"");
      this.cookieService.set('password',null);
       this.cookieService.set('lang',"");
    }
  }

  logOut(){
      this.storageService.removeToken();
      this.storageService.removeItem("lang");
  }

  changeLang(lang){
    localStorage.setItem("lang",lang);
    this.translateService.use(lang);
  }
}
