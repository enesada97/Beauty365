import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrudService } from '../crud/crud-service';
import { MedicalAlert } from '../models/medical-alert.mode';
import { SweetalertService } from './sweetalert.service';

@Injectable()
export class MedicalAlertService extends CrudService<MedicalAlert,null,number> {
  constructor(
    protected _http: HttpClient,
    public _sweetAlert: SweetalertService
  ) {
    super(_http, `${environment.apiUrl}/MedicalAlert`, _sweetAlert);
  }
  getListByPatientId(id): Observable<MedicalAlert[]> {
    return this._http.get<MedicalAlert[]>(
      environment.apiUrl + "/MedicalAlert/GetListByPatientId/"+
      id
    );
  }
}
