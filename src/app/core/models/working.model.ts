export class Working {
    id: number;
    protocolId:number;
    processId:number;
    metarialId:number;
    doctorId:number;
    doctorRatio:number;
    payType:number;
    paidValue:number;
    arrearsValue:number;
    collectionId:number;
    receiptNo:string;
    billNo:string;
    price:number;
    taxRatio:number;
    priceIncludeTax:number;
    user:string;
    quantity:number;
    saleValue:number;
    workingDateTime:Date;
    constructor(working) {
      {
        this.id = working.id || 0;
        this.protocolId = working.protocolId || '';
        this.processId = working.processId || '';
        this.metarialId = working.metarialId || 0;
        this.doctorId = working.doctorId || 0;
        this.doctorRatio = working.doctorRatio || 0;
        this.payType = working.payType || 0;
        this.paidValue = working.paidValue || 0;
        this.arrearsValue = working.arrearsValue || 0;
        this.collectionId = working.collectionId || 0;
        this.receiptNo = working.receiptNo || '';
        this.billNo = working.biilNo || '';
        this.price = working.price || 0;
        this.taxRatio = working.taxRatio || 0;
        this.priceIncludeTax = working.priceIncludeTax || 0;
        this.user = working.user || '';
        this.quantity = working.quantity || 0;
        this.saleValue = working.saleValue || 0;
        this.workingDateTime = working.workingDateTime || new Date();
      }
    }
  }

