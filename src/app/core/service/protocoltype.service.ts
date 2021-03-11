import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProtocolType } from '../models/protocoltype.model';
import { SweetalertService } from './sweetalert.service';

@Injectable()
export class ProtocoltypeService {
  isTblLoading = true;
  dataChange: BehaviorSubject<ProtocolType[]> = new BehaviorSubject<ProtocolType[]>([]);
  constructor(private httpClient: HttpClient,private sweetAlert:SweetalertService) {}
  get data(): ProtocolType[] {
    return this.dataChange.value;
  }
  /** CRUD METHODS */
  getAllProtocolTypes(): void {
    this.httpClient.get<ProtocolType[]>(environment.apiUrl+ '/ProtocolType/GetList').subscribe(
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
  getAll(): Observable<ProtocolType[]> {
    return this.httpClient.get<ProtocolType[]>(environment.apiUrl + '/ProtocolType/GetList');
}
  getAllProtocolTypesForAny():Observable<ProtocolType[]>{
    return this.httpClient.get<ProtocolType[]>(environment.apiUrl+ '/ProtocolType/GetList');
  }
  getProtocolTypeById(id): Observable<ProtocolType> {
    return this.httpClient.get<ProtocolType>(environment.apiUrl + '/ProtocolType/GetById/' + id);
  }
  addProtocolType(protocolType: ProtocolType): void {
    this.httpClient.post(environment.apiUrl +"/ProtocolType/Save",protocolType).subscribe(data=>{
      this.sweetAlert.success(data['protocolTypeName']);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
      );
  }
  deleteProtocolType(id: number): void {
      this.httpClient.post(environment.apiUrl +"/ProtocolType/Delete/"+id,id).subscribe(data => {
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    )
  }
}

