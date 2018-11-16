import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Driver} from "../dto/Driver";
import {VehicleType} from "../dto/VehicleType";

export const MAIN_URL = "http://localhost:8080";
const URL = "/api/v1/vehicletype";

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {

  constructor(private http: HttpClient) { }

  getAllVehicleType(): Observable<Array<VehicleType>>{
    return this.http.get<Array<VehicleType>>(MAIN_URL + URL+'/all-details');
  }
  deleteVehicletype(id: number): Observable<boolean>{
    return this.http.delete<boolean>(MAIN_URL+ URL + "/" + id);
  }

  saveVehicletype(vehicletype: VehicleType): Observable<boolean>{
    return this.http.post<boolean>(MAIN_URL + URL+'/save',vehicletype);
  }
  updateVehicletype(vehicletype: VehicleType): Observable<boolean>{
    return this.http.put<boolean>(MAIN_URL + URL,vehicletype);
  }

  findVehicleTypeById(id:any):Observable<VehicleType>{
    return this.http.get<VehicleType>(MAIN_URL + URL+'/find?id='+id);
  }



}
