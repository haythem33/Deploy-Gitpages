import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  privateMessage: any;

  constructor(public http: HttpClient , private socket: Socket) { }
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
  sendMessageSocket() {
  return  this.socket.on('sendMessage', (callback) => {
    console.log(callback);
  });
  }
  getprivateMessageSocket() {
    return this.socket.fromEvent('privateMessage');
  }
  getAllMessageSocket() {
   return this.socket.fromEvent('getAllMessage');
 }
}
