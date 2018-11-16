import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Customer} from "../dto/Customer";
import {HttpClient} from "@angular/common/http";
import {Driver} from "../dto/Driver";


export const MAIN_URL = "http://localhost:8080";
const URL = "/api/v1/customer";


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }


  getAllCustomers(): Observable<Array<Customer>> {

    const observable = this.http.get<Array<Customer>>(MAIN_URL + URL);


    return observable;
  }

  deleteCustomer(id: any): Observable<boolean> {
    return this.http.delete<boolean>(MAIN_URL + URL + "/" + id);
  }

  saveCustomer(customer: Customer): Observable<boolean> {
    console.log("customer service "+JSON.stringify(customer));
    return this.http.post<boolean>(MAIN_URL + URL + '/saveuser', customer );
  }

  getTotalCustomers(): Observable<number> {
    return this.http.get<number>(MAIN_URL + URL + "/count");
  }


  getCustomerById(id:any) {
    return this.http.get<Customer>(MAIN_URL + URL + "/finduser/"+id);
  }
  updateCustomer(customer: Customer): Observable<boolean>{
    return this.http.put<boolean>(MAIN_URL + URL,customer);
  }
}
