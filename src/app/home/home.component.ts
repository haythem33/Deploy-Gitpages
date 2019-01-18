import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  consultant: FormGroup;
  company: FormGroup;
  loginForm: FormGroup;
  companyResponse: any;
  consultantResponse: any;
  constructor(public auth: AuthService) {
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
    this.loginForm = new FormGroup({
    loginEmail: new FormControl('' , [Validators.required, Validators.maxLength(30)]),
    loginPassword: new FormControl ('' , [Validators.required, Validators.maxLength(30)]),
    });
  }

  ngOnInit() {
  }


registerApiCompany() {
  console.log(this.company.value);
  this.auth.registerApiCompany(this.company.value).subscribe(res => {
    if (res['message'] === 'a new company is successfully added') {
      alert(`we have send You a confirmation mail to ${this.company.value.companyemail}`);
    } else {
      alert(`${this.company.value.companyemail} is aleardy used choose another email`);
    }
  });
}
registerApiConsultant() {
  this.auth.registerApiConsultant(this.consultant.value).subscribe(res => {
    if (res['message'] === 'a new consultant is successfully added') {
      alert(`we have send You a confirmation mail to ${this.consultant.value.email}`);
    } else {
      alert(`${this.consultant.value.email} is aleardy used choose another email`);
    }
  });
}
confirmLogin() {
   this.auth.loginApi(this.loginForm.value).subscribe(res => {
     if (res['message'] === 'error') {
       alert('either your account is not active or there is a error in the cordonne');
       console.log(res);
     } else {
       localStorage.setItem('token', res['Token']);
       alert('Success');
     }
  });
  }

}
