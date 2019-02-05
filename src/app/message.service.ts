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
  getConversation(id) {
    return this.http.get(`http://localhost:4000/chatBox/message/${id}`);
  }
  getUserConversation( index) {
    return this.http.get(`http://localhost:4000/chatBox/message/user/${index}`);
  }
  getPrivateConvertion(id, form) {
   return this.http.post(`http://localhost:4000/chatbox/conversation/${id}`, form);
  }
}
