export class Institution {
    id: number;
    institutionName: string;
    status:boolean;
    constructor(department) {
      {
        this.id = department.id || 0;
        this.institutionName = department.institutionName || '';
        this.status = department.status || true;
      }
    }
  }
  
  