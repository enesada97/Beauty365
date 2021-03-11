import { BehaviorSubject, Observable } from 'rxjs';

export interface CrudOperations<T,D,ID> {
  isTblLoading:boolean;
  dataChange: BehaviorSubject<T[]>;
  dataDtoChange: BehaviorSubject<D[]>;
  getAll(): Observable<T[]>;
  getDtoAll():Observable<D[]>;
  getById(id:ID):Observable<T>;
  getByDtoId(id:ID):Observable<D>;
  save(t: T):Observable<T>;
  delete(id:ID):Observable<T>;
}