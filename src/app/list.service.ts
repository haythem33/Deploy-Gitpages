import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class ListService {
token;
  constructor(private http: HttpClient) { }
  decodetoken() {
    if (localStorage.getItem('token')) {
    this.token = localStorage.getItem('token');
    return jwt_decode(this.token);
    }
  }
  getConsultant() {
    return this.http.get('http://localhost:4000/filter/consultant');
  }
}

