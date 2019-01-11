import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  consultant: FormGroup;
  company: FormGroup;
  constructor() {
    this.consultant = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(2) ,  Validators.maxLength(19)]),
      email: new FormControl ('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    });
    this.company = new FormGroup({
     companyname: new FormControl('', [Validators.required, Validators.minLength(2) ,  Validators.maxLength(19)]),
     companyemail: new FormControl('', [Validators.required, Validators.email]),
     companypassword: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    });
  }

  ngOnInit() {
  }



}
