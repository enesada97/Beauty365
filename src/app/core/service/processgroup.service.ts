import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { CrudService } from "../ceneric-service/crud-service";
import { ProcessGroup } from "../models/processgroup.model";
@Injectable()
export class ProcessgroupService extends CrudService<ProcessGroup,null,number> {
  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient, `${environment.apiUrl}/processGroups/`);
  }
}
