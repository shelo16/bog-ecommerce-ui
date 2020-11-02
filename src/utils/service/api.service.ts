import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {
  }


  getWithCredentials(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.httpClient.get(`${environment.api_url}${path}`, {params, withCredentials: true});
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.httpClient.get(`${environment.api_url}${path}`, {params});
  }

  // tslint:disable-next-line:ban-types
  put(path: string, body: Object = {}, headers: HttpHeaders = new HttpHeaders()): Observable<any> {
    return this.httpClient.put(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      {headers});
  }

  // tslint:disable-next-line:ban-types
  post(path: string, body: Object = {}, headers: HttpHeaders = new HttpHeaders()): Observable<any> {
    return this.httpClient.post(
      `${environment.api_url}${path}`,
      body,
      {headers, withCredentials: true}
    );
  }

  // tslint:disable-next-line:ban-types
  postWithoutCredentials(path: string, body: Object = {}, headers: HttpHeaders = new HttpHeaders()): Observable<any> {
    return this.httpClient.post(
      `${environment.api_url}${path}`,
      body,
      {headers}
    );
  }

  // tslint:disable-next-line:ban-types
  postExternalApi(path: string, body: Object = {}, headers: HttpHeaders = new HttpHeaders()): Observable<any> {
    return this.httpClient.post(
      `${path}`,
      body,
      {headers}
    );
  }

}
