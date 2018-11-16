import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Packages} from "../dto/Packages";
import {Orders} from "../dto/Orders";

const MAIN_URL = "http://localhost:8080";
const URL = "/api/v1/order";

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {
  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<Array<Orders>>{
    return this.http.get<Array<Orders>>(MAIN_URL + URL+'/all-details');
  }
  deleteOrders(id: number): Observable<boolean>{
    return this.http.delete<boolean>(MAIN_URL+ URL + "/" + id);
  }

  saveOrders(packages: Orders): Observable<boolean>{
    return this.http.post<boolean>(MAIN_URL + URL+'/save',packages);
  }
  updateOrders(packages: Orders): Observable<boolean>{
    return this.http.put<boolean>(MAIN_URL + URL,packages);
  }

  findOrdersTypeById(id:any):Observable<Orders>{
    return this.http.get<Orders>(MAIN_URL + URL+'/find?id='+id);
  }
}
