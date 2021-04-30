import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CrudService } from "../ceneric-service/crud-service";
import { AppointmentDto } from "../models/appointmentdto.model";
import { DailyReportDto } from "../models/daily-report-dto.model";
@Injectable()
export class DashboardService extends CrudService<null,null,number> {
  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient, `${environment.apiUrl}/DashBoard/`);
  }
  getDailyReport(): Observable<DailyReportDto> {
    return this.httpClient.get<DailyReportDto>(
      environment.apiUrl + "/DashBoard/getdaily"
    );
  }
  getFilledAppointmentsDto(): Observable<AppointmentDto[]> {
    return this.httpClient.get<AppointmentDto[]>(  environment.apiUrl + "/DashBoard/getfilledappointments");
  }
}
