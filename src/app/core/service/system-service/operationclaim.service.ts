import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CrudService } from "../../ceneric-service/crud-service";
import { Language } from "../../models/language";
import { OperationClaim } from "../../models/operationclaim";

@Injectable()
export class OperationClaimService extends CrudService<
  OperationClaim,
  null,
  number
> {
  constructor(protected httpClient: HttpClient) {
    super(httpClient, `${environment.apiUrl}/operationClaims/`);
  }
}
