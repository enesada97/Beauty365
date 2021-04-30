import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceDetailDto } from 'src/app/core/models/invoice-detail-dto.model';
import { InvoiceDto } from 'src/app/core/models/invoice-dto.model';
import { InvoiceDetailService } from 'src/app/core/service/invoice-detail.service';
import { InvoiceService } from 'src/app/core/service/invoice.service';
import { Print } from 'src/app/core/service/print';
import { TableUtil } from 'src/app/core/tableUtil';

@Component({
  selector: 'app-detail-invoice',
  templateUrl: './detail-invoice.component.html',
  styleUrls: ['./detail-invoice.component.sass']
})
export class DetailInvoiceComponent implements OnInit {
  invoiceDto:InvoiceDto;
  invoiceDetailDtos:InvoiceDetailDto[];
  id:number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private invoiceService: InvoiceService,
    private invoiceDetailService:InvoiceDetailService
  ) {}
  ngOnInit(): void {
    this.getParam();
  }
  getParam(){
    this.activatedRoute.params.subscribe((params) => {
      this.getInvoiceById(params['id']);
      this.getInvoiceDetailById(params['id']);
    });
  }
  getInvoiceById(id) {
    this.invoiceService.getDtoById(id).subscribe(data=>{
      this.invoiceDto=data;
    })
  }
  getInvoiceDetailById(id){
    this.invoiceDetailService.getDtoListByInvoiceId(id).subscribe(data=>{
      this.invoiceDetailDtos=data;
    })
  }
  print(id:string){
    Print.exportToPdf(id);
  }
}
