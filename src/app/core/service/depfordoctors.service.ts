import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { DepForDocDto } from '../models/depfordoctors.model';
import { Doctor } from '../models/doctor.model';
@Injectable()
export class DepForDoctorsService {
  isTblLoading = true;
  dataChange: BehaviorSubject<DepForDocDto[]> = new BehaviorSubject<DepForDocDto[]>([]);
  constructor(private httpClient: HttpClient) {}
  get data(): DepForDocDto[] {
    return this.dataChange.value;
  }
  /** CRUD METHODS */
  getAllDoctors(): void {
    this.httpClient.get<DepForDocDto[]>(environment.apiUrl+ '/Doctor/GetList').subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }
  getAllDoctorsSub(): Observable<DepForDocDto[]> {
    return this.httpClient.get<DepForDocDto[]>(environment.apiUrl+ '/Doctor/GetList');
  }
  getDoctorListByDepId(id): Observable<Doctor[]> {
    return this.httpClient.get<Doctor[]>(environment.apiUrl + '/Doctor/GetListByDepId/' + id);
  }
  getDoctorById(id): Observable<Doctor> {
    return this.httpClient.get<Doctor>(environment.apiUrl + '/Doctor/GetById/' + id);
  }
  addDoctor(doctor: Doctor): void {
    this.httpClient.post(environment.apiUrl +"/Doctor/Save",doctor).subscribe(data=>{
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
      );
  }
  deleteDoctor(id: number): void {
    this.httpClient.post(environment.apiUrl +"/Doctor/Delete/"+id,id).subscribe(data => {
    },
    (error: HttpErrorResponse) => {
      this.isTblLoading = false;
      console.log(error.name + " " + error.message);
    }
  )
}
}





