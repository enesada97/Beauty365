export class Invoice {
  id?: number;
  patientDataId?: number;
  protocolId: number;
  companyId: number;
  totalPrice: number;
  paymentBillNo: number;
  cancelled: boolean;
  discountValue: number;
  taxValue: number;
  addedDate: Date | any;
  updatedDate: Date | any;
  addedBy: string;
  updatedBy: string;
  constructor(invoice) {
    {
      this.id = invoice.id || 0;
      this.patientDataId = invoice.patientDataId || 0;
      this.protocolId = invoice.protocolId || 0;
      this.companyId = invoice.companyId || 1;
      this.totalPrice = invoice.totalPrice || 0;
      this.paymentBillNo = invoice.paymentBillNo || 0;
      this.cancelled = invoice.cancelled || false;
      this.discountValue = invoice.discountValue || 0;
      this.taxValue = invoice.taxValue || 0;
      this.addedDate = invoice.addedDate || new Date();
      this.updatedDate = invoice.updatedDate || null;
      this.addedBy = invoice.addedBy || "";
      this.updatedBy = invoice.updatedBy || "";
    }
  }
}
