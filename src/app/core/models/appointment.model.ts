export class Appointment {
  id?:number;
  date?:(Date | any);
  time?:string;
  identityNumber?:number;
  name?:string;
  surName?:string;
  phoneNumber?:number;
  patientDataId?:number;
  protocolId?:number;
  doctorId?:number;
  departmentId?:number;
  protocolTypeId?:number;
  institutionId?:number;
  description?:string;
  createdAppointmentDateTime?:(Date | any);
  arriveDateTime?:(Date | any);
  inspectionStartDateTime?:(Date | any);
  inspectionEndDateTime?:(Date | any);
  status:boolean;
  patientHasArrive:boolean;
    constructor(appointment) {
      {
        this.id = appointment.id || 0;
        this.date=appointment.date || new Date();
        this.time=appointment.time || '';
        this.identityNumber = appointment.identityNumber || null;
        this.name = appointment.name || '';
        this.surName = appointment.surName || '';
        this.phoneNumber = appointment.phoneNumber || null;
        this.patientDataId = appointment.patientDataId || '';
        this.protocolId = appointment.protocolId || '';
        this.doctorId = appointment.doctorId || '';
        this.departmentId = appointment.departmentId || '';
        this.protocolTypeId = appointment.protocolTypeId || '';
        this.description = appointment.description || '';
        this.createdAppointmentDateTime = appointment.createdAppointmentDateTime || '';
        this.arriveDateTime = appointment.arriveDateTime || '';
        this.inspectionStartDateTime = appointment.inspectionStartDateTime || '';
        this.inspectionEndDateTime = appointment.inspectionEndDateTime || '';
        this.patientHasArrive = appointment.patientHasArrive || false;
        this.status = appointment.status || true;
      }
    }
  }

