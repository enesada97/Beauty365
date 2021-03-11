import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SweetalertService } from "../service/sweetalert.service";
import { CrudService } from "src/app/core/crud/crud-service";
import { environment } from "src/environments/environment";
import { Patient } from "../models/patient.model";
import { Observable } from "rxjs";

@Injectable()
export class PatientService extends CrudService<Patient,null,number> {
  constructor(
    protected _http: HttpClient,
    public _sweetAlert: SweetalertService
  ) {
    super(_http, `${environment.apiUrl}/Patient`, _sweetAlert);
  }
  getSearchedPatients(patient: Patient): Observable<Patient[]> {
    return this._http.post<Patient[]>(
      environment.apiUrl + "/Patient/Search",
      patient
    );
  }
}
