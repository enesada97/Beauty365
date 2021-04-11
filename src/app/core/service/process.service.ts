import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CrudService } from "../ceneric-service/crud-service";
import { Process } from "../models/process.model";

@Injectable()
export class ProcessService extends CrudService<Process,null,number> {
  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient, `${environment.apiUrl}/processes/`);
  }

  getListByGroupId(id): Observable<Process[]> {
    return this.httpClient.get<Process[]>(
      environment.apiUrl + "/processes/getlistbygroupid?id="+
      id
    );
  }
}
