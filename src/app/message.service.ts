import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(public http: HttpClient) { }
  sendMessage(form) {
    return this.http.post('http://localhost:4000/chatBox/message', form);
  }
}
