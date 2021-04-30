import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrudService } from '../ceneric-service/crud-service';
import { InvoiceDto } from '../models/invoice-dto.model';
import { Invoice } from '../models/invoice.model';

@Injectable()
export class InvoiceService extends CrudService<Invoice,InvoiceDto,number> {
  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient, `${environment.apiUrl}/invoices/`);
  }
  getDtoByProtocolId(protocolId:number): Observable<InvoiceDto> {
    return this.httpClient.get<InvoiceDto>(
      environment.apiUrl + "/invoices/getdtobyprotocolid?id="+
      protocolId
    );
  }
  getDtoListByPatientId(patientId:number): Observable<InvoiceDto[]> {
    return this.httpClient.get<InvoiceDto[]>(
      environment.apiUrl + "/invoices/getdtosbypatientid?id="+
      patientId
    );
  }
}
