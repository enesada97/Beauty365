import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrudService } from '../../ceneric-service/crud-service';
import { LookUp } from '../../models/LookUp';
import { PasswordDto } from '../../models/passwordDto';
import { User } from '../../models/user';


@Injectable()
export class UserService extends CrudService<User, null, number> {
  constructor(protected httpClient: HttpClient) {
    super(httpClient, `${environment.apiUrl}/users/`);
  }
  getUserGroupPermissions(userId:number):Observable<LookUp[]>{
    return this.httpClient.get<LookUp[]>(environment.apiUrl + "/UserGroups/getusergroupbyuserid?id=" + userId);
  }

  getUserClaims(userId:number){
     return this.httpClient.get<LookUp[]>(environment.apiUrl + "/UserClaims/getoperationclaimbyuserid?id=" + userId);
  }

  saveUserClaims(userId:number,claims:number[] ):Observable<any> {

    var result = this.httpClient.put(environment.apiUrl + "/UserClaims/", {UserId:userId, ClaimId:claims }, { responseType: 'text' });
    return result;

  }

  saveUserGroupPermissions(userId:number, groups:number[]):Observable<any> {
    var result = this.httpClient.put(environment.apiUrl + "/UserGroups/", {UserId:userId, GroupId:groups }, { responseType: 'text' });
    return result;

  }

  saveUserPassword(command:PasswordDto):Observable<any>{
    var result = this.httpClient.put(environment.apiUrl + "/Auth/changeuserpassword", command, { responseType: 'text' });
    return result;
  }

}
