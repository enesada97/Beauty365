export class ProcessGroup{
    id:number;
    name:string;
    status:boolean;
    constructor(processGroup) {
        {
          this.id = processGroup.id || 0;
          this.name = processGroup.name || '';
          this.status = processGroup.status || true;
        }
      }
}
