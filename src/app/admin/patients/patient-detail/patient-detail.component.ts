import { NoteForPatientComponent } from './../all-patients/dialog/note-for-patient/note-for-patient.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/core/models/patient.model';
import { PatientService } from 'src/app/core/service/patient.service';
import { AddProtocolDialogComponent } from '../search-patient/add-protocol-dialog/add-protocol-dialog.component';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.sass']
})
export class PatientDetailComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private patientService: PatientService,
    public dialog:MatDialog
  ) {}
  patient:Patient;
  id:number;
  notEntered:"Belirtilmemiş"


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getPatientById(params['id']);
    });
  }
  getPatientById(id) {
    this.patientService.getById(id).subscribe(data=>{
      this.patient=data;
      this.patientService.isTblLoading=false;
    })
  }
  addProtocolForPatient(row:Patient) {
    row=this.patient;
    this.id = row.id;
    const dialogRef = this.dialog.open(AddProtocolDialogComponent, {
      data: {
        patient: row,
        action: "add",
      },
    });
    dialogRef.afterClosed();
  }
  addNote(data:Patient){
    data=this.patient;
    this.id = data.id;
    const dialogRef = this.dialog.open(NoteForPatientComponent, {
      data: {
        patient: data,
        action: "note",
        dialogTitle:"Not Ekle"
      },
    });
    dialogRef.afterClosed();
    this.patientService._sweetAlert.success("Hasta notu");
  }
}
