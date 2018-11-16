import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VehicleType} from "../../dto/VehicleType";
import {VehicleTypeService} from "../../services/vehicle-type.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Customer} from "../../dto/Customer";
import {CustomerService} from "../../services/customer.service";
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
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.css']
})
export class ManageCustomerComponent implements OnInit {

  customers: Array<Customer> = [];
  selectedcustomer= new Customer();
  manuallySelected= false;

  submitted = false;
  customerForm: FormGroup;
  searchId='';



  // alert
  alertType:string;
  alertMessage:string;

  //alert modals
  @ViewChild('alert') private alert;
  @ViewChild('additem') private addcustomer;

  constructor(
    private customerservice: CustomerService,
    private _modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {  }

  ngOnInit() {
    this.loadAllcustomers();
    this.customerForm = this.formBuilder.group({
      customerID: ['', Validators.required],
      userName: ['', Validators.required],
      nic: ['', Validators.required],
      fristName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      telNo1: ['', Validators.required],
      telNo2: ['', Validators.required],
      rating: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],

    });
  }

  // convenience getter for easy access to form fields
  get f(): any { return this.customerForm.controls; }

  // open alert modals
  openModal(type): void{
    console.log("open Modal");
    this._modalService.open(type, { centered: true });
  }

  loadAllcustomers(): void {
    this.customerservice.getAllCustomers().subscribe(
      (result) => {
        this.customers = result;
      });
  }



  deleteCustomer(customer?:Customer): void {
    // if table raw not selected
    if (!this.manuallySelected) {
      this._modalService.dismissAll();
      this.alertType=WR;
      this.alertMessage=PS;
      this.openModal(this.alert);
    } else {


      this.customerservice.deleteCustomer(this.selectedcustomer.customerID).subscribe(data => {
        this._modalService.dismissAll();
        this.alertType=SC;
        this.alertMessage=ID;
        this.openModal(this.alert);
        this.manuallySelected=false;
        this.loadAllcustomers();
      }, error1 => {
        this._modalService.dismissAll();
        this.alertType=DN;
        this.alertMessage=IDF;
        this.openModal(this.alert);
        this.manuallySelected=false;
      });
    }
  }
  selectCustomer(customer:Customer): void {
    this.manuallySelected=true;
    console.log("select Supplier");
    this.selectedcustomer = customer;
  }

  editcustomer(){
    if(!this.manuallySelected){
      this.alertType=WR;
      this.alertMessage=PS;
      this.openModal(this.alert);
    }else{
      this.openModal(this.addcustomer);
    }
  }


  updatecustomer(){
    this.submitted = true;
    if (this.customerForm.invalid) {
      console.log("invalid: ");
      return;
    }

    let cus = {
      customerID: 0,
      userName: '',
      password: '',
      nic: '',
      fristName: '',
      lastName: '',
      address: '',
      telNo1: '',
      telNo2: '',
      rating: '',
      gender: '',
      status: ''
    };
    cus = this.customerForm.value;
    this.selectedcustomer.customerID = cus['customerID'];
    this.selectedcustomer.userName = cus['userName'];
    this.selectedcustomer.password = cus['password'];
    this.selectedcustomer.nic = cus['nic'];
    this.selectedcustomer.fristName = cus['fristName'];
    this.selectedcustomer.lastName = cus['lastName'];
    this.selectedcustomer.address = cus['address'];
    this.selectedcustomer.telNo1 = cus['telNo1'];
    this.selectedcustomer.telNo2 = cus['telNo2'];
    this.selectedcustomer.rating = cus['rating'];
    this.selectedcustomer.gender = cus['gender'];
    this.selectedcustomer.status = cus['status'];

    this.customerservice.updateCustomer(this.selectedcustomer)
      .subscribe(
        (result) => {
          console.log(JSON.stringify(result));
          this._modalService.dismissAll();
          this.alertType=SC;
          this.alertMessage=IU;
          this.openModal(this.alert);
          this.manuallySelected=false;
          this.loadAllcustomers();
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

    this.customerservice.getCustomerById(this.searchId).subscribe(
      items=>{
        this.customers=[];
        console.log(JSON.stringify(items));
        this.customers.push(items);

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
