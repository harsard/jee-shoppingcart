import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Vehicle} from "../../dto/Vehicle";
import {VehicleService} from "../../services/vehicle.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

const SC="success";
const WR="warning";
const DN="danger";
const IS="Item Successfully  Saved";
const INS="Item Not Saved";
const IU="Item Successfully Updated";
const IUF="Item  Update failed !!";
const ID="Item Successfully Deleted";
const IDF="Item Delete failed !!";
const PS="Please Select The Item";
const INF="Item Not Found";
const ISE="Please Enter the Seach Item";


@Component({
  selector: 'app-manage-vehicle',
  templateUrl: './manage-vehicle.component.html',
  styleUrls: ['./manage-vehicle.component.css']
})
export class ManageVehicleComponent implements OnInit {

  vehicles: Array<Vehicle> = [];
  selectedVehicle= new Vehicle();
  manuallySelected= false;

  submitted = false;
  vehicleForm: FormGroup;
  searchId='';
  searchvehicleNotFound=true;


  // alert
  alertType:string;
  alertMessage:string;

  //alert modals
  @ViewChild('alert') private alert;
  @ViewChild('additem') private addVehicle;

  constructor(
    private vehicleservice: VehicleService,
    private _modalService: NgbModal,
    private formBuilder: FormBuilder,
    ) {  }


  ngOnInit() {
    this.loadAllVehicles();
    this.vehicleForm = this.formBuilder.group({
      vehicleID:[0, Validators.required],
      colour:['', Validators.required],
      seatCount:[0, Validators.required],
      available:[0, Validators.required],
      status:['', Validators.required],
      regNo:['', Validators.required],
      district:['', Validators.required],
      city: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f(): any { return this.vehicleForm.controls; }

  // open alert modals
  openModal(type): void{
    console.log("openAddCustomerModal");
    this._modalService.open(type, { centered: true });
  }

  loadAllVehicles(): void {
    this.vehicleservice.getAllVehicles().subscribe(
      (result) => {
        this.vehicles = result;
      });
  }

  saveVehicle(){
    this.selectedVehicle=new Vehicle();
    console.log("saveCustomer");
    this.submitted = true;
    if (this.vehicleForm.invalid) {
      console.log("invalid: ");
      return;
    }
    let item = {
      vehicleID:0,
      colour: '',
      seatCount: 0,
      status: '',
      available: '',
      regNo: '',
      district: '',
      city: ''

    };
    item = this.vehicleForm.value;

    this.selectedVehicle.vehicleID = item['vehicleID'];
    this.selectedVehicle.colour = item['colour'];
    this.selectedVehicle.seatCount = item['seatCount'];
    this.selectedVehicle.status = item['status'];
    this.selectedVehicle.available = item['available'];
    this.selectedVehicle.regNo = item['regNo'];
    this.selectedVehicle.district = item['district'];
    this.selectedVehicle.city = item['city'];


    this.vehicleservice.saveVehicle(this.selectedVehicle)
      .subscribe(
        (result) => {

          this._modalService.dismissAll();
          this.alertType=SC;
          this.alertMessage=IS;
          this.openModal(this.alert);
          this.manuallySelected=false;
          this.loadAllVehicles();

        },error1 => {

          this._modalService.dismissAll();
          this.alertType=DN;
          this.alertMessage=INS+": "+JSON.stringify(error1);
          this.openModal(this.alert);
          this.manuallySelected=false;
        });
  }

  deleteVehicle(vehicle?:Vehicle): void {
    // if table raw not selected
    if (!this.manuallySelected) {
      this._modalService.dismissAll();
      this.alertType=WR;
      this.alertMessage=PS;
      this.openModal(this.alert);
    } else {


      this.vehicleservice.deleteVehicle(this.selectedVehicle.vehicleID).subscribe(data => {
        this._modalService.dismissAll();
        this.alertType=SC;
        this.alertMessage=ID;
        this.openModal(this.alert);
        this.manuallySelected=false;
        this.loadAllVehicles();
      }, error1 => {
        this._modalService.dismissAll();
        this.alertType=DN;
        this.alertMessage=IDF;
        this.openModal(this.alert);
        this.manuallySelected=false;
      });
    }
  }
  selectVehicle(vehicle:Vehicle): void {
    this.manuallySelected=true;
    console.log("select Supplier");
    this.selectedVehicle = vehicle;
  }

  editVehicle(){
    if(!this.manuallySelected){
      this.alertType=WR;
      this.alertMessage=PS;
      this.openModal(this.alert);
    }else{
      this.openModal(this.addVehicle);
    }
  }


  updateVehicle(){
    this.submitted = true;
    if (this.vehicleForm.invalid) {
      console.log("invalid: ");
      return;
    }

    let item = {
      vehicleID:0,
      colour: '',
      seatCount: 0,
      status: '',
      available: '',
      regNo: '',
      district: '',
      city: ''

    };
    item = this.vehicleForm.value;

    this.selectedVehicle.vehicleID = item['vehicleID'];
    this.selectedVehicle.colour = item['colour'];
    this.selectedVehicle.seatCount = item['seatCount'];
    this.selectedVehicle.status = item['status'];
    this.selectedVehicle.available = item['available'];
    this.selectedVehicle.regNo = item['regNo'];
    this.selectedVehicle.district = item['district'];
    this.selectedVehicle.city = item['city'];

    this.vehicleservice.updateVehicle(this.selectedVehicle)
      .subscribe(
        (result) => {
          console.log(JSON.stringify(result));
          this._modalService.dismissAll();
          this.alertType=SC;
          this.alertMessage=IU;
          this.openModal(this.alert);
          this.manuallySelected=false;
          this.loadAllVehicles();
        },error1 => {
          this._modalService.dismissAll();
          this.alertType=DN;
          this.alertMessage=IUF;
          this.openModal(this.alert);
          this.manuallySelected=false;
        }
      );
  }

  findvehicleById(){
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

    this.vehicleservice.findVehicleById(this.searchId).subscribe(
      items=>{
        this.vehicles=[];
        console.log(JSON.stringify(items));
        this.vehicles.push(items);
        console.log("this.items.length 22 "+this.vehicles.length);
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
