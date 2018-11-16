import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Vehicle} from "../../dto/Vehicle";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Packages} from "../../dto/Packages";
import {PackegeManagerService} from "../../services/packege-manager.service";

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
  selector: 'app-package-manager',
  templateUrl: './package-manager.component.html',
  styleUrls: ['./package-manager.component.css']
})
export class PackageManagerComponent implements OnInit {

  packages: Array<Packages> = [];
  selectedPackage= new Packages();
  manuallySelected= false;

  submitted = false;
  packageForm: FormGroup;
  searchId='';
  searchpackageNotFound=true;


  // alert
  alertType:string;
  alertMessage:string;

  //alert modals
  @ViewChild('alert') private alert;
  @ViewChild('additem') private addpackage;

  constructor(
    private packageservice: PackegeManagerService,
    private _modalService: NgbModal,
    private formBuilder: FormBuilder,
  ) {  }


  ngOnInit() {
    this.loadAllPackages();
    this.packageForm = this.formBuilder.group({
      packageID:[0, Validators.required],
      name:['', Validators.required],
      distance:[0, Validators.required],
      days:[0, Validators.required],
      hours:['', Validators.required],
      amount:[0, Validators.required],
      status:['', Validators.required],
      minimumAdvanced:['', Validators.required]

    });
  }

  // convenience getter for easy access to form fields
  get f(): any { return this.packageForm.controls; }

  // open alert modals
  openModal(type): void{
    console.log("openModal");
    this._modalService.open(type, { centered: true });
  }

  loadAllPackages(): void {
    this.packageservice.getAllPackageType().subscribe(
      (result) => {
        this.packages = result;
      });
  }

  savePackage(){
    this.selectedPackage=new Packages();
    console.log("saveCustomer");
    this.submitted = true;
    if (this.packageForm.invalid) {
      console.log("invalid: ");
      return;
    }
    let packages = {
      packageID:0,
      name: '',
      distance: 0,
      days: 0,
      hours: '',
      amount: 0,
      status: '',
      minimumAdvanced: 0

    };
    packages = this.packageForm.value;


    this.selectedPackage.packageID = packages['packageID'];
    this.selectedPackage.name = packages['name'];
    this.selectedPackage.distance = packages['distance'];
    this.selectedPackage.status = packages['status'];
    this.selectedPackage.days = packages['days'];
    this.selectedPackage.hours = packages['hours'];
    this.selectedPackage.amount = packages['amount'];
    this.selectedPackage.minimumAdvanced = packages['minimumAdvanced'];


    this.packageservice.savePackageType(this.selectedPackage)
      .subscribe(
        (result) => {

          this._modalService.dismissAll();
          this.alertType=SC;
          this.alertMessage=IS;
          this.openModal(this.alert);
          this.manuallySelected=false;
          this.loadAllPackages();

        },error1 => {

          this._modalService.dismissAll();
          this.alertType=DN;
          this.alertMessage=INS+": "+JSON.stringify(error1);
          this.openModal(this.alert);
          this.manuallySelected=false;
        });
  }

  deletePackage(vehicle?:Vehicle): void {
    // if table raw not selected
    if (!this.manuallySelected) {
      this._modalService.dismissAll();
      this.alertType=WR;
      this.alertMessage=PS;
      this.openModal(this.alert);
    } else {


      this.packageservice.deletePackageType(this.selectedPackage.packageID).subscribe(data => {
        this._modalService.dismissAll();
        this.alertType=SC;
        this.alertMessage=ID;
        this.openModal(this.alert);
        this.manuallySelected=false;
        this.loadAllPackages();
      }, error1 => {
        this._modalService.dismissAll();
        this.alertType=DN;
        this.alertMessage=IDF;
        this.openModal(this.alert);
        this.manuallySelected=false;
      });
    }
  }
  selectPackage(pkg:Packages): void {
    this.manuallySelected=true;
    console.log("select Supplier");
    this.selectedPackage = pkg;
  }

  editPackage(){
    if(!this.manuallySelected){
      this.alertType=WR;
      this.alertMessage=PS;
      this.openModal(this.alert);
    }else{
      this.openModal(this.addpackage);
    }
  }


  updatePackage(){
    this.submitted = true;
    if (this.packageForm.invalid) {
      console.log("invalid: ");
      return;
    }

    let packages = {
      packageID:0,
      name: '',
      distance: 0,
      days: 0,
      hours: '',
      amount: 0,
      status: '',
      minimumAdvanced: 0

    };
    packages = this.packageForm.value;


    this.selectedPackage.packageID = packages['packageID'];
    this.selectedPackage.name = packages['name'];
    this.selectedPackage.distance = packages['distance'];
    this.selectedPackage.status = packages['status'];
    this.selectedPackage.days = packages['days'];
    this.selectedPackage.hours = packages['hours'];
    this.selectedPackage.amount = packages['amount'];
    this.selectedPackage.minimumAdvanced = packages['minimumAdvanced'];

    this.packageservice.updatePackageType(this.selectedPackage)
      .subscribe(
        (result) => {
          console.log(JSON.stringify(result));
          this._modalService.dismissAll();
          this.alertType=SC;
          this.alertMessage=IU;
          this.openModal(this.alert);
          this.manuallySelected=false;
          this.loadAllPackages();
        },error1 => {
          this._modalService.dismissAll();
          this.alertType=DN;
          this.alertMessage=IUF;
          this.openModal(this.alert);
          this.manuallySelected=false;
        }
      );
  }

  findpackageById(){
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

    this.packageservice.findPackageTypeById(this.searchId).subscribe(
      items=>{
        this.packages=[];
        console.log(JSON.stringify(items));
        this.packages.push(items);
        console.log("this.items.length 22 "+this.packages.length);
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
