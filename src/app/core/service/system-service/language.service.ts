import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CrudService } from "../../ceneric-service/crud-service";
import { Language } from "../../models/language";
@Injectable()
export class LanguageService extends CrudService<Language, null, number> {
  constructor(protected httpClient: HttpClient) {
    super(httpClient, `${environment.apiUrl}/languages/`);
  }
}
