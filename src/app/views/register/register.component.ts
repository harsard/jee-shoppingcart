import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../../dto/Customer";
import {CustomerService} from "../../services/customer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitted = false;
  customerForm: FormGroup;
  searchId: any;
  selectedcustomer: Customer;

  @ViewChild('success') private success;
  @ViewChild('unsuccess') private unsuccess;
  @ViewChild('alert') private alert;
  @ViewChild('addsupplier') private addsupplier;

  constructor(
    private formBuilder: FormBuilder, private customerservice: CustomerService, private router: Router
  ) {
  }

  ngOnInit() {

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
  get f(): any {
    return this.customerForm.controls;
  }

  saveCustomer(): void {

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

    console.log("this.selectedcustomer :"+this.selectedcustomer);
    this.customerservice.saveCustomer(this.selectedcustomer)
      .subscribe(
        (result) => {
          console.log(JSON.stringify(result));
          //this.dataservice.success("Customer Successfully Saved ");
          setTimeout((router: Router) => {
            this.router.navigate(["/login" || "/"]);
          }, 1500);
        }, error1 => {
          //this.failed = true;
          //this.dataservice.error("Error :"+error1.data);

        }
      );
  }

}

