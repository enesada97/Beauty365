import { AppointmentCreateDto } from 'src/app/core/models/create-appointments.model';
import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Appointment } from "../models/appointment.model";
import { AppointmentDto } from "../models/appointmentdto.model";
import { Observable } from 'rxjs';
import { CrudService } from '../ceneric-service/crud-service';
@Injectable()
export class AppointmentService extends CrudService<Appointment,AppointmentDto,number> {
  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient, `${environment.apiUrl}/appointments/`);
  }

  CreateAppointmentList(appointmentCreateDto: AppointmentCreateDto): any {
    var result= this.httpClient.post(environment.apiUrl +"/appointments/createappointmentlist/",appointmentCreateDto,{ responseType: "text" });
    return result;
  }
  getSearchedAppointments(dateTime: String): Observable<AppointmentDto[]> {
    return this.httpClient.get<AppointmentDto[]>(
      environment.apiUrl + "/appointments/getlistbydate?dateTime="+
      dateTime
    );
  }
  getByIdentity(identity: number,doctorId:number): Observable<Appointment> {
    return this.httpClient.get<Appointment>(
      environment.apiUrl + "/appointments/getbyidentity?id="+identity+"&doctorId="+doctorId
    );
  }
  getListByDrId(doctorId:number,startDateTime:String,finishDateTime:String): Observable<AppointmentDto[]> {
    return this.httpClient.get<AppointmentDto[]>(
      environment.apiUrl + "/appointments/getlistbydrid?id="+doctorId+"&startDateTime="+startDateTime+"&finishDateTime="+finishDateTime
    );
  }
  getListByPatientId(patientDataId:number): Observable<AppointmentDto[]> {
    return this.httpClient.get<AppointmentDto[]>(
      environment.apiUrl + "/Appointments/getlistbypatientid?id="+
      patientDataId
    );
  }
  getByProtocolId(protocolId:number): Observable<Appointment> {
    return this.httpClient.get<Appointment>(
      environment.apiUrl + "/appointments/getbyprotocolid?protocolId="+
      protocolId
    );
  }
}





