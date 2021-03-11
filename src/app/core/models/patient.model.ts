export class Patient {
  id: number;
  identityNumber: number;
  name: string;
  surName: string;
  fatherName: string;
  motherName: string;
  gender: boolean;
  birthDate: Date;
  phoneNumber: number;
  eMail: string;
  nationality: string;
  country: string;
  region: string;
  city: string;
  address: string;
  bloodGroup: string;
  job: string;
  usingSmoke: boolean;
  usingAlcohol: boolean;
  maritalStatus: boolean;
  smsConfirm: boolean;
  gdprConfirm: boolean;
  note: string;
  isTrobule: boolean;
  photoUrl: string;
  status:boolean;
  constructor(patient) {
    {
      this.id = patient.id || 0;
      this.identityNumber = patient.identityNumber || '';
      this.name = patient.name || '';
      this.surName = patient.surName || '';
      this.fatherName = patient.fatherName || '';
      this.motherName = patient.motherName || '';
      this.gender = patient.gender || false;
      this.birthDate = patient.birthDate || '';
      this.phoneNumber = patient.phoneNumber || '';
      this.eMail = patient.eMail || '';
      this.nationality = patient.nationality || '';
      this.country = patient.country || '';
      this.region = patient.region || '';
      this.city = patient.city || '';
      this.address = patient.address || '';
      this.bloodGroup = patient.bloodGroup || '';
      this.job = patient.job || '';
      this.usingSmoke = patient.usingSmoke || false;
      this.usingAlcohol = patient.usingAlcohol || false;
      this.maritalStatus = patient.maritalStatus || false;
      this.smsConfirm = patient.smsConfirm || false;
      this.gdprConfirm = patient.gdprConfirm || false;
      this.note = patient.note || '';
      this.isTrobule = patient.isTrobule || false;
      this.photoUrl = patient.avatar || 'assets/images/user/user1.jpg';
      this.status = patient.status || true;
    }
  }
}

