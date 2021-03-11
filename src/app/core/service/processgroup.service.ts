import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { CrudService } from "../crud/crud-service";
import { ProcessGroup } from "../models/processgroup.model";
import { SweetalertService } from "./sweetalert.service";

@Injectable()
export class ProcessgroupService extends CrudService<ProcessGroup,null,number> {
  constructor(
    protected _http: HttpClient,
    public _sweetAlert: SweetalertService
  ) {
    super(_http, `${environment.apiUrl}/ProcessGroup`, _sweetAlert);
  }
}
