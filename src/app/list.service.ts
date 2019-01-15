import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class ListService {
token;
  constructor() { }
  decodetoken() {
    if (localStorage.getItem('token')) {
    this.token = localStorage.getItem('token');
    return jwt_decode(this.token);
    }
  }
}
