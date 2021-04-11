export class ProtocolType {
  id?:number;
  typeName?:string;
  status:boolean;
  constructor(protocolType) {
    {
      this.id = protocolType.id || 0;
      this.typeName = protocolType.typeName || "";
      this.status = protocolType.status || true;
    }
  }
}
