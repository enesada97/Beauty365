import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { CrudService } from "../crud/crud-service";
import { OptionalSetting } from "../models/optional-setting.model";
import { SweetalertService } from "./sweetalert.service";

@Injectable()
export class OptionalSettingService extends CrudService<OptionalSetting,null,number> {
  constructor(
    protected _http: HttpClient,
    public _sweetAlert: SweetalertService
  ) {
    super(_http, `${environment.apiUrl}/OptionalSetting`, _sweetAlert);
  }
}

