import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { SweetalertService } from "./sweetalert.service";
import { CrudService } from "../crud/crud-service";
import { Observable } from 'rxjs';
import { ProtocolTypeProcess } from '../models/protocolTypeProcess.model';
import { ProtocolTypeProcessDto } from '../models/protocolTypeProcessDto.model';
@Injectable()
export class ProtocolTypeProcessService extends CrudService<ProtocolTypeProcess,ProtocolTypeProcessDto, number> {
  constructor(
    protected _http: HttpClient,
    public _sweetAlert: SweetalertService,
    private router:Router
  ) {
    super(_http, `${environment.apiUrl}/ProtocolTypeProcess`, _sweetAlert);
  }
  GetListForDefaultProcesses(protocolTypeId:number,doctorId:number): Observable<ProtocolTypeProcess[]> {
    return this._http.get<ProtocolTypeProcess[]>(
      environment.apiUrl + "/ProtocolTypeProcess/GetListForDefaultProcesses/"+
      protocolTypeId + "/" +doctorId
    );
  }
}







