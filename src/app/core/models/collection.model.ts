export class Collection {
  id?:number;
  collectorId?:number;
  protocolId?:number;
  paymentType?:number;
  price?:number;
  bankId?:number;
  paymentBillNo?:string;
  discount:boolean;
  cancelled:boolean;
  paymentValue?:number;
  discountValue?:number;
  addedDate?:(Date | any);
  updatedDate?:(Date | any);
  addedBy?:string;
  updatedBy?:string;
  constructor(collection) {
    {
      this.id = collection.id || 0;
      this.collectorId=collection.collectorId || 0;
      this.protocolId=collection.protocolId || 0;
      this.paymentType = collection.paymentType || 0;
      this.price= collection.price || 0;
      this.bankId = collection.bankId || 0;
      this.paymentBillNo = collection.paymentBillNo || '';
      this.discount = collection.discount || false;
      this.cancelled = collection.cancelled || false;
      this.paymentValue = collection.paymentValue || 0;
      this.discountValue = collection.discountValue || 0;
      this.addedDate = collection.addedDate || '';
      this.updatedDate = collection.updatedDate || '';
      this.addedBy = collection.addedBy || '';
      this.updatedBy = collection.updatedBy || '';
    }
  }
}

