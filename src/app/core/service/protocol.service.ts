import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CrudService } from "../ceneric-service/crud-service";
import { Protocol } from "../models/protocol.model";
import { ProtocolDto } from "../models/protocoldto";

@Injectable()
export class ProtocolService extends CrudService<Protocol,ProtocolDto,number> {
  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient, `${environment.apiUrl}/protocols/`);
  }
  getProtocolDtoListByPatientId(id:number): Observable<ProtocolDto[]> {
    return this.httpClient.get<ProtocolDto[]>(`${environment.apiUrl}/protocols/` + "getprotocoldtosbypatientid?id=" + id);
  }
}











