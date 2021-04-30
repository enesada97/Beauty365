export class InvoiceDto {
  invoiceId?: number;
  patientDataId?: number;
  protocolId: number;
  patientName:string;
  patientSurName:string;
  country:string;
  region:string;
  city:string;
  address:string;
  phoneNumber:string;
  email:string;
  totalPrice: number;
  paymentBillNo: number;
  discountValue: number;
  canceled:boolean;
  taxValue: number;
  addedDate: Date | any;
  updatedDate: Date | any;
  addedBy: string;
  updatedBy: string;
}
