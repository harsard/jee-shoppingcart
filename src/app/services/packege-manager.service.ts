import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {VehicleType} from "../dto/VehicleType";
import {Packages} from "../dto/Packages";


 const MAIN_URL = "http://localhost:8080";
const URL = "/api/v1/packagemanager";
@Injectable({
  providedIn: 'root'
})
export class PackegeManagerService {
  constructor(private http: HttpClient) { }

  getAllPackageType(): Observable<Array<Packages>>{
    return this.http.get<Array<Packages>>(MAIN_URL + URL+'/all-details');
  }
  deletePackageType(id: number): Observable<boolean>{
    return this.http.delete<boolean>(MAIN_URL+ URL + "/" + id);
  }

  savePackageType(packages: Packages): Observable<boolean>{
    return this.http.post<boolean>(MAIN_URL + URL+'/save',packages);
  }
  updatePackageType(packages: Packages): Observable<boolean>{
    return this.http.put<boolean>(MAIN_URL + URL,packages);
  }

  findPackageTypeById(id:any):Observable<Packages>{
    return this.http.get<Packages>(MAIN_URL + URL+'/find?id='+id);
  }
}
