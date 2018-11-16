import {VehicleType} from "./VehicleType";
import {OrderDetails} from "./OrderDetails";

export class Packages{
  packageID:number;
  name:string;
 distance:number;
  days:number;
  hours:string;
  amount:number;
  status:string;
   minimumAdvanced:number;
  orderdetailsList:Array<OrderDetails>;
   vehicleTypeID:VehicleType;

}
