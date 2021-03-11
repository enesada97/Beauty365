import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrudService } from '../crud/crud-service';
import { SweetalertService } from './sweetalert.service';
import { FormFieldSelectionValue } from '../models/form-field-selection-value.model';

@Injectable()
export class FormFieldSelectionValueService extends CrudService<FormFieldSelectionValue,null,number> {
  constructor(
    protected _http: HttpClient,
    public _sweetAlert: SweetalertService
  ) {
    super(_http, `${environment.apiUrl}/FormFieldSelectionValue`, _sweetAlert);
  }
  getListByFormFieldId(formFieldId:number): Observable<FormFieldSelectionValue[]> {
    return this._http.get<FormFieldSelectionValue[]>(
      environment.apiUrl + "/FormFieldSelectionValue/getListByFormFieldId/"+
      formFieldId
    );
  }
}

