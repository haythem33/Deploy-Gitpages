import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild, } from '@angular/core';
import { MessageService } from './../message.service';
import {ProfileApiService } from '../profile-api.service';
import { ListService } from '../list.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css']
})
export class ViewprofileComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
id;
token;
accountname;
accountemail;
exp;
inputValue;
inputValue2;
skills;
getSalary;
aboutMelenght;
afficherAboutMe;
fakePath;
social;
messageSend: FormGroup;
allUser: any = [];
allUserMessage: any = [];
privateMessage: any;
userMessage: any;
schemaMessage: any;
  // tslint:disable-next-line:max-line-length
  constructor(private profileApi: ProfileApiService, private messageApi: MessageService, private listService: ListService, private router: Router) {
    this.messageSend = new FormGroup({
      contenu : new FormControl('', [Validators.required, Validators.minLength(1)]),
    });
  }

  ngOnInit() {
    this.token = this.listService.decodetoken();
    console.log(this.token['User']);
    if (this.token['data'].companyname) {
     this.accountname = this.token['data'].companyname;
      this.accountemail = this.token['data'].companyemail;
    } else {
      this.accountname = this.token['data'].username;
      this.accountemail = this.token['data'].email;
    }
this.id = this.profileApi.getId();
this.profileApi.getprofileApi(this.id).subscribe(res => {
  this.exp = res['experience'];
  this.inputValue = res['Disponibilité'];
  this.inputValue2 = res['Categorie'];
  this.skills = res['skills'];
  this.getSalary = res['Salary'];
  this.social = [res];
  if (res['aboutme'].length > 0) {
    this.aboutMelenght = 1;
    this.afficherAboutMe = res['aboutme'];
  }
});
this.messageApi.getConversation(this.token['User']._id).subscribe(res => {
  this.allUser = res;
  for (let i = 0; i < this.allUser.length; i++) {
    this.profileApi.getUser(this.allUser[i]).subscribe(data => {
      this.allUserMessage.push(data);
    });
  }
});
    this.messageApi.getprivateMessageSocket().subscribe(data => {
      this.privateMessage = [data];
    });

  }
  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/home');
  }
  removeFakePathUrl(f) {
    this.fakePath = f.slice(12, f.length);
    return this.fakePath;
  }
  sendMessage(f) {
    this.schemaMessage = {
      userOne : this.token['User']._id,
      userTwo : f,
      messages: [{
        contenu : this.messageSend.value.contenu,
        date : Date.now(),
        from : this.token['User']._id,
        to: f
      }],
    };
    this.messageApi.sendMessage(this.schemaMessage).subscribe(res => {
       this.findConversation(f);
      this.messageSend.patchValue({
        contenu: '',
      });
    });
  }
  findConversation(f) {
    const obj = {id : f};
  this.messageApi.getPrivateConvertion(this.token['User']._id, obj).subscribe(res => {
    this.privateMessage = [res];
  });
  }
  getUserMessage(f) {
    this.profileApi.getUser(f).subscribe(res => {
      this.userMessage = [res];
    });
  }
  // tslint:disable-next-line:use-life-cycle-interface

}
