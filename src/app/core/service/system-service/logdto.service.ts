import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrudService } from '../../ceneric-service/crud-service';
import { Language } from '../../models/language';
import { LogDto } from '../../models/logdto';


@Injectable()
export class LogDtoService extends CrudService<LogDto, null, number> {
  constructor(protected httpClient: HttpClient) {
    super(httpClient, `${environment.apiUrl}/logs/`);
  }
}
