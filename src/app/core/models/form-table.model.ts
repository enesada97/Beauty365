export class FormTable {
  id?: number;
  name?: string;
  addedBy?:string;
  isOpen:boolean;
  constructor(formTable) {
    {
      this.id = formTable.id || 0;
      this.name = formTable.name || '';
      this.addedBy = formTable.addedBy || '';
      this.isOpen = formTable.isOpen || true;
    }
  }
}

