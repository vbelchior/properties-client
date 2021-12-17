import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  ObjectUnsubscribedError,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { PropertyModel } from './property.model';
import { environment } from '@commons/environments';
import { catchError } from 'rxjs/operators';
import { TypeUtil } from '@commons/utils';

@Injectable({ providedIn: 'root' })
export class PropertyService {
  constructor(private httpClient: HttpClient) {}

  private static readonly NULL_ID: string = 'Entity id is null or undefined.';

  public create(property: PropertyModel): Observable<PropertyModel> {
    const path: string = `${environment.server}/properties`;
    return this.httpClient
      .post<PropertyModel>(path, property)
      .pipe(catchError((error) => throwError(error)));
  }

  public retrieve(id: number): Observable<PropertyModel> {
    if (!TypeUtil.exists(id)) return of(new PropertyModel());
    const path: string = `${environment.server}/properties/${id}`;
    return this.httpClient.get<PropertyModel>(path);
  }

  public replace(id: number, entity: PropertyModel): Observable<any> {
    const path: string = `${environment.server}/properties/${id}`;
    let query: HttpParams = new HttpParams();
    return this.httpClient.put(path, entity, { params: query });
  }

  public update(id: number, entity: PropertyModel): Observable<any> {
    const path: string = `${environment.server}/properties/${id}`;
    let query: HttpParams = new HttpParams();
    return this.httpClient.patch(path, entity, { params: query });
  }

  public delete(id: number): Observable<any> {
    if (!TypeUtil.exists(id)) return throwError(new PropertyModel());
    const path: string = `${environment.server}/properties/${id}`;
    let query: HttpParams = new HttpParams();
    return this.httpClient.delete(path, { params: query });
  }
}
