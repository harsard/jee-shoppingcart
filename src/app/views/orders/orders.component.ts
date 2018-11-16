import {Component, OnInit, ViewChild} from '@angular/core';
import {Packages} from "../../dto/Packages";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PackegeManagerService} from "../../services/packege-manager.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Vehicle} from "../../dto/Vehicle";
import {Customer} from "../../dto/Customer";

import {OrderDetailService} from "../../services/order-detail.service";
import {Orders} from "../../dto/Orders";

const SC="success";
const WR="warning";
const DN="danger";
const IS="Order Successfully  Saved";
const INS="Order Not Saved";
const IU="Order Successfully Updated";
const IUF="Order  Update failed !!";
const ID="Order Successfully Deleted";
const IDF="Order Delete failed !!";
const PS="Please Select The Order";
const INF="Order Not Found";
const ISE="Please Enter the Seach Order";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Array<Orders> = [];
  selectedOrder= new Orders();
  manuallySelected= false;

  submitted = false;
  orderForm: FormGroup;
  searchId='';



  // alert
  alertType:string;
  alertMessage:string;

  //alert modals
  @ViewChild('alert') private alert;
  @ViewChild('addOrder') private addorder;

  orderID:number;
  times:string;
  orderDate:string;
  advanced:number;
  customerID:Customer;

  constructor(
    private orderservice: OrderDetailService,
    private _modalService: NgbModal,
    private formBuilder: FormBuilder,
  ) {  }


  ngOnInit() {
    this.loadAllOrders();
    this.orderForm = this.formBuilder.group({
      orderID:[0, Validators.required],
      times:['', Validators.required],
      orderDate:['', Validators.required],
      advanced:[0, Validators.required],
      customerID:['', Validators.required]

    });
  }

  // convenience getter for easy access to form fields
  get f(): any { return this.orderForm.controls; }

  // open alert modals
  openModal(type): void{
    console.log("openAddCustomerModal");
    this._modalService.open(type, { centered: true });
  }

  loadAllOrders(): void {
    this.orderservice.getAllOrders().subscribe(
      (result) => {
        this.orders = result;
      });
  }

  

  deleteOrder(vehicle?:Vehicle): void {
    // if table raw not selected
    if (!this.manuallySelected) {
      this._modalService.dismissAll();
      this.alertType=WR;
      this.alertMessage=PS;
      this.openModal(this.alert);
    } else {


      this.orderservice.deleteOrders(this.selectedOrder.orderID).subscribe(data => {
        this._modalService.dismissAll();
        this.alertType=SC;
        this.alertMessage=ID;
        this.openModal(this.alert);
        this.manuallySelected=false;
        this.loadAllOrders();
      }, error1 => {
        this._modalService.dismissAll();
        this.alertType=DN;
        this.alertMessage=IDF;
        this.openModal(this.alert);
        this.manuallySelected=false;
      });
    }
  }
  selectOrder(order:Orders): void {
    this.manuallySelected=true;
  
    this.selectedOrder = order;
  }

  editOrder(){
    if(!this.manuallySelected){
      this.alertType=WR;
      this.alertMessage=PS;
      this.openModal(this.alert);
    }else{
      this.openModal(this.addorder);
    }
  }


  updateOrder(){
    this.submitted = true;
    if (this.orderForm.invalid) {
      console.log("invalid: ");
      return;
    }

    let order = {
      orderID:0,
      times: '',
      orderDate: '',
      advanced: 0,
      customerID: '' 
    };
    order = this.orderForm.value;
   

    this.selectedOrder.orderID = order['orderID'];
    this.selectedOrder.times = order['times'];
    this.selectedOrder.orderDate = order['orderDate'];
    this.selectedOrder.advanced = order['advanced'];
    //this.selectedOrder.customerID = order['customerID'];
    
    this.orderservice.updateOrders(this.selectedOrder)
      .subscribe(
        (result) => {
          console.log(JSON.stringify(result));
          this._modalService.dismissAll();
          this.alertType=SC;
          this.alertMessage=IU;
          this.openModal(this.alert);
          this.manuallySelected=false;
          this.loadAllOrders();
        },error1 => {
          this._modalService.dismissAll();
          this.alertType=DN;
          this.alertMessage=IUF;
          this.openModal(this.alert);
          this.manuallySelected=false;
        }
      );
  }

  findOrderById(){
    // let s = this.searchId.trim();
    // this.searchId.replace(/\s/g, "").toLocaleLowerCase();
    // alert(this.searchId);
    if(this.searchId==''){
      // alert("emty");
      this.alertType=WR;
      this.alertMessage=ISE;
      this.openModal(this.alert);
      return;
    }

    this.orderservice.findOrdersTypeById(this.searchId).subscribe(
      Orders=>{
        this.orders=[];
        console.log(JSON.stringify(Orders));
        this.orders.push(Orders);
        console.log("this.Orders.length 22 "+this.orders.length);
        if(Orders==null){
          this.alertType=WR;
          this.alertMessage=INF;
          this.openModal(this.alert);
        }
      },
      error1 => {
        this.alertType=WR;
        this.alertMessage=INF+": "+JSON.stringify(error1);
        this.openModal(this.alert);
        console.log(JSON.stringify("error :"+error1));
        this.manuallySelected=false;
      });
  }
}
