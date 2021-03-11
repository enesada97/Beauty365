import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrudService } from '../crud/crud-service';
import { FormTable } from '../models/form-table.model';
import { SweetalertService } from './sweetalert.service';

@Injectable()
export class FormTableService extends CrudService<FormTable,null,number> {
  constructor(
    protected _http: HttpClient,
    public _sweetAlert: SweetalertService
  ) {
    super(_http, `${environment.apiUrl}/FormTable`, _sweetAlert);
  }
}

