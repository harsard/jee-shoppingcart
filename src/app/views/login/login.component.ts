import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {Appuser} from "../../dto/Appuser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  appUser = new Appuser();
  failed: boolean;
  submitted = false;
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginservice: LoginService,
    private router: Router )  { }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

// convenience getter for easy access to form fields
  get f():any { return this.registerForm.controls; }



  loginUser(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    let cus = {
      username: '',
      password : ''};
    cus = this.registerForm.value;

    this.appUser.password = cus['password'];
    this.appUser.username = cus['username'];
    this.loginservice.login(this.appUser).subscribe(
      data => console.log(data),
    error1 => console.log(error1) );
  }

}
