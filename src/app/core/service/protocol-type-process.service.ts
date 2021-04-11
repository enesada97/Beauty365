import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ProtocolTypeProcess } from '../models/protocolTypeProcess.model';
import { ProtocolTypeProcessDto } from '../models/protocolTypeProcessDto.model';
import { CrudService } from '../ceneric-service/crud-service';
@Injectable()
export class ProtocolTypeProcessService extends CrudService<ProtocolTypeProcess,ProtocolTypeProcessDto,number> {
  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient, `${environment.apiUrl}/protocolTypeProcesses/`);
  }
  GetListForDefaultProcesses(protocolTypeId:number,doctorId:number): Observable<ProtocolTypeProcess[]> {
    return this.httpClient.get<ProtocolTypeProcess[]>(
      environment.apiUrl + "/protocolTypeProcesses/getdefaultdtos?protocolTypeId="+protocolTypeId+"&doctorId="+doctorId
    );
  }
}







