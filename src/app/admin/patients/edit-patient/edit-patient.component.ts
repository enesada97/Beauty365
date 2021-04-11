import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DateAdapter } from "@angular/material/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Patient } from "src/app/core/models/patient.model";
import { PatientService } from "src/app/core/service/patient.service";

@Component({
  selector: "app-edit-patient",
  templateUrl: "./edit-patient.component.html",
  styleUrls: ["./edit-patient.component.sass"],
})
export class EditPatientComponent {
  patientForm: FormGroup;
  formdata;
  constructor(
    private fb: FormBuilder,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private patientService: PatientService,
    private dateAdapter:DateAdapter<any>
  ) {}
  patient: Patient;
  ngOnInit(): void {
    this.dateAdapter.setLocale('tr');
    this.activatedRoute.params.subscribe((params) => {
      this.getPatientById(params["id"]);
    });
  }
  getPatientById(id) {
    this.patientService.getById(id).subscribe((data) => {
      this.formdata = data;
      this.patient = this.formdata;
      this.patientForm = this.createContactForm();
    });
  }
  public onSubmit(): void {
    if (this.patientForm.valid) {
      this.patient = Object.assign({}, this.patientForm.value);
      // this.patient.userId=this.authService.getCurrentUserId();
      this.patientService.update(this.patient).subscribe(data=>{
        this.router.navigateByUrl('/admin/patients/all-patients');
        }
        );
    }
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.patient.id],
      identityNumber: [this.patient.identityNumber, [Validators.required]],
      name: [this.patient.name, [Validators.required]],
      surName: [this.patient.surName, [Validators.required]],
      fatherName: [this.patient.fatherName],
      motherName: [this.patient.motherName],
      status: [this.patient.status],
      gender: [this.patient.gender],
      birthDate: [this.patient.birthDate],
      phoneNumber: [this.patient.phoneNumber, [Validators.required]],
      eMail: [this.patient.eMail],
      nationality: [this.patient.nationality],
      country: [this.patient.country],
      region: [this.patient.region],
      city: [this.patient.city],
      address: [this.patient.address],
      bloodGroup: [this.patient.bloodGroup],
      job: [this.patient.job],
      usingSmoke: [this.patient.usingSmoke],
      usingAlcohol: [this.patient.usingAlcohol],
      maritalStatus: [this.patient.maritalStatus],
      smsConfirm: [this.patient.smsConfirm],
      gdprConfirm: [this.patient.gdprConfirm],
      note: [this.patient.note],
      isTrobule: [this.patient.isTrobule],
      photoUrl: [this.patient.photoUrl],
    });
  }
}
