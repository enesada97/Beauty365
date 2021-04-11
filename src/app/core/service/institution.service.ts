import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrudService } from '../ceneric-service/crud-service';
import { Institution } from '../models/institution.model';

@Injectable()
export class InstitutionService extends CrudService<Institution,null,number> {
  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient, `${environment.apiUrl}/institutions/`);
  }
}
