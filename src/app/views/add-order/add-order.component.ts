import {Component, OnInit, ViewChild} from '@angular/core';
import {Orders} from "../../dto/Orders";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrderDetailService} from "../../services/order-detail.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

const SC="success";
const WR="warning";
const DN="danger";
const IS="Order Successfully  Saved";
const INS="Order Not Saved";


@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {
  selectedOrder= new Orders();
  manuallySelected= false;

  submitted = false;
  addorderForm: FormGroup;
  searchId='';

  // alert
  alertType:string;
  alertMessage:string;

  //alert modals
  @ViewChild('alert') private alert;
  @ViewChild('addOrder') private addorder;

  constructor(
    private orderservice: OrderDetailService,
    private _modalService: NgbModal,
    private formBuilder: FormBuilder,
  ) {  }

  ngOnInit() {
    this.addorderForm = this.formBuilder.group({
      orderID:[0, Validators.required],
      times:['', Validators.required],
      orderDate:['', Validators.required],
      advanced:[0, Validators.required],
      customerID:['', Validators.required],


    });
  }
  // convenience getter for easy access to form fields
  get f(): any { return this.addorderForm.controls; }

  // open alert modals
  openModal(type): void{
    console.log("open Modal");
    this._modalService.open(type, { centered: true });
  }


  saveOrder(){

      this.submitted = true;
      if (this.addorderForm.invalid) {
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
      order = this.addorderForm.value;

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
            this.alertMessage=IS;
            this.openModal(this.alert);
            this.manuallySelected=false;
          },error1 => {
            this._modalService.dismissAll();
            this.alertType=DN;
            this.alertMessage=INS;
            this.openModal(this.alert);
            this.manuallySelected=false;
          }
        );
    }
}
