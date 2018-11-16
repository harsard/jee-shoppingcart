import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ExtraMilageCharge} from "../dto/ExtraMilageCharge";

const MAIN_URL= "http://localhost:8080";
const URL = "/api/v1/extra_mile_charge";
@Injectable({
  providedIn: 'root'
})
export class ExtraMileChargeService {
  constructor(private http: HttpClient) { }

  getAllExtraMileCharges(): Observable<Array<ExtraMilageCharge>>{
    return this.http.get<Array<ExtraMilageCharge>>(MAIN_URL + URL+'/all-details');
  }
  deleteExtraMileCharges(id: number): Observable<boolean>{
    return this.http.delete<boolean>(MAIN_URL+ URL + "/" + id);
  }

  saveExtraMileCharges(exMilecharge: ExtraMilageCharge): Observable<boolean>{
    return this.http.post<boolean>(MAIN_URL + URL+'/save',exMilecharge);
  }
  updateextraMileCharges(exMilecharge: ExtraMilageCharge): Observable<boolean>{
    return this.http.put<boolean>(MAIN_URL + URL,exMilecharge);
  }

  findExtraMileChargesById(id:any):Observable<ExtraMilageCharge>{
    return this.http.get<ExtraMilageCharge>(MAIN_URL + URL+'/find?id='+id);
  }
}
