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
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent implements OnInit {
  username:string="";
  loginUser:LoginUser=new LoginUser();
  langugelookUp:LookUp[];
  constructor(
    private auth:AuthService,
    private storageService:LocalStorageService,
    private lookupService:LookUpService,
    private httpClient:HttpClient,
    public translateService:TranslateService,
  ) {}
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
  }

  logOut(){
      this.storageService.removeToken();
      this.storageService.removeItem("lang");
  }

  changeLang(lang){
    console.log(lang);
    localStorage.setItem("lang",lang);
    this.translateService.use(lang);
  }
}
