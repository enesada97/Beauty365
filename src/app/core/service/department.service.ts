import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SweetalertService } from "../service/sweetalert.service";
import { CrudService } from "src/app/core/crud/crud-service";
import { environment } from "src/environments/environment";
import { Department } from "../models/department.model";

@Injectable()
export class DepartmentService extends CrudService<Department,null,number> {
  constructor(
    protected _http: HttpClient,
    public _sweetAlert: SweetalertService
  ) {
    super(_http, `${environment.apiUrl}/Department`, _sweetAlert);
  }
}
