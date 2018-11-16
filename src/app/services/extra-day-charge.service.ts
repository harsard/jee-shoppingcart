import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Orders} from "../dto/Orders";
import {ExtraDayCharge} from "../dto/ExtraDayCharge";

const MAIN_URL = "http://localhost:8080";
const URL = "/api/v1/extra_day_charge";
@Injectable({
  providedIn: 'root'
})
export class ExtraDayChargeService {

  constructor(private http: HttpClient) { }

  getAllExtraDayCharges(): Observable<Array<ExtraDayCharge>>{
    return this.http.get<Array<ExtraDayCharge>>(MAIN_URL + URL+'/all-details');
  }
  deleteExtradayCharges(id: number): Observable<boolean>{
    return this.http.delete<boolean>(MAIN_URL+ URL + "/" + id);
  }

  saveExtraDayCharges(exdaycharge: ExtraDayCharge): Observable<boolean>{
    return this.http.post<boolean>(MAIN_URL + URL+'/save',exdaycharge);
  }
  updateextradayCharges(exdaycharge: ExtraDayCharge): Observable<boolean>{
    return this.http.put<boolean>(MAIN_URL + URL,exdaycharge);
  }

  findExtradayChargesById(id:any):Observable<ExtraDayCharge>{
    return this.http.get<ExtraDayCharge>(MAIN_URL + URL+'/find?id='+id);
  }
}
