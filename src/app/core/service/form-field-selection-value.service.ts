import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SweetalertService } from './sweetalert.service';
import { FormFieldSelectionValue } from '../models/form-field-selection-value.model';
import { CrudService } from '../ceneric-service/crud-service';

@Injectable()
export class FormFieldSelectionValueService extends CrudService<FormFieldSelectionValue,null,number> {
  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient, `${environment.apiUrl}/formFieldSelectionValues/`);
  }
  getListByFormFieldId(formFieldId:number): Observable<FormFieldSelectionValue[]> {
    return this.httpClient.get<FormFieldSelectionValue[]>(
      environment.apiUrl + "/formFieldSelectionValues/getallbyformfieldid?id="+
      formFieldId
    );
  }
}

