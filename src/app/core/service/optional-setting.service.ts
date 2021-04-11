import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { CrudService } from "../ceneric-service/crud-service";
import { OptionalSetting } from "../models/optional-setting.model";
import { SweetalertService } from "./sweetalert.service";
@Injectable()
export class OptionalSettingService extends CrudService<OptionalSetting,null,number> {
  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient, `${environment.apiUrl}/optionalsettings/`);
  }
}

