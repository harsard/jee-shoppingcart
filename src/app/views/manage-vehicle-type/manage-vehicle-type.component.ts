import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VehicleType} from "../../dto/VehicleType";
import {VehicleService} from "../../services/vehicle.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {VehicleTypeService} from "../../services/vehicle-type.service";

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
  selector: 'app-manage-vehicle-type',
  templateUrl: './manage-vehicle-type.component.html',
  styleUrls: ['./manage-vehicle-type.component.css']
})
export class ManageVehicleTypeComponent implements OnInit {

  vehicleTypes: Array<VehicleType> = [];
  selectedvehicletype= new VehicleType();
  manuallySelected= false;

  submitted = false;
  vehicletypeForm: FormGroup;
  searchId='';
  searchItemNotFound=true;


  // alert
  alertType:string;
  alertMessage:string;

  //alert modals
  @ViewChild('alert') private alert;
  @ViewChild('additem') private additem;

  constructor(
    private vehicletypeservice: VehicleTypeService,
    private _modalService: NgbModal,
    private formBuilder: FormBuilder
    ) {  }

  ngOnInit() {
    this.loadAllVehiclTypes();
    this.vehicletypeForm = this.formBuilder.group({
      vehicleTypeID:[0, Validators.required],
      fuelType:['', Validators.required],
      typeName: ['', Validators.required]

    });
  }

  // convenience getter for easy access to form fields
  get f(): any { return this.vehicletypeForm.controls; }

  // open alert modals
  openModal(type): void{
    console.log("openAddCustomerModal");
    this._modalService.open(type, { centered: true });
  }

  loadAllVehiclTypes(): void {
    this.vehicletypeservice.getAllVehicleType().subscribe(
      (result) => {
        this.vehicleTypes = result;
      });
  }

  saveVehicleType(){
    this.selectedvehicletype=new VehicleType();
    console.log("saveCustomer");
    this.submitted = true;
    if (this.vehicletypeForm.invalid) {
      console.log("invalid: ");
      return;
    }
    let vtype = {
      vehicleTypeID:0,
      fuelType: '',
      typeName:''
    };
    vtype = this.vehicletypeForm.value;


    this.selectedvehicletype.vehicleTypeID = vtype['vehicleTypeID'];
    this.selectedvehicletype.fuelType = vtype['fuelType'];
    this.selectedvehicletype.typeName = vtype['typeName'];


    this.vehicletypeservice.saveVehicletype(this.selectedvehicletype)
      .subscribe(
        (result) => {

          this._modalService.dismissAll();
          this.alertType=SC;
          this.alertMessage=IS;
          this.openModal(this.alert);
          this.manuallySelected=false;
          this.loadAllVehiclTypes();

        },error1 => {

          this._modalService.dismissAll();
          this.alertType=DN;
          this.alertMessage=INS+": "+JSON.stringify(error1);
          this.openModal(this.alert);
          this.manuallySelected=false;
        });
  }

  deleteVehiclType(vtype?:VehicleType): void {
    // if table raw not selected
    if (!this.manuallySelected) {
      this._modalService.dismissAll();
      this.alertType=WR;
      this.alertMessage=PS;
      this.openModal(this.alert);
    } else {


      this.vehicletypeservice.deleteVehicletype(this.selectedvehicletype.vehicleTypeID).subscribe(data => {
        this._modalService.dismissAll();
        this.alertType=SC;
        this.alertMessage=ID;
        this.openModal(this.alert);
        this.manuallySelected=false;
        this.loadAllVehiclTypes();
      }, error1 => {
        this._modalService.dismissAll();
        this.alertType=DN;
        this.alertMessage=IDF;
        this.openModal(this.alert);
        this.manuallySelected=false;
      });
    }
  }
  selectVehicleType(vtype: VehicleType): void {
    this.manuallySelected=true;
    console.log("select Supplier");
    this.selectedvehicletype = vtype;
  }

  editVehicle(){
    if(!this.manuallySelected){
      this.alertType=WR;
      this.alertMessage=PS;
      this.openModal(this.alert);
    }else{
      this.openModal(this.additem);
    }
  }


  updateVehicleType(){
    this.submitted = true;
    if (this.vehicletypeForm.invalid) {
      console.log("invalid: ");
      return;
    }

    let vtype = {
      vehicleTypeID:0,
      fuelType: '',
      typeName:''
    };
    vtype = this.vehicletypeForm.value;


    this.selectedvehicletype.vehicleTypeID = vtype['vehicleTypeID'];
    this.selectedvehicletype.fuelType = vtype['fuelType'];
    this.selectedvehicletype.typeName = vtype['typeName'];

    this.vehicletypeservice.updateVehicletype(this.selectedvehicletype)
      .subscribe(
        (result) => {
          console.log(JSON.stringify(result));
          this._modalService.dismissAll();
          this.alertType=SC;
          this.alertMessage=IU;
          this.openModal(this.alert);
          this.manuallySelected=false;
          this.loadAllVehiclTypes();
        },error1 => {
          this._modalService.dismissAll();
          this.alertType=DN;
          this.alertMessage=IUF;
          this.openModal(this.alert);
          this.manuallySelected=false;
        }
      );
  }

  findVehicleTypeById(){
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

    this.vehicletypeservice.findVehicleTypeById(this.searchId).subscribe(
      items=>{
        this.vehicleTypes=[];
        console.log(JSON.stringify(items));
        this.vehicleTypes.push(items);
        console.log("this.items.length 22 "+this.vehicleTypes.length);
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
