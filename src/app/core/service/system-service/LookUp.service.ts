import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LookUp } from '../../models/LookUp';


@Injectable({
  providedIn: 'root'
})
export class LookUpService {

  constructor(private httpClient: HttpClient) { }

  getGroupLookUp(): Observable<LookUp[]> {

    return this.httpClient.get<LookUp[]>(environment.apiUrl + "/Groups/getgrouplookup")
  }

  getOperationClaimLookUp(): Observable<LookUp[]> {

    return this.httpClient.get<LookUp[]>(environment.apiUrl + "/OperationClaims/getoperationclaimlookup")
  }

  getUserLookUp():Observable<LookUp[]>{
    return this.httpClient.get<LookUp[]>(environment.apiUrl + "/Users/getuserlookup")
  }

  getLanguageLookup():Observable<LookUp[]>{
    return this.httpClient.get<LookUp[]>(environment.apiUrl + "/Languages/getlookup")
  }

}
