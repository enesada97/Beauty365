import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Department } from "../models/department.model";
import { CrudService } from "../ceneric-service/crud-service";
@Injectable()
export class DepartmentService extends CrudService<Department,null,number> {
  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient, `${environment.apiUrl}/departments/`);
  }
}
