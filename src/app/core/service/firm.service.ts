import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { CrudService } from "../ceneric-service/crud-service";
import { Firm } from "../models/firm.model";
@Injectable()
export class FirmService extends CrudService<Firm, null, number> {
  constructor(protected httpClient: HttpClient) {
    super(httpClient, `${environment.apiUrl}/firms/`);
  }
  getFirm(id: number): Observable<any> {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/firms/` + "getbyid?id=" + id, {
        observe: "response",
      })
      .pipe(switchMap((res) => (res.status === 204 ? of(null) : of(res))));
  }
  fileUploader(formData: FormData): Observable<any> {
    return this.httpClient.post(
      `${environment.apiUrl}/firms/fileupload`,
      formData
    );
  }
}
