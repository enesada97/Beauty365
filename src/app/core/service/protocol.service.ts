import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { SweetalertService } from "./sweetalert.service";
import { CrudService } from "../crud/crud-service";
import { Observable } from 'rxjs';
import { Protocol } from '../models/protocol.model';
import { ProtocolDto } from '../models/protocoldto';
@Injectable()
export class ProtocolService extends CrudService<Protocol,ProtocolDto,number> {
  constructor(
    protected _http: HttpClient,
    public _sweetAlert: SweetalertService,
    private router:Router
  ) {
    super(_http, `${environment.apiUrl}/Protocol`, _sweetAlert);
  }
  // addProtocol(protocol: Protocol): Observable<Protocol> {

  //   return this.httpClient.post<Protocol>(environment.apiUrl +"/Protocol/Save",protocol).subscribe((data:Protocol)=>{
  //     //Yönlendirme işlemi yapılacak !
  //     this.router.navigateByUrl("admin/working/working-processes/"+data.id);
  //     },
  //     (error: HttpErrorResponse) => {
  //       this.isTblLoading = false;
  //       console.log(error.name + " " + error.message);
  //     }
  //     );
  // }
getListByPatientId(id): Observable<ProtocolDto[]> {
  return this._http.get<ProtocolDto[]>(
    environment.apiUrl + "/Protocol/GetListByPatientId/"+
    id
  );
}
}











