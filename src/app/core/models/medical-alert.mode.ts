export class MedicalAlert {
  id?:number;
  note?:string;
  patientDataId?:number;
  constructor(medicalAlert) {
    {
      this.id = medicalAlert.id || 0;
      this.note = medicalAlert.typeName || "";
      this.patientDataId = medicalAlert.patientDataId || 0;
    }
  }
}
