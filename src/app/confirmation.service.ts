import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  constructor(public http: HttpClient) { }
/*confirmationApi() {
  const headers = new HttpHeaders();
    headers.set('Content-Type', 'form-data');
 return this.http.get('http://localhost:4000/auth/company/confirmation/:code' , {headers});
}*/
}
