export class Process{
  id?:number;
  name?:string;
  processGroupId?:number;
  status:boolean;
  unit?:number;
  doctorRatio?:number;
  cost?:number;
  taxRatio?:number;
  isLab:boolean;
  isRad:boolean;
    constructor(process) {
        {
          this.id = process.id || 0;
          this.name = process.name || '';
          this.processGroupId = process.processGroupId || '';
          this.unit = process.unit || '';
          this.doctorRatio = process.doctorRatio || '';
          this.cost = process.cost || '';
          this.taxRatio = process.taxRatio || '';
          this.isLab = process.isLab || false;
          this.isRad = process.isRad || false;
          this.status = process.status || true ;
        }
      }
}
