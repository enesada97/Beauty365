export class ProtocolTypeProcess {
  id?:number;
  protocolTypeId?:number;
  doctorId?:number;
  processId?:number;
  institueId?:number;
  price?:number;
  doctorRatio?:number;
  taxRatio?:number;
  constructor(protocolTypeProcess) {
    {
      this.id = protocolTypeProcess.id || 0;
      this.protocolTypeId = protocolTypeProcess.protocolTypeId || null;
      this.doctorId = protocolTypeProcess.doctorId || null;
      this.processId = protocolTypeProcess.processId || null;
      this.institueId = protocolTypeProcess.institueId || null;
      this.price = protocolTypeProcess.price || null;
      this.doctorRatio = protocolTypeProcess.doctorRatio || null;
      this.taxRatio = protocolTypeProcess.taxRatio || null;
    }
  }
}
