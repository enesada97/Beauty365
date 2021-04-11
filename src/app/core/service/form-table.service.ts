import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrudService } from '../ceneric-service/crud-service';
import { FormTable } from '../models/form-table.model';

@Injectable()
export class FormTableService extends CrudService<FormTable,null,number> {
  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient, `${environment.apiUrl}/formTables/`);
  }
}

