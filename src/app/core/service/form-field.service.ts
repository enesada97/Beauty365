import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrudService } from '../crud/crud-service';
import { FormField } from '../models/form-field.model';
import { SweetalertService } from './sweetalert.service';

@Injectable()
export class FormFieldService extends CrudService<FormField,null,number> {
  constructor(
    protected _http: HttpClient,
    public _sweetAlert: SweetalertService
  ) {
    super(_http, `${environment.apiUrl}/FormField`, _sweetAlert);
  }
  getListByFormTableId(formTableId:number): Observable<FormField[]> {
    return this._http.get<FormField[]>(
      environment.apiUrl + "/FormField/getListByFormTableId/"+
      formTableId
    );
  }
}

