export class ProcessInstitue{
    id:number;
    institueId:number;
    processId:number;
    price:number;
    tTBPercent:number;
    tTBFactor:number;
    constructor(processInstitue) {
        {
          this.id = processInstitue.id || 0;
          this.institueId=processInstitue.institueId || '';
          this.processId=processInstitue.processId || '';
          this.tTBPercent = processInstitue.tTBPercent || '';
          this.tTBFactor = processInstitue.tTBFactor || '';
        }
      }
}
