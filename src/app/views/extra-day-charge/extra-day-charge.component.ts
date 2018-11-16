import {Component, OnInit, ViewChild} from '@angular/core';
import {Packages} from "../../dto/Packages";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PackegeManagerService} from "../../services/packege-manager.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Vehicle} from "../../dto/Vehicle";
import {ExtraDayCharge} from "../../dto/ExtraDayCharge";
import {ExtraDayChargeService} from "../../services/extra-day-charge.service";
import {VehicleType} from "../../dto/VehicleType";

const SC="success";
const WR="warning";
const DN="danger";
const IS="Extra day Charge Successfully  Saved";
const INS="Extra day Charge Not Saved";
const IU="Extra day Charge Successfully Updated";
const IUF="Extra day Charge  Update failed !!";
const ID="Extra day Charge Successfully Deleted";
const IDF="Extra day Charge Delete failed !!";
const PS="Please Select The Extra day Charge";
const INF="Extra day Charge Not Found";
const ISE="Please Enter the Seach Extra day Charge";
@Component({
  selector: 'app-extra-day-charge',
  templateUrl: './extra-day-charge.component.html',
  styleUrls: ['./extra-day-charge.component.css']
})
export class ExtraDayChargeComponent implements OnInit {

  extra_daycharges: Array<ExtraDayCharge> = [];
  selectedextradaycharge= new ExtraDayCharge();
  manuallySelected= false;

  submitted = false;
  extradaychargeForm: FormGroup;
  searchId='';
  


  // alert
  alertType:string;
  alertMessage:string;

  //alert modals
  @ViewChild('alert') private alert;
  @ViewChild('additem') private extradaycharge;

  constructor(
    private extradaychargeservice: ExtraDayChargeService,
    private _modalService: NgbModal,
    private formBuilder: FormBuilder,
  ) {  }


  ngOnInit() {
    this.loadExtradaycharges();
    this.extradaychargeForm = this.formBuilder.group({
      extraDayChargeID:[0, Validators.required],
      dayCount:[0, Validators.required],
      price:[0, Validators.required],
      vehicleTypeID:[0, Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f(): any { return this.extradaychargeForm.controls; }

  // open alert modals
  openModal(type): void{
    console.log("openModal");
    this._modalService.open(type, { centered: true });
  }

  loadExtradaycharges(): void {
    this.extradaychargeservice.getAllExtraDayCharges().subscribe(
      (result) => {
        this.extra_daycharges = result;
      });
  }

  saveExtradaycharge(){
    this.selectedextradaycharge=new ExtraDayCharge();
    console.log("saveCustomer");
    this.submitted = true;
    if (this.extradaychargeForm.invalid) {
      console.log("invalid: ");
      return;
    }
    let extradaycharge = {
      extraDayChargeID:0,
      dayCount: 0,
      price: 0,
      vehicleTypeID: 0
    };
    extradaycharge = this.extradaychargeForm.value;


    this.selectedextradaycharge.extraDayChargeID = extradaycharge['extraDayChargeID'];
    this.selectedextradaycharge.dayCount = extradaycharge['dayCount'];
    this.selectedextradaycharge.price = extradaycharge['price'];
    this.selectedextradaycharge.vehicleTypeID.vehicleTypeID = extradaycharge['vehicleTypeID'];



    this.extradaychargeservice.saveExtraDayCharges(this.selectedextradaycharge)
      .subscribe(
        (result) => {

          this._modalService.dismissAll();
          this.alertType=SC;
          this.alertMessage=IS;
          this.openModal(this.alert);
          this.manuallySelected=false;
          this.loadExtradaycharges();

        },error1 => {

          this._modalService.dismissAll();
          this.alertType=DN;
          this.alertMessage=INS+": "+JSON.stringify(error1);
          this.openModal(this.alert);
          this.manuallySelected=false;
        });
  }

  deleteextradaycharges(vehicle?:Vehicle): void {
    // if table raw not selected
    if (!this.manuallySelected) {
      this._modalService.dismissAll();
      this.alertType=WR;
      this.alertMessage=PS;
      this.openModal(this.alert);
    } else {


      this.extradaychargeservice.deleteExtradayCharges(this.selectedextradaycharge.extraDayChargeID).subscribe(data => {
        this._modalService.dismissAll();
        this.alertType=SC;
        this.alertMessage=ID;
        this.openModal(this.alert);
        this.manuallySelected=false;
        this.loadExtradaycharges();
      }, error1 => {
        this._modalService.dismissAll();
        this.alertType=DN;
        this.alertMessage=IDF;
        this.openModal(this.alert);
        this.manuallySelected=false;
      });
    }
  }
  selectExtradaycharges(exdch:ExtraDayCharge): void {
    this.manuallySelected=true;
    console.log("select Supplier");
    this.selectedextradaycharge = exdch;
  }

  editExtradaycharges(){
    if(!this.manuallySelected){
      this.alertType=WR;
      this.alertMessage=PS;
      this.openModal(this.alert);
    }else{
      this.openModal(this.extradaycharge);
    }
  }


  updateExtradaycharges(){
    this.submitted = true;
    if (this.extradaychargeForm.invalid) {
      console.log("invalid: ");
      return;
    }

     let extradaycharge = {
      extraDayChargeID:0,
      dayCount: 0,
      price: 0,
      vehicleTypeID: 0
    };
    extradaycharge = this.extradaychargeForm.value;


    this.selectedextradaycharge.extraDayChargeID = extradaycharge['extraDayChargeID'];
    this.selectedextradaycharge.dayCount = extradaycharge['dayCount'];
    this.selectedextradaycharge.price = extradaycharge['price'];
    this.selectedextradaycharge.vehicleTypeID.vehicleTypeID = extradaycharge['vehicleTypeID'];


    this.extradaychargeservice.updateextradayCharges(this.selectedextradaycharge)
      .subscribe(
        (result) => {
          console.log(JSON.stringify(result));
          this._modalService.dismissAll();
          this.alertType=SC;
          this.alertMessage=IU;
          this.openModal(this.alert);
          this.manuallySelected=false;
          this.loadExtradaycharges();
        },error1 => {
          this._modalService.dismissAll();
          this.alertType=DN;
          this.alertMessage=IUF;
          this.openModal(this.alert);
          this.manuallySelected=false;
        }
      );
  }

  findExtradaychargeById(){
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

    this.extradaychargeservice.findExtradayChargesById(this.searchId).subscribe(
      items=>{
        this.extra_daycharges=[];
        console.log(JSON.stringify(items));
        this.extra_daycharges.push(items);
        console.log("this.items.length 22 "+this.extra_daycharges.length);
        if(items==null){
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

