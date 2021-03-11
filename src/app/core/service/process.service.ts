import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CrudService } from "../crud/crud-service";
import { Process } from "../models/process.model";
import { SweetalertService } from "./sweetalert.service";

@Injectable()
export class ProcessService extends CrudService<Process,null, number> {
  constructor(
    protected _http: HttpClient,
    public _sweetAlert: SweetalertService
  ) {
    super(_http, `${environment.apiUrl}/Process`, _sweetAlert);
  }
  getProcessesForCategory(id): Observable<Process[]> {
    let newPath= `${environment.apiUrl}/Process/GetList`;
    if(id){ 
      newPath += "?processGroupId=" +id
    }
    return this._http.get<Process[]>(
      newPath + "/Process/GetList"
    );
  }
  getSearchedProcesses(id): Observable<Process[]> {
    return this._http.get<Process[]>(
      environment.apiUrl + "/Process/Search/"+
      id
    );
  }
}
