export class Protocol {
    id: number;
    patientDataId:number;
    departmentId:number;
    doctorId:number;
    institutionId:number;
    protocolTypeId:number;
    dateOfCome:Date;
    dateOfLeave:Date;
    isOpen:boolean;
    status:boolean;
    constructor(protocol) {
      {
        this.id = protocol.id || 0;
        this.patientDataId = protocol.patientDataId || '';
        this.departmentId = protocol.departmentId || '';
        this.doctorId = protocol.doctorId || '';
        this.institutionId = protocol.institutionId || '';
        this.protocolTypeId = protocol.protocolTypeId || '';
        this.dateOfCome = protocol.dateOfCome || new Date();
        this.dateOfLeave = protocol.dateOfLeave || '';
        this.status = protocol.isOpen || true;
        this.status = protocol.status || true;
      }
    }
  }

