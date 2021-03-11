import { Collection } from "./../models/collection.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SweetalertService } from "../service/sweetalert.service";
import { CrudService } from "src/app/core/crud/crud-service";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class CollectionService extends CrudService<Collection, null, number> {
  constructor(
    protected _http: HttpClient,
    public _sweetAlert: SweetalertService
  ) {
    super(_http, `${environment.apiUrl}/Collection`, _sweetAlert);
  }
  getListCanceled(): Observable<Collection[]> {
    return this._http.get<Collection[]>(this._base + "/GetListCanceled");
  }
  getListByProtocolId(id): Observable<Collection[]> {
    return this._http.get<Collection[]>(
      environment.apiUrl + "/Collection/GetListByProtocolId/" + id
    );
  }
}
