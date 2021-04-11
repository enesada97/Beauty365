import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrudService } from '../ceneric-service/crud-service';
import { FormField } from '../models/form-field.model';

@Injectable()
export class FormFieldService extends CrudService<FormField,null,number> {
  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient, `${environment.apiUrl}/formFields/`);
  }
  getListByFormTableId(formTableId:number): Observable<FormField[]> {
    return this.httpClient.get<FormField[]>(
      environment.apiUrl + "/FormFields/getallbyformtableid?id="+
      formTableId
    );
  }
}

