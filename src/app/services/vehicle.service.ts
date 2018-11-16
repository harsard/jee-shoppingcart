import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Driver} from "../dto/Driver";
import {Vehicle} from "../dto/Vehicle";


export const MAIN_URL = "http://localhost:8080";
const URL = "/api/v1/vehicle";
@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  getAllVehicles(): Observable<Array<Vehicle>>{
    return this.http.get<Array<Vehicle>>(MAIN_URL + URL+'/all-details');
  }
  deleteVehicle(id: number): Observable<boolean>{
    return this.http.delete<boolean>(MAIN_URL+ URL + "/" + id);
  }

  saveVehicle(Vehicle: Vehicle): Observable<boolean>{
    return this.http.post<boolean>(MAIN_URL + URL+'/save',Vehicle);
  }
  updateVehicle(Vehicle: Vehicle): Observable<boolean>{
    return this.http.put<boolean>(MAIN_URL + URL,Vehicle);
  }

  findVehicleById(id:any):Observable<Vehicle>{
    return this.http.get<Vehicle>(MAIN_URL + URL+'/find?id='+id);
  }



}
