import { ProcessInstitueDto } from './../models/process-institue-dto.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrudService } from '../crud/crud-service';
import { ProcessInstitue } from '../models/process-institue.model';
import { SweetalertService } from './sweetalert.service';

@Injectable()
export class ProcessInstitueService extends CrudService<ProcessInstitue,ProcessInstitueDto,number> {
  constructor(
    protected _http: HttpClient,
    public _sweetAlert: SweetalertService
  ) {
    super(_http, `${environment.apiUrl}/ProcessInstitue`, _sweetAlert);
  }
}
