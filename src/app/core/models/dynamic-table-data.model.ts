export class DynamicTableData {
  id: number;
  formTableId: number;
  protocolId:number;
  formFieldId:number;
  fieldValue:string;
  addedDate:Date;
  updatedDate:Date;
  addedBy:string;
  updatedBy:string;
  constructor(dynamicTableData) {
    {
      this.id = dynamicTableData.id || 0;
      this.formTableId = dynamicTableData.formTableId || null;
      this.protocolId = dynamicTableData.protocolId || null;
      this.formFieldId = dynamicTableData.formFieldId || null;
      this.fieldValue = dynamicTableData.fieldValue || '';
      this.addedBy = dynamicTableData.addedBy || '';
      this.updatedBy = dynamicTableData.updatedBy || '';
      this.addedDate = dynamicTableData.addedDate || new Date();
      this.updatedDate = dynamicTableData.updatedDate || '';
    }
  }
}

