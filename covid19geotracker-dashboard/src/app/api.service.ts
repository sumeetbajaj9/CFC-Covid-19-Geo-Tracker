
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {DayFind} from './day-find'
import {People} from './people'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL: string = "python-flask-application-url";s
  constructor(private http: HttpClient) { }

  getPeople(): Observable<People[]> {
    console.log('getPeople '+this.baseURL + 'app')
    return this.http.get<People[]>(this.baseURL + 'app')
  }
 
  searchPerson(dayfind:DayFind): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(dayfind);
    console.log(body)
    return this.http.post(this.baseURL + 'app/post', body,{'headers':headers})
  }
  MarkPerson(dayfind:DayFind): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(dayfind);
    console.log(body)
    return this.http.post(this.baseURL + 'app/markinfectedPerson', body,{'headers':headers})
  }
}
