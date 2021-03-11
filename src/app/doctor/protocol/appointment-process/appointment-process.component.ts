import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { WorkingService } from 'src/app/core/service/working.service';
import { PatientForWorkingDto } from 'src/app/core/models/patient-for-working-dto.model';

@Component({
  selector: 'app-appointment-process',
  templateUrl: './appointment-process.component.html',
  styleUrls: ['./appointment-process.component.sass']
})
export class AppointmentProcessComponent implements OnInit {
  protocolId:number;
  patientForWorkingDto: PatientForWorkingDto;
  constructor(private activatedRoute:ActivatedRoute,private workingService:WorkingService) { }

  ngOnInit(): void {
    this.getParamValue();
    this.getPatientDetail();
  }
  getParamValue() {
    this.activatedRoute.params.subscribe((params) => {
      this.protocolId = params["id"];
    });
  }
  getPatientDetail() {
    //Bu kısım hastanın üst kısımda bulunan bilgilerini getirir
    this.workingService
      .getDtoByProtocolId(this.protocolId)
      .subscribe((data) => {
        this.patientForWorkingDto = data;
        this.protocolId = data.protocolId;
      });
  }

}
