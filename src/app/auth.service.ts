import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
reloadpage: any;

  constructor(public http: HttpClient) { }
  registerApiCompany(form) {
    return this.http.post('http://localhost:4000/auth/register/company', form);
  }
  registerApiConsultant(form) {
    return this.http.post('http://localhost:4000/auth/register/consultant', form);
  }
  loginApi(form) {
    return this.http.post('http://localhost:4000/auth/login', form);
  }
}
