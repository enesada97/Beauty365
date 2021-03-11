import { Working } from './../models/working.model';
import { Injectable } from '@angular/core';
import { PatientForWorkingDto } from '../models/patient-for-working-dto.model';
import { CrudService } from '../crud/crud-service';
import { HttpClient } from '@angular/common/http';
import { SweetalertService } from './sweetalert.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { WorkingDto } from '../models/workingdto.model';

@Injectable()
export class WorkingService extends CrudService<Working,null,number> {
  constructor(
    protected _http: HttpClient,
    public _sweetAlert: SweetalertService
  ) {
    super(_http, `${environment.apiUrl}/Working`, _sweetAlert);
  }
  getDtoByProtocolId(id): Observable<PatientForWorkingDto> {
    return this._http.get<PatientForWorkingDto>(environment.apiUrl + '/Working/GetPatientData/' + id);
  }
  getDtoById(id): Observable<WorkingDto[]> {
    return this._http.get<WorkingDto[]>(environment.apiUrl + '/Working/GetDtoById/' + id);
  }
}
