import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrudService } from '../ceneric-service/crud-service';
import { ProtocolType } from '../models/protocoltype.model';

@Injectable()
export class ProtocoltypeService extends CrudService<ProtocolType,null,number> {
  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient, `${environment.apiUrl}/protocolTypes/`);
  }
}

