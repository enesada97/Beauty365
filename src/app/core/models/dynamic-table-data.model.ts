export class DynamicTableData {
  id?:number;
  formTableId?:number;
  protocolId?:number;
  formFieldId?:number;
  fieldValue?:string;
  fieldLabel?:string;
  formControlName?:string;
  addedDate?:(Date | any);
  updatedDate?:(Date | any);
  addedBy?:string;
  updatedBy?:string;
  constructor(dynamicTableData) {
    {
      this.id = dynamicTableData.id || 0;
      this.formTableId = dynamicTableData.formTableId || null;
      this.protocolId = dynamicTableData.protocolId || null;
      this.formFieldId = dynamicTableData.formFieldId || null;
      this.fieldValue = dynamicTableData.fieldValue || '';
      this.fieldValue = dynamicTableData.fieldLabel || '';
      this.fieldValue = dynamicTableData.formControlName || '';
      this.addedBy = dynamicTableData.addedBy || '';
      this.updatedBy = dynamicTableData.updatedBy || '';
      this.addedDate = dynamicTableData.addedDate || new Date();
      this.updatedDate = dynamicTableData.updatedDate || '';
    }
  }
}

