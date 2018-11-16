import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Customer} from "../dto/Customer";
import {Observable} from "rxjs";
import {WaitingCharge} from "../dto/WaitingCharge";

export const MAIN_URL = "http://localhost:8080";
const URL = "/api/v1/waitingcharge";

@Injectable({
  providedIn: 'root'
})
export class WaitingTimeService {

  constructor(private http: HttpClient) {
  }

  saveWaitingCharge(waitingcharge: WaitingCharge): Observable<boolean> {
    console.log("customer service " + JSON.stringify(waitingcharge));
    return this.http.post<boolean>(MAIN_URL + URL + '/save', waitingcharge);
  }
}
