import { Injectable } from "@angular/core";
import {Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { DepForDocDto } from '../models/depfordoctors.model';
import { Doctor } from '../models/doctor.model';
import { CrudService } from "../ceneric-service/crud-service";
@Injectable()
export class DepForDoctorsService extends CrudService<Doctor,null,number> {
  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient, `${environment.apiUrl}/doctors/`);
  }
  getAllDoctorsSub(): Observable<DepForDocDto[]> {
    return this.httpClient.get<DepForDocDto[]>(environment.apiUrl+ '/doctors/getlist');
  }
  getDoctorListByDepId(id): Observable<Doctor[]> {
    return this.httpClient.get<Doctor[]>(environment.apiUrl + '/doctors/getbydepid?id=' + id);
  }
}





