import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrudService } from '../crud/crud-service';
import { Medical } from '../models/medical.model';
import { SweetalertService } from './sweetalert.service';

@Injectable()
export class MedicalService extends CrudService<Medical,null,number> {
  constructor(
    protected _http: HttpClient,
    public _sweetAlert: SweetalertService
  ) {
    super(_http, `${environment.apiUrl}/Medical`, _sweetAlert);
  }
  getByProtocolId(id): Observable<Medical> {
    return this._http.get<Medical>(
      environment.apiUrl + "/Medical/getByProtocolId/"+
      id
    );
  }
}
