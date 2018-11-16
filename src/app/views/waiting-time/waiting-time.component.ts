import {Component, OnInit, ViewChild} from '@angular/core';
import {ExtraMilageCharge} from "../../dto/ExtraMilageCharge";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ExtraMileChargeService} from "../../services/extra-mile-charge.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Orders} from "../../dto/Orders";
import {OrderDetailService} from "../../services/order-detail.service";
import {WaitingCharge} from "../../dto/WaitingCharge";
import {WaitingTimeService} from "../../services/waiting-time.service";
import {VehicleType} from "../../dto/VehicleType";

const SC="success";
const WR="warning";
const DN="danger";
const IS="waiting charge Successfully  Saved";
const INS="waiting charge Not Saved";
@Component({
  selector: 'app-waiting-time',
  templateUrl: './waiting-time.component.html',
  styleUrls: ['./waiting-time.component.css']
})
export class WaitingTimeComponent implements OnInit {

  selectedWaitingcharge= new WaitingCharge();
  manuallySelected= false;

  submitted = false;
  waitingchargeForm: FormGroup;
  searchId='';

  // alert
  alertType:string;
  alertMessage:string;

  //alert modals
  @ViewChild('alert') private alert;
  @ViewChild('addOrder') private addwaitingcharge;

  constructor(
    private waitingchargeservice: WaitingTimeService,
    private _modalService: NgbModal,
    private formBuilder: FormBuilder,
  ) {  }
  ngOnInit() {
    this.waitingchargeForm = this.formBuilder.group({
      waitingTimeChargeID:[0, Validators.required],
      times:['', Validators.required],
      price:[0, Validators.required],
      vehicleTypeID:[0, Validators.required]

    });
  }
  // convenience getter for easy access to form fields
  get f(): any { return this.waitingchargeForm.controls; }

  // open alert modals
  openModal(type): void{
    console.log("open Modal");
    this._modalService.open(type, { centered: true });
  }


  saveWaitingCharge(){

    this.submitted = true;
    if (this.waitingchargeForm.invalid) {
      console.log("invalid: ");
      return;
    }

    let waitingcharge = {
      waitingTimeChargeID:0,
      times: '',
      price: 0,
      vehicleTypeID: 0
    };
    waitingcharge = this.waitingchargeForm.value;


    this.selectedWaitingcharge.waitingTimeChargeID = waitingcharge['waitingTimeChargeID'];
    this.selectedWaitingcharge.times = waitingcharge['times'];
    this.selectedWaitingcharge.price = waitingcharge['price'];
    this.selectedWaitingcharge.vehicleTypeID.vehicleTypeID = waitingcharge['vehicleTypeID'];


    this.waitingchargeservice.saveWaitingCharge(this.selectedWaitingcharge)
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
