import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrudService } from '../crud/crud-service';
import { Institution } from '../models/institution.model';
import { SweetalertService } from './sweetalert.service';

@Injectable()
export class InstitutionService extends CrudService<Institution,null,number> {
  constructor(
    protected _http: HttpClient,
    public _sweetAlert: SweetalertService
  ) {
    super(_http, `${environment.apiUrl}/Institution`, _sweetAlert);
  }
}
