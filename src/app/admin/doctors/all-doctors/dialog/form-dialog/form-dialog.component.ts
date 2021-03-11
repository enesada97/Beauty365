import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { Doctor } from 'src/app/core/models/doctor.model';
import { DepForDoctorsService } from 'src/app/core/service/depfordoctors.service';
import { Department } from 'src/app/core/models/department.model';
import { DepartmentService } from 'src/app/core/service/department.service';
import { DepForDocDto } from 'src/app/core/models/depfordoctors.model';

@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
  providers:[DepartmentService]
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  doctorForm: FormGroup;
  doctor: Doctor;
  depForDocDto: DepForDocDto;
  departments:Department[];
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public depForDoctorsService: DepForDoctorsService,
    private fb: FormBuilder,
    private departmentService:DepartmentService
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.depForDocDto=data.depForDocDto;
      this.dialogTitle = this.depForDocDto.doctor.name;
      this.doctor = this.depForDocDto.doctor;
    } else {
      this.dialogTitle = "Yeni Doktor";
      this.doctor = new Doctor({});
    }
    this.doctorForm = this.createContactForm();
  }
  formControl = new FormControl("", [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError("required")
      ? "Required field"
      : this.formControl.hasError("email")
      ? "Not a valid email"
      : "";
  }
  ngOnInit(): void {
    this.departmentService.getAll().subscribe((data) => (this.departments = data));
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.doctor.id],
      identityNumber: [this.doctor.identityNumber, [Validators.required]],
      name: [this.doctor.name, [Validators.required]],
      surName: [this.doctor.surName, [Validators.required]],
      status: [this.doctor.status],
      speciality: [this.doctor.speciality, [Validators.required]],
      departmentId: [this.doctor.departmentId, [Validators.required]],
      phone: [this.doctor.phone, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    if (this.doctorForm.valid) {
      this.doctor = Object.assign({}, this.doctorForm.value);
      // this.Doctor.userId=this.authService.getCurrentUserId();
      this.depForDoctorsService.addDoctor(this.doctor);
    }
  }
}
