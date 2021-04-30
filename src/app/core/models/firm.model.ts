export class Firm {
  id?: number;
  logoUrl?: string;
  name?: string;
  address?: string;
  email?: string;
  emailHost?: string;
  emailPort?: string;
  emailPassword?: string;
  fax?: string;
  city?: string;
  district?: string;
  smsHeader?: string;
  smsUserName?: string;
  smsPassword?: string;
  smsTur?: string;
  phoneNumber?: string;
  tradeNo?: string;
  tradeTitle?: string;
  taxOffice?: string;
  taxNo?: string;
  webSiteUrl?: string;
  dateOfLicenceFinish?: Date | any;
  constructor(firm) {
    {
      this.id = firm.id || 0;
      this.logoUrl = firm.logoUrl || "";
      this.name = firm.name || "";
      this.address = firm.address || "";
      this.email = firm.email || "";
      this.emailHost = firm.emailHost || "";
      this.emailPort = firm.emailPort || "";
      this.emailPassword = firm.emailPassword || "";
      this.fax = firm.fax || "";
      this.city = firm.city || "";
      this.district = firm.district || "";
      this.smsHeader = firm.smsHeader || "";
      this.smsUserName = firm.smsUserName || "";
      this.smsPassword = firm.smsPassword || "";
      this.smsTur = firm.smsTur || "";
      this.phoneNumber = firm.phoneNumber || "";
      this.tradeNo = firm.tradeNo || "";
      this.tradeTitle = firm.tradeTitle || "";
      this.taxOffice = firm.taxOffice || "";
      this.taxNo = firm.taxNo || "";
      this.webSiteUrl = firm.webSiteUrl || "";
      this.dateOfLicenceFinish = firm.dateOfLicenceFinish || null;
    }
  }
}
