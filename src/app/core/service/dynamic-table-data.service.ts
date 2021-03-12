import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrudService } from '../crud/crud-service';
import { DynamicTableData } from '../models/dynamic-table-data.model';
import { SweetalertService } from './sweetalert.service';

@Injectable()
export class DynamicTableDataService extends CrudService<DynamicTableData,null,number> {
  constructor(
    protected _http: HttpClient,
    public _sweetAlert: SweetalertService
  ) {
    super(_http, `${environment.apiUrl}/DynamicTableData`, _sweetAlert);
  }
  getListByProtocolAndTableId(protocolId:number,formTableId:number): Observable<DynamicTableData[]> {
    return this._http.get<DynamicTableData[]>(
      environment.apiUrl + "/DynamicTableData/getListByProtocolAndTableId/"+
      protocolId+"/"+formTableId
    );
  }
}
