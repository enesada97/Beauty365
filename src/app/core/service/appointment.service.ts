import { AppointmentCreateDto } from 'src/app/core/models/create-appointments.model';
import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Appointment } from "../models/appointment.model";
import { SweetalertService } from "./sweetalert.service";
import { CrudService } from "../crud/crud-service";
import { AppointmentDto } from "../models/appointmentdto.model";
import { Observable } from 'rxjs';
@Injectable()
export class AppointmentService extends CrudService<Appointment,AppointmentDto, number> {
  constructor(
    protected _http: HttpClient,
    public _sweetAlert: SweetalertService,
    private router:Router
  ) {
    super(_http, `${environment.apiUrl}/Appointment`, _sweetAlert);
  }
  CreateAppointmentList(appointmentCreateDto: AppointmentCreateDto): void {

    this._http.post(environment.apiUrl +"/Appointment/CreateAppointmentList",appointmentCreateDto).subscribe((data)=>{
      console.log(data);
    },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
      );
      this.router.navigateByUrl("/admin/appointments/all-appointments");
  }
  getSearchedAppointments(dateTime: String): Observable<AppointmentDto[]> {
    return this._http.get<AppointmentDto[]>(
      environment.apiUrl + "/Appointment/GetListByDate/?dateTime="+
      dateTime
    );
  }
  getByIdentity(identity: number,doctorId:number): Observable<Appointment> {
    return this._http.get<Appointment>(
      environment.apiUrl + "/Appointment/GetByIdentity/"+
      identity + "/" +doctorId
    );
  }
  getListByDrId(doctorId:number,startDateTime:String,finishDateTime:String): Observable<AppointmentDto[]> {
    return this._http.get<AppointmentDto[]>(
      environment.apiUrl + "/Appointment/getListByDrId/"+
      doctorId + "/" +startDateTime + "/"+finishDateTime
    );
  }
  getListByPatientId(patientDataId:number): Observable<AppointmentDto[]> {
    return this._http.get<AppointmentDto[]>(
      environment.apiUrl + "/Appointment/getListByPatientId/"+
      patientDataId
    );
  }
  getByProtocolId(protocolId:number): Observable<Appointment> {
    return this._http.get<Appointment>(
      environment.apiUrl + "/Appointment/getByProtocolId/"+
      protocolId
    );
  }
}





