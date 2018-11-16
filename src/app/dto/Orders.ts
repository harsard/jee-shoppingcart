import {Customer} from "./Customer";
import {OrderDetails} from "./OrderDetails";

export class Orders {
  orderID:number;
  times:string;
  orderDate:string;
 advanced:number;
  customerID:Customer;
  orderdetailsList :Array<OrderDetails>;



}

