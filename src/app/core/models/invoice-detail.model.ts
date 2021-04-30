export class InvoiceDetail {
  id?: number;
  invoiceId?: number;
  processId?: number;
  price: number;
  quantity: number;
  totalPrice: number;
  constructor(invoiceDetail) {
    {
      this.id = invoiceDetail.id || 0;
      this.invoiceId = invoiceDetail.invoiceId || 0;
      this.processId = invoiceDetail.processId || 0;
      this.price = invoiceDetail.price || 0;
      this.quantity = invoiceDetail.quantity || 0;
      this.totalPrice = invoiceDetail.totalPrice || 0;
    }
  }
}
