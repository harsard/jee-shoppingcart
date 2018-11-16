import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Driver} from "../../dto/Driver";
import {DriverService} from "../../services/driver.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-manage-driver',
  templateUrl: './manage-driver.component.html',
  styleUrls: ['./manage-driver.component.css']
})
export class ManageDriverComponent implements OnInit {

  drivers: Array<Driver> = [];
  selectedDriver= new Driver();
  manuallySelected= false;
  submitted = false;
  driverForm: FormGroup;
  searchId:any;

  @ViewChild('success') private success;
  @ViewChild('unsuccess') private unsuccess;
  @ViewChild('alert') private alert;
  @ViewChild('addsupplier') private adddriver;

  constructor(
    private driverservice: DriverService,
    private _modalService: NgbModal,
    private formBuilder: FormBuilder,

  ) {  }

  ngOnInit() {
    this.loadAllDrivers();
    this.driverForm = this.formBuilder.group({
      driverID:[0, Validators.required],
      licenceNumber:['', Validators.required],
      fullName: ['', Validators.required],
      preferredName: ['', Validators.required],
      address: ['', Validators.required],
      telNo1: ['', Validators.required],
      telNo2: ['', Validators.required],
      rating: ['', Validators.required],
      activeDate: ['', Validators.required],
      status: ['', Validators.required],

    });
  }
  // convenience getter for easy access to form fields
  get f(): any { return this.driverForm.controls; }


  loadAllDrivers(): void {
    this.driverservice.getAllDrivers().subscribe(
      (result) => {
        this.drivers = result;

        console.log(this.drivers);
      }
    )
  }

  deleteDrivers(driver: Driver): void {
    if (!this.manuallySelected) {
      this._modalService.dismissAll();
      this.openModal(this.alert);
    } else {
      this.driverservice.deleteDriversr(this.selectedDriver.driverID).subscribe(data => {
        this._modalService.dismissAll();
        this.openModal(this.success);
        this.manuallySelected=false;
        this.loadAllDrivers();
      }, error1 => {
        this._modalService.dismissAll();
        this.openModal(this.unsuccess);
        this.manuallySelected=false;
      });
    }
  }
  selectDrivers(driver: Driver): void {
    this.manuallySelected=true;
    console.log("select Supplier");
    this.selectedDriver = driver;
  }

  openModal(type): void{
    console.log("openAddCustomerModal");
    this._modalService.open(type, { centered: true });
  }

  saveDrivers(){
    this.selectedDriver=new Driver();
    console.log("saveCustomer");
    this.submitted = true;
    if (this.driverForm.invalid) {
      console.log("invalid: ");
      return;
    }

    let driver = {
      driverID: 0,
      licenceNumber: '',
      fullName: '',
      preferredName: '',
      address: '',
      telNo1: '',
      telNo2: '',
      rating: '',
      activeDate: '',
      status: ''
    };
    driver = this.driverForm.value;

    this.selectedDriver.driverID = driver['driverID'];
    this.selectedDriver.licenceNumber = driver['licenceNumber'];
    this.selectedDriver.fullName = driver['fullName'];
    this.selectedDriver.preferredName = driver['preferredName'];
    this.selectedDriver.address = driver['address'];
    this.selectedDriver.telNo1 = driver['telNo1'];
    this.selectedDriver.telNo2 = driver['telNo2'];
    this.selectedDriver.rating = driver['rating'];
    this.selectedDriver.activeDate = driver['activeDate'];
    this.selectedDriver.status = driver['status'];



    this.driverservice.saveDrivers(this.selectedDriver)
      .subscribe(
        (result) => {
          console.log(JSON.stringify(result));
          this._modalService.dismissAll();
          this.openModal(this.success);
          this.manuallySelected=false;
          this.loadAllDrivers();
        },error1 => {
          console.log(JSON.stringify("error:"+error1));
          this._modalService.dismissAll();
          this.openModal(this.unsuccess);
          this.manuallySelected=false;
        }
      );
  }

  editDrivers(){
    console.log(" this customer email:"+this.selectedDriver.driverID);
    if(!this.manuallySelected){
      this.openModal(this.alert);
    }else{
      this.openModal(this.adddriver);
    }
  }


  updateDrivers(){
    this.submitted = true;
    if (this.driverForm.invalid) {
      console.log("invalid: ");
      return;
    }

    let driver = {
      driverID: 0,
      licenceNumber: '',
      fullName: '',
      preferredName: '',
      address: '',
      telNo1: '',
      telNo2: '',
      rating: '',
      activeDate: '',
      status: ''
    };
    driver = this.driverForm.value;

    this.selectedDriver.driverID = driver['driverID'];
    this.selectedDriver.licenceNumber = driver['licenceNumber'];
    this.selectedDriver.fullName = driver['fullName'];
    this.selectedDriver.preferredName = driver['preferredName'];
    this.selectedDriver.address = driver['address'];
    this.selectedDriver.telNo1 = driver['telNo1'];
    this.selectedDriver.telNo2 = driver['telNo2'];
    this.selectedDriver.rating = driver['rating'];
    this.selectedDriver.activeDate = driver['activeDate'];
    this.selectedDriver.status = driver['status'];



    this.driverservice.updateDrivers(this.selectedDriver)
      .subscribe(
        (result) => {
          console.log(JSON.stringify(result));
          this._modalService.dismissAll();
          this.openModal(this.success);
          this.manuallySelected=false;
          this.loadAllDrivers();
        },error1 => {
          console.log(JSON.stringify("error:"+error1));
          this._modalService.dismissAll();
          this.openModal(this.unsuccess);
          this.manuallySelected=false;
        }
      );
  }

  findDriversById(){

    this.driverservice.findDriversById(this.searchId ).subscribe(data=>{
      this.drivers= [];
      this.drivers.push(data);console.log("data : "+JSON.stringify(data))},error1 => {
      console.log(JSON.stringify("error:"+error1));
      this.manuallySelected=false;
    });
  }
}
