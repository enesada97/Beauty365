import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { SweetalertService } from "../service/sweetalert.service";
import { CrudOperations } from "./i-crud-operations";
import { Injectable } from "@angular/core";

export abstract class CrudService<T, D, ID>
  implements CrudOperations<T, D, ID> {
  isTblLoading = true;
  constructor(protected httpClient: HttpClient, protected base: string) {}
  getList(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.base + "getall");
  }
  getById(id: ID): Observable<T> {
    return this.httpClient.get<T>(this.base + "getbyid?id=" + id);
  }
  add(t: T): Observable<any> {
    var result = this.httpClient.post(this.base, t, { responseType: "text" });
    return result;
  }
  update(t: T): Observable<any> {
    var result = this.httpClient.put(this.base, t, { responseType: "text" });
    return result;
  }
  delete(id: ID) {
    return this.httpClient.request("delete", this.base, { body: { Id: id } });
  }
  getDtoList(): Observable<D[]> {
    return this.httpClient.get<D[]>(this.base + "getdtoall");
  }
  getDtoById(id: ID): Observable<D> {
    return this.httpClient.get<D>(this.base + "getdtobyid?id=" + id);
  }
}
