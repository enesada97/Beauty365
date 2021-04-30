import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DateAdapter } from "@angular/material/core";
import { FileInput } from "ngx-material-file-input";
import { Firm } from "src/app/core/models/firm.model";
import { FirmService } from "src/app/core/service/firm.service";
import { SweetalertService } from "src/app/core/service/sweetalert.service";
import { AuthService } from "src/app/core/service/system-service/auth.service";

@Component({
  selector: "app-firm-settings",
  templateUrl: "./firm-settings.component.html",
  styleUrls: ["./firm-settings.component.sass"],
})
export class FirmSettingsComponent implements OnInit {
  firmForm: FormGroup;
  firm: Firm;
  fileToUpload: File = null;
  fullPath:string;
  constructor(
    private firmService: FirmService,
    private fb: FormBuilder,
    private dateAdapter: DateAdapter<any>,
    private sweetAlert: SweetalertService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.dateAdapter.setLocale("tr");
    this.getFirm();
  }
  getFirm() {
    this.firmService.getFirm(1).subscribe((data) => {
      if (data != null) {
        this.firm = data.body;
        this.fullPath='https://localhost:44371/WebAPI/Images/Logos/'+this.firm.logoUrl;
      } else {
        this.firm = new Firm({});
      }
      this.firmForm = this.createContactForm();
    });
  }
  refresh() {
    this.getFirm();
  }
  checkClaim(claim: string): boolean {
    return this.authService.claimGuard(claim);
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.firm.id],
      logoUrl: [this.firm.logoUrl],
      name: [this.firm.name],
      address: [this.firm.address],
      email: [this.firm.email],
      emailHost: [this.firm.emailHost],
      emailPort: [this.firm.emailPort],
      emailPassword: [this.firm.emailPassword],
      fax: [this.firm.fax],
      city: [this.firm.city],
      district: [this.firm.district],
      smsHeader: [this.firm.smsHeader],
      smsUserName: [this.firm.smsUserName],
      smsPassword: [this.firm.smsPassword],
      smsTur: [this.firm.smsTur],
      phoneNumber: [this.firm.phoneNumber],
      tradeNo: [this.firm.tradeNo],
      tradeTitle: [this.firm.tradeTitle],
      taxOffice: [this.firm.taxOffice],
      taxNo: [this.firm.taxNo],
      webSiteUrl: [this.firm.webSiteUrl],
      dateOfLicenceFinish: [this.firm.dateOfLicenceFinish],
    });
  }
  public onSubmit(): void {
    if (this.firmForm.valid) {
      this.firm = Object.assign({}, this.firmForm.value);
      let logoUrl = this.firmForm.get("logoUrl").value._fileNames;
      const file_form: FileInput = this.firmForm.get("logoUrl").value;
      const file =
        file_form.files && file_form.files[0] ? file_form.files[0] : null;
      const formData = new FormData();
      formData.append("logoUrl", file); // attach blob to formdata / preparing the request
      if (this.firm.id == 0) {
        this.firm.logoUrl = logoUrl;
        this.firmService.add(this.firm).subscribe((data) => {
          file
            ? this.firmService.fileUploader(formData).subscribe((m) => {
                this.refresh();
                this.sweetAlert.success(data);
              })
            : this.refresh();
          this.sweetAlert.success(data);
        });
      } else {
         logoUrl&&logoUrl.length ? (this.firm.logoUrl = logoUrl) : null;
        this.firmService.update(this.firm).subscribe((data) => {
          file
            ? this.firmService.fileUploader(formData).subscribe((m) => {
                this.refresh();
                this.sweetAlert.info(data);
              })
            : this.refresh();
          this.sweetAlert.info(data);
        });
      }
    }
  }
}
