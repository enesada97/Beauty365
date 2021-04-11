import { Component, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Patient } from "src/app/core/models/patient.model";
import { PatientService } from "src/app/core/service/patient.service";
import { MatDialog } from "@angular/material/dialog";
import { AddProtocolDialogComponent } from "./add-protocol-dialog/add-protocol-dialog.component";
import { MatProgressButtonOptions } from "mat-progress-buttons";
import { AuthService } from "src/app/core/service/system-service/auth.service";
@Component({
  selector: "app-search-patient",
  templateUrl: "./search-patient.component.html",
  styleUrls: ["./search-patient.component.sass"],
})
export class SearchPatientComponent {
  searchedPatients: Patient[];
  displayedColumns: string[] = [
    "name",
    "surName",
    "identityNumber",
    "phoneNumber",
    "actions",
  ];
  patient: Patient;
  patientForm: FormGroup;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  dataSource: MatTableDataSource<Patient>;
  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    public dialog: MatDialog,
    private authService:AuthService
  ) {
    this.patientForm = this.fb.group({
      identityNumber: [null],
      name: [null],
      surName: [null],
      phoneNumber: [null],
    });
  }
  spinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: "Protokol Ekle",
    spinnerSize: 18,
    raised: true,
    stroked: false,
    buttonColor: "primary",
    spinnerColor: "accent",
    fullWidth: false,
    disabled: false,
    mode: "indeterminate",
    buttonIcon: {
      fontIcon: "add_circle_outline",
    },
  };
  checkClaim(claim: string): boolean {
    return this.authService.claimGuard(claim);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  addProtocolForPatient(row) {
    const dialogRef = this.dialog.open(AddProtocolDialogComponent, {
      data: {
        patient: row,
        action: "add",
      },
    });
    dialogRef.afterClosed();
  }
  public onSubmit(): void {
    this.patient = Object.assign({}, this.patientForm.value);
    // this.patient.userId=this.authService.getCurrentUserId();
    this.patientService.getSearchedPatients(this.patient).subscribe((data) => {
      this.searchedPatients = data;
      this.dataSource = new MatTableDataSource<Patient>(this.searchedPatients);
      setTimeout(() => (this.dataSource.sort = this.sort));
      setTimeout(() => (this.dataSource.paginator = this.paginator));
    });
  }
}
