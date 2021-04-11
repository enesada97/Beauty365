import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrudService } from '../ceneric-service/crud-service';
import { Medical } from '../models/medical.model';

@Injectable()
export class MedicalService extends CrudService<Medical,null,number> {
  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient, `${environment.apiUrl}/medicals/`);
  }
  getByProtocolId(id): Observable<Medical> {
    return this.httpClient.get<Medical>(
      environment.apiUrl + "/medicals/getbyid?="+
      id
    );
  }
}
