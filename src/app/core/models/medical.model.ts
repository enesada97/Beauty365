export class Medical {
  id?:number;
  protocolId?:number;
  icd?:string;
  sikayet?:string;
  hikaye?:string;
  soygecmis?:string;
  durum?:string;
  ozgecmisPreNatal?:string;
  ozgecmisNatal?:string;
  ozgecmisPostNatal?:string;
  basBoyunTiroid?:string;
  solunumSistemi?:string;
  kardiyo?:string;
  extremiteler?:string;
  karinMuayene?:string;
  analGenital?:string;
  norolojikMuayene?:string;
  uygulamalar?:string;
  notlar?:string;
  oneriler?:string;
  tedavi?:string;
  cilt?:string;
  gecirilenOperasnyonlar?:string;
  alerjiler?:string;
  kullanilanIlaclar?:string;
  bagimlilik?:string;
  addedDate?:(Date | any);
  updatedDate?:(Date | any);
  addedBy?:string;
  updatedBy?:string;
  constructor(medical) {
    {
      this.id = medical.id || 0;
      this.protocolId = medical.protocolId || 0;
      this.icd = medical.icd || "";
      this.sikayet = medical.sikayet || "";
      this.hikaye = medical.hikaye || "";
      this.soygecmis = medical.soygecmis || "";
      this.durum = medical.durum || "";
      this.ozgecmisPreNatal = medical.ozgecmisPreNatal || "";
      this.ozgecmisNatal = medical.ozgecmisNatal || "";
      this.ozgecmisPostNatal = medical.ozgecmisPostNatal || "";
      this.basBoyunTiroid = medical.basBoyunTiroid || "";
      this.solunumSistemi = medical.solunumSistemi || "";
      this.kardiyo = medical.kardiyo || "";
      this.extremiteler = medical.extremiteler || "";
      this.karinMuayene = medical.karinMuayene || "";
      this.analGenital = medical.analGenital || "";
      this.norolojikMuayene = medical.norolojikMuayene || "";
      this.uygulamalar = medical.uygulamalar || "";
      this.notlar = medical.notlar || "";
      this.oneriler = medical.oneriler || "";
      this.tedavi = medical.tedavi || "";
      this.cilt = medical.cilt || "";
      this.gecirilenOperasnyonlar = medical.gecirilenOperasnyonlar || "";
      this.alerjiler = medical.alerjiler || "";
      this.kullanilanIlaclar = medical.kullanilanIlaclar || "";
      this.bagimlilik = medical.bagimlilik || "";
      this.addedBy = medical.addedBy || "";
      this.updatedBy = medical.updatedBy || "";
      this.addedDate = medical.addedDate || new Date();
      this.updatedDate = medical.updatedDate || new Date();
    }
  }
}
