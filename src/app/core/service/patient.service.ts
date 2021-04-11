import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Patient } from "../models/patient.model";
import { Observable } from "rxjs";
import { CrudService } from "../ceneric-service/crud-service";

@Injectable()
export class PatientService extends CrudService<Patient,null,number> {
  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient, `${environment.apiUrl}/patientdatas/`);
  }
  getSearchedPatients(patient: Patient): Observable<Patient[]> {
    return this.httpClient.post<Patient[]>(
      environment.apiUrl + "/patientdatas/search",
      patient
    );
  }
}
