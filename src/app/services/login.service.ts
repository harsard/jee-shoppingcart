import { Injectable } from '@angular/core';
import {Appuser} from "../dto/Appuser";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

const MAIN_URL = "http://localhost:8080";
const URL = "/api/v1/login";
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(appuser:Appuser): Observable<Appuser> {

    return this.http.post<Appuser>(MAIN_URL + URL + '/saveuser', appuser );
  }



}
