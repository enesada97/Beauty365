import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrudService } from '../ceneric-service/crud-service';
import { InvoiceDetailDto } from '../models/invoice-detail-dto.model';
import { InvoiceDetail } from '../models/invoice-detail.model';

@Injectable()
export class InvoiceDetailService extends CrudService<InvoiceDetail,InvoiceDetailDto,number> {
  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient, `${environment.apiUrl}/invoicedetails/`);
  }
  getDtoListByInvoiceId(invoiceId:number): Observable<InvoiceDetailDto[]> {
    return this.httpClient.get<InvoiceDetailDto[]>(
      environment.apiUrl + "/invoicedetails/getdtosbyinvoiceid?id="+
      invoiceId
    );
  }
}
