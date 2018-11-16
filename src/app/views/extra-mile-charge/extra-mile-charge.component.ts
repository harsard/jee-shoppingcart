import {Component, OnInit, ViewChild} from '@angular/core';
import {ExtraDayCharge} from "../../dto/ExtraDayCharge";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ExtraDayChargeService} from "../../services/extra-day-charge.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Vehicle} from "../../dto/Vehicle";
import {ExtraMilageCharge} from "../../dto/ExtraMilageCharge";
import {ExtraMileChargeService} from "../../services/extra-mile-charge.service";

const SC="success";
const WR="warning";
const DN="danger";
const IS="Extra Mile Charge Successfully  Saved";
const INS="Extra Mile Charge Not Saved";
const IU="Extra Mile Charge Successfully Updated";
const IUF="Extra Mile Charge  Update failed !!";
const ID="Extra Mile Charge Successfully Deleted";
const IDF="Extra Mile Charge Delete failed !!";
const PS="Please Mile The Extra day Charge";
const INF="Extra Mile Charge Not Found";
const ISE="Please Enter the Seach Extra Mile Charge";

@Component({
  selector: 'app-extra-mile-charge',
  templateUrl: './extra-mile-charge.component.html',
  styleUrls: ['./extra-mile-charge.component.css']
})
export class ExtraMileChargeComponent implements OnInit {

  extra_milecharges: Array<ExtraMilageCharge> = [];
  selectedextramilecharge= new ExtraMilageCharge();
  manuallySelected= false;

  submitted = false;
  extramilechargeForm: FormGroup;
  searchId='';



  // alert
  alertType:string;
  alertMessage:string;

  //alert modals
  @ViewChild('alert') private alert;
  @ViewChild('additem') private extramilecharge;

  constructor(
    private extramilechargeservice: ExtraMileChargeService,
    private _modalService: NgbModal,
    private formBuilder: FormBuilder,
  ) {  }


  ngOnInit() {
    this.loadExtraMilecharges();
    this.extramilechargeForm = this.formBuilder.group({
      extraDayChargeID:[0, Validators.required],
      dayCount:[0, Validators.required],
      price:[0, Validators.required],
      vehicleTypeID:[0, Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f(): any { return this.extramilechargeForm.controls; }

  // open alert modals
  openModal(type): void{
    console.log("openModal");
    this._modalService.open(type, { centered: true });
  }

  loadExtraMilecharges(): void {
    this.extramilechargeservice.getAllExtraMileCharges().subscribe(
      (result) => {
        this.extra_milecharges = result;
      });
  }

  saveExtradaycharge(){
    this.selectedextramilecharge=new ExtraMilageCharge();
    console.log("saveCustomer");
    this.submitted = true;
    if (this.extramilechargeForm.invalid) {
      console.log("invalid: ");
      return;
    }
    let extramilecharge = {
      extraMileageChargeID:0,
      mileage: 0,
      price: 0,
      vehicleTypeID: 0
    };
    extramilecharge = this.extramilechargeForm.value;


    this.selectedextramilecharge.extraMileageChargeID = extramilecharge['extraMileageChargeID'];
    this.selectedextramilecharge.mileage = extramilecharge['mileage'];
    this.selectedextramilecharge.price = extramilecharge['price'];
    this.selectedextramilecharge.vehicleTypeID.vehicleTypeID = extramilecharge['vehicleTypeID'];



    this.extramilechargeservice.saveExtraMileCharges(this.selectedextramilecharge)
      .subscribe(
        (result) => {

          this._modalService.dismissAll();
          this.alertType=SC;
          this.alertMessage=IS;
          this.openModal(this.alert);
          this.manuallySelected=false;
          this.loadExtraMilecharges();

        },error1 => {

          this._modalService.dismissAll();
          this.alertType=DN;
          this.alertMessage=INS+": "+JSON.stringify(error1);
          this.openModal(this.alert);
          this.manuallySelected=false;
        });
  }

  deleteextraMilecharges(vehicle?:ExtraMilageCharge): void {
    // if table raw not selected
    if (!this.manuallySelected) {
      this._modalService.dismissAll();
      this.alertType=WR;
      this.alertMessage=PS;
      this.openModal(this.alert);
    } else {


      this.extramilechargeservice.deleteExtraMileCharges(this.selectedextramilecharge.extraMileageChargeID).subscribe(data => {
        this._modalService.dismissAll();
        this.alertType=SC;
        this.alertMessage=ID;
        this.openModal(this.alert);
        this.manuallySelected=false;
        this.loadExtraMilecharges();
      }, error1 => {
        this._modalService.dismissAll();
        this.alertType=DN;
        this.alertMessage=IDF;
        this.openModal(this.alert);
        this.manuallySelected=false;
      });
    }
  }
  selectExtraMilecharges(exmch:ExtraMilageCharge): void {
    this.manuallySelected=true;
    console.log("select Supplier");
    this.selectedextramilecharge = exmch;
  }

  editExtraMilecharges(){
    if(!this.manuallySelected){
      this.alertType=WR;
      this.alertMessage=PS;
      this.openModal(this.alert);
    }else{
      this.openModal(this.extramilecharge);
    }
  }


  updateExtraMilecharges(){
    this.submitted = true;
    if (this.extramilechargeForm.invalid) {
      console.log("invalid: ");
      return;
    }

    let extramilecharge = {
      extraMileageChargeID:0,
      mileage: 0,
      price: 0,
      vehicleTypeID: 0
    };
    extramilecharge = this.extramilechargeForm.value;


    this.selectedextramilecharge.extraMileageChargeID = extramilecharge['extraMileageChargeID'];
    this.selectedextramilecharge.mileage = extramilecharge['mileage'];
    this.selectedextramilecharge.price = extramilecharge['price'];
    this.selectedextramilecharge.vehicleTypeID.vehicleTypeID = extramilecharge['vehicleTypeID'];



    this.extramilechargeservice.updateextraMileCharges(this.selectedextramilecharge)
      .subscribe(
        (result) => {
          console.log(JSON.stringify(result));
          this._modalService.dismissAll();
          this.alertType=SC;
          this.alertMessage=IU;
          this.openModal(this.alert);
          this.manuallySelected=false;
          this.loadExtraMilecharges();
        },error1 => {
          this._modalService.dismissAll();
          this.alertType=DN;
          this.alertMessage=IUF;
          this.openModal(this.alert);
          this.manuallySelected=false;
        }
      );
  }

  findExtraMilechargeById(){
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

    this.extramilechargeservice.findExtraMileChargesById(this.searchId).subscribe(
      items=>{
        this.extra_milecharges=[];
        console.log(JSON.stringify(items));
        this.extra_milecharges.push(items);
        console.log("this.items.length 22 "+this.extra_milecharges.length);
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

