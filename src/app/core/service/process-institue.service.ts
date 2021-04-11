import { ProcessInstitueDto } from './../models/process-institue-dto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProcessInstitue } from '../models/process-institue.model';
import { CrudService } from '../ceneric-service/crud-service';
import { Observable } from 'rxjs';
@Injectable()
export class ProcessInstitueService extends CrudService<ProcessInstitue,ProcessInstitueDto,number> {
  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient, `${environment.apiUrl}/processInstitues/`);
  }
  getDtoListByInstitueId(institueId:number): Observable<ProcessInstitueDto[]> {
    return this.httpClient.get<ProcessInstitueDto[]>(`${environment.apiUrl}/processInstitues/` + "getdtosbyinstitueid?id=" + institueId);
  }
}
