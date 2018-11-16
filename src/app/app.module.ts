import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MainComponent } from './views/main/main.component';
import {AppRoutingModule} from "./app-routing.module";
import { RegisterComponent } from './views/register/register.component';
import { ManageVehicleComponent } from './views/manage-vehicle/manage-vehicle.component';
import { ManageDriverComponent } from './views/manage-driver/manage-driver.component';
import { ManageCustomerComponent } from './views/manage-customer/manage-customer.component';
import { PackageManagerComponent } from './views/package-manager/package-manager.component';
import { ManageVehicleTypeComponent } from './views/manage-vehicle-type/manage-vehicle-type.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { ExtraDayChargeComponent } from './views/extra-day-charge/extra-day-charge.component';
import { ExtraMileChargeComponent } from './views/extra-mile-charge/extra-mile-charge.component';
import { WaitingTimeComponent } from './views/waiting-time/waiting-time.component';

import { OrdersComponent } from './views/orders/orders.component';
import { AddOrderComponent } from './views/add-order/add-order.component';
import { LoginComponent } from './views/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RegisterComponent,
    ManageVehicleComponent,
    ManageDriverComponent,
    ManageCustomerComponent,
    PackageManagerComponent,
    ManageVehicleTypeComponent,
    ExtraDayChargeComponent,
    ExtraMileChargeComponent,
    WaitingTimeComponent,
    OrdersComponent,
    AddOrderComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
