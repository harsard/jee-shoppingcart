import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Driver} from "../dto/Driver";
import {HttpClient} from "@angular/common/http";


export const MAIN_URL = "http://localhost:8080";
const URL = "/api/v1/driver";
@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient) { }

  getAllDrivers(): Observable<Array<Driver>>{
    return this.http.get<Array<Driver>>(MAIN_URL + URL+'/all-details');
  }
  deleteDriversr(id: number): Observable<boolean>{
    return this.http.delete<boolean>(MAIN_URL+ URL + "/" + id);
  }

  saveDrivers(driver: Driver): Observable<boolean>{
    return this.http.post<boolean>(MAIN_URL + URL+'/save',driver);
  }
  updateDrivers(driver: Driver): Observable<boolean>{
    return this.http.put<boolean>(MAIN_URL + URL,driver);
  }

  findDriversById(id:any):Observable<Driver>{
    return this.http.get<Driver>(MAIN_URL + URL+'/find?id='+id);
  }



}
