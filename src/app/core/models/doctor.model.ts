export class Doctor {
    id: number;
    departmentId:number;
    identityNumber: number;
    name: string;
    surName: string;
    speciality:string;
    phone: number;
    eMail: string;
    licenceNumber: number;
    address: string;
    status:boolean;
    constructor(doctor) {
      {
        this.id = doctor.id || 0;
        this.identityNumber = doctor.identityNumber || '';
        this.name = doctor.name || '';
        this.surName = doctor.surName || '';
        this.phone = doctor.phone || '';
        this.eMail = doctor.eMail || '';
        this.address = doctor.address || '';
        this.departmentId = doctor.departmentId || '';
        this.speciality = doctor.speciality || '';
        this.licenceNumber = doctor.licenceNumber || '';
        this.status = doctor.status || true ;
      }
    }
  }
  
  