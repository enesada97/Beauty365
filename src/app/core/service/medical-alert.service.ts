import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrudService } from '../ceneric-service/crud-service';
import { MedicalAlert } from '../models/medical-alert.mode';

@Injectable()
export class MedicalAlertService extends CrudService<MedicalAlert,null,number> {
  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient, `${environment.apiUrl}/medicalAlerts/`);
  }
  getListByPatientId(id): Observable<MedicalAlert[]> {
    return this.httpClient.get<MedicalAlert[]>(
      environment.apiUrl + "/medicalAlerts/getlistbypatientid?id="+
      id
    );
  }
}
