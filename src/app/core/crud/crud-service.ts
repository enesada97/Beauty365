import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SweetalertService } from '../service/sweetalert.service';
import { CrudOperations } from './i-crud-operations';

export abstract class CrudService<T,D,ID> implements CrudOperations<T,D,ID> {
    isTblLoading=true;
    constructor(
        protected _http: HttpClient,
        protected _base: string,
        protected _sweetAlert:SweetalertService
      ) {}

    dataChange: BehaviorSubject<T[]>= new BehaviorSubject<T[]>([]);
    get data(): T[] {
        return this.dataChange.value;
      }
      dataDtoChange: BehaviorSubject<D[]>= new BehaviorSubject<D[]>([]);
    get dataDto(): D[] {
        return this.dataDtoChange.value;
      }
    getAll(): Observable<T[]> {
        return this._http.get<T[]>(this._base + '/GetList');
    }
    getByDtoId(id: ID): Observable<D> {
        return this._http.get<D>(this._base + "/GetByDtoId/" + id);
    }
    getById(id: ID): Observable<T> {
        return this._http.get<T>(this._base + "/GetById/" + id);
    }
    getDtoAll():Observable<D[]>{
        return this._http.get<D[]>(this._base + '/GetList');
    }
    save(t: T): Observable<any> {
        return this._http.post<T>(this._base + '/Save', t);
    }
    delete(id: ID): Observable<T> {
        return this._http.post<T>(this._base + '/Delete/' + id,id);
    }
    forProcessInstitueDto():Observable<D[]>{
        return this._http.get<D[]>(this._base + '/GetProcessInstitueDtoList');
    }
    forProcessDtoWorking(id: ID):Observable<D[]>{
        return this._http.get<D[]>(this._base + '/GetProcessDtoListById/' + id);
    }
    forProcessInstitueDtosByInstitueId(id: ID):Observable<D[]>{
      return this._http.get<D[]>(this._base + '/GetProcessInstitueDtosByInstitueId/' + id);
  }
}
