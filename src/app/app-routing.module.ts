import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "./views/main/main.component";
import {RegisterComponent} from "./views/register/register.component";
import {ManageCustomerComponent} from "./views/manage-customer/manage-customer.component";
import {ManageDriverComponent} from "./views/manage-driver/manage-driver.component";
import {ManageVehicleComponent} from "./views/manage-vehicle/manage-vehicle.component";
import {ManageVehicleTypeComponent} from "./views/manage-vehicle-type/manage-vehicle-type.component";
import {PackageManagerComponent} from "./views/package-manager/package-manager.component";
import {AddOrderComponent} from "./views/add-order/add-order.component";
import {WaitingTimeComponent} from "./views/waiting-time/waiting-time.component";
import {ExtraDayChargeComponent} from "./views/extra-day-charge/extra-day-charge.component";
import {ExtraMileChargeComponent} from "./views/extra-mile-charge/extra-mile-charge.component";
import {OrdersComponent} from "./views/orders/orders.component";
import {LoginComponent} from "./views/login/login.component";



const appRoutes: Routes = [
  {
    path: "main",
    component: MainComponent,
    children: [
      {
        path: "registration",
        component: RegisterComponent,
      },
      {
        path: "manage-customer",
        component: ManageCustomerComponent,
      },
      {
        path: "manage-driver",
        component: ManageDriverComponent,
      },
      {
        path: "manage-vehicle",
        component: ManageVehicleComponent,
      },
      {
        path: "manage-vehicle-type",
        component: ManageVehicleTypeComponent,
      },
      {
        path: "package-manager",
        component: PackageManagerComponent,
      },
      {
        path: "addorder",
        component: AddOrderComponent,
      },
      {
        path: "addwaitingcaharge",
        component: WaitingTimeComponent,
      },
      {
        path: "Extra-day-charge",
        component: ExtraDayChargeComponent,
      },
      {
        path: "Extra-mile-charge",
        component: ExtraMileChargeComponent,
      },
      {
        path: "Manage-customer",
        component: ManageCustomerComponent,
      },
      {
        path: "Manage-order",
        component: OrdersComponent,
      }


    ]
  },

  {path: "", pathMatch: "full", redirectTo: "/main/manage-customer"},
  {path: "login", component: LoginComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
