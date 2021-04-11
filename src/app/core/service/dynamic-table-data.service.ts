import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrudService } from '../ceneric-service/crud-service';
import { DynamicTableData } from '../models/dynamic-table-data.model';

@Injectable()
export class DynamicTableDataService extends CrudService<DynamicTableData,null,number> {
  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient, `${environment.apiUrl}/dynamicTableDatas/`);
  }
  getListByProtocolId(protocolId:number): Observable<DynamicTableData[]> {
    return this.httpClient.get<DynamicTableData[]>(
      environment.apiUrl + "/dynamicTableDatas/getlistbyprotocolId?id="+
      protocolId
    );
  }
}
