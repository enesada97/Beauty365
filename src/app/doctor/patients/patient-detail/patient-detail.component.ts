import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NoteForPatientComponent } from 'src/app/admin/patients/all-patients/dialog/note-for-patient/note-for-patient.component';
import { Patient } from 'src/app/core/models/patient.model';
import { PatientService } from 'src/app/core/service/patient.service';

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
      this.getPatientById(params['patientDataId']);
    });
  }
  getPatientById(id) {
    this.patientService.getById(id).subscribe(data=>{
      this.patient=data;
      this.patientService.isTblLoading=false;
    })
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
