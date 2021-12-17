import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { BinaryModel } from './binary.model';
import { environment } from '@commons/environments';
import { TypeUtil } from '@commons/utils';
import { catchError } from 'rxjs/operators';

@Injectable()
export class BinaryService {
  constructor(private httpClient: HttpClient) {}

  private static readonly NULL_ID: string = 'Entity id is null or undefined.';

  public create(file: File, binary: BinaryModel): Observable<BinaryModel> {
    const path: string = `${environment.server}/binaries`;
    let data = new FormData();
    data.set('file', file, file.name);
    data.set('entity', JSON.stringify(binary));

    return this.httpClient
      .post<BinaryModel>(path, data)
      .pipe(catchError((error) => throwError(error)));
  }

  public retrieve(id: number): Observable<BinaryModel> {
    if (!TypeUtil.exists(id)) return of(new BinaryModel());
    const path: string = `${environment.server}/binaries/${id}`;
    return this.httpClient
      .get<BinaryModel>(path)
      .pipe(catchError((error) => throwError(error)));
  }

  public update(id: number, data: BinaryModel): Observable<Object> {
    if (!TypeUtil.exists(id))
      return throwError(new Error(BinaryService.NULL_ID));
    const path: string = `${environment.server}/binaries/${id}`;
    let query: HttpParams = new HttpParams();
    return this.httpClient
      .patch(path, data, { params: query })
      .pipe(catchError((error) => throwError(error)));
  }

  public replace(id: number, data: BinaryModel): Observable<Object> {
    if (!TypeUtil.exists(id))
      return throwError(new Error(BinaryService.NULL_ID));
    const path: string = `${environment.server}/binaries/${id}`;
    let query: HttpParams = new HttpParams();
    return this.httpClient
      .put(path, data, { params: query })
      .pipe(catchError((error) => throwError(error)));
  }

  public delete(id: number): Observable<Object> {
    const path: string = `${environment.server}/binaries/${id}`;
    return this.httpClient
      .delete(path)
      .pipe(catchError((error) => throwError(error)));
  }

  public count(
    propertyId?: number,
    nameLike?: string
  ): Observable<BinaryModel[]> {
    const path: string = `${environment.server}/binaries`;
    let query: HttpParams = new HttpParams();
    if (TypeUtil.exists(propertyId))
      query = query.set('propertyId', propertyId);
    if (TypeUtil.exists(nameLike)) query = query.set('nameLike', nameLike);
    return this.httpClient
      .get<BinaryModel[]>(path, { params: query })
      .pipe(catchError((error) => throwError(error)));
  }

  public filter(
    propertyId?: number,
    nameLike?: string
  ): Observable<BinaryModel[]> {
    const path: string = `${environment.server}/binaries`;
    let query: HttpParams = new HttpParams();
    if (TypeUtil.exists(propertyId))
      query = query.set('propertyId', propertyId);
    if (TypeUtil.exists(nameLike)) query = query.set('nameLike', nameLike);
    return this.httpClient
      .get<BinaryModel[]>(path, { params: query })
      .pipe(catchError((error) => throwError(error)));
  }
}
