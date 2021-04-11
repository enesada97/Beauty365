import { Collection } from "./../models/collection.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { CrudService } from "../ceneric-service/crud-service";

@Injectable()
export class CollectionService extends CrudService<Collection, null, number> {
  constructor(protected httpClient: HttpClient) {
    super(httpClient, `${environment.apiUrl}/collections/`);
  }
  getListCanceled(): Observable<Collection[]> {
    return this.httpClient.get<Collection[]>(
      environment.apiUrl + "/collections/getlistcanceled"
    );
  }
  getListByProtocolId(id): Observable<Collection[]> {
    return this.httpClient.get<Collection[]>(
      environment.apiUrl + "/collections/getlistbyprotocolid?=" + id
    );
  }
}
