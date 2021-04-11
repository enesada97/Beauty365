import { BehaviorSubject, Observable } from 'rxjs';

export interface CrudOperations<T,D,ID> {
  isTblLoading:boolean;
  getList(): Observable<T[]>;
  getById(id:ID):Observable<T>;
  add(t: T):Observable<T>;
  update(t: T):Observable<T>;
  delete(id:ID);
}
