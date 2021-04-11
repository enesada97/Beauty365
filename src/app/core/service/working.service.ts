import { Working } from './../models/working.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CrudService } from '../ceneric-service/crud-service';
import { PatientForWorkingDto } from '../models/patient-for-working-dto.model';
import { Observable } from 'rxjs';
import { WorkingDto } from '../models/workingdto.model';
import { ProcessDtoForWorking } from '../models/process-dto-for-working.model';

@Injectable()
export class WorkingService extends CrudService<Working,null,number> {
  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient, `${environment.apiUrl}/workings/`);
  }
  getPatientForWorkingDtoByProtocolId(id:number): Observable<PatientForWorkingDto> {
    return this.httpClient.get<PatientForWorkingDto>(`${environment.apiUrl}/workings/` + "GetPatientData/" + id);
  }
  getWorkingDtoListByProtocolId(id:number): Observable<WorkingDto[]> {
    return this.httpClient.get<WorkingDto[]>(`${environment.apiUrl}/workings/` + "getworkingdtosbyprotocolid/" + id);
  }
  getProcessForWorkingDtoListByProtocolId(id:number): Observable<ProcessDtoForWorking[]> {
    return this.httpClient.get<ProcessDtoForWorking[]>(`${environment.apiUrl}/workings/` + "getprocessforworkingdtosbyprotocolid/" + id);
  }
}
