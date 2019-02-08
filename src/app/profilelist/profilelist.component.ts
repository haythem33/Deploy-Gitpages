import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild, } from '@angular/core';
import { ListService } from '../list.service';
import { Router } from '@angular/router';
import { Control } from '../control';
import { from } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { DataSource } from '@angular/cdk/table';
import { MessageService } from './../message.service';
import {ProfileApiService } from '../profile-api.service';
import { FormGroup, Validators, FormArray, FormControl } from '@angular/forms';


@Component({
  selector: 'app-profilelist',
  templateUrl: './profilelist.component.html',
  styleUrls: ['./profilelist.component.css']
})
export class ProfilelistComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  token;
  accountname;
  accountemail;
  listconsultant;
  i;
  fakePath;
  dataSource: MatTableDataSource<any>;
  CategoryFil;
  categoriesValue = [
    { category: 'IT' },
    { category: 'Accounting / Finance' },
    { category: 'Marketing & Sales' },
    { category: 'Telecommunication' },
  ];
  allUser: any = [];
  allUserMessage: any = [];
  privateMessage: any;
  userFilter: any = { categoriesValue: '' };
  userMessage: any;
  messageSend: FormGroup;
  schemaMessage: any;
  // tslint:disable-next-line:max-line-length
  constructor(public listService: ListService, public router: Router,  public profileApi: ProfileApiService, public messageApi: MessageService) {
    this.dataSource = new MatTableDataSource([]);
    console.log(this.dataSource);
    this.messageSend = new FormGroup({
      contenu : new FormControl('', [Validators.required, Validators.minLength(1)]),
    });


  }

  ngOnInit() {

    this.token = this.listService.decodetoken();
    if (this.token['data'].companyname) {
      this.accountname = this.token['data'].companyname;
      this.accountemail = this.token['data'].companyemail;
    } else {
      this.accountname = this.token['data'].username;
      this.accountemail = this.token['data'].email;
    }
    this.listService.getConsultant().subscribe(res => {
      console.log(res);
      this.listconsultant = res;
      this.dataSource = new MatTableDataSource(this.listconsultant);
      console.log('data', this.dataSource.data);
      this.dataSource.filterPredicate = (data, filter) => {
        const filterObject = filter.trim().toLowerCase();
        const listAsFlatString = (obj): string => {
          let returnVal = '';
          Object.values(obj).forEach((val) => {
          if (typeof val !== 'object') {
            returnVal = returnVal + ' ' + val;
          } else if (val !== null) {
            returnVal = returnVal + ' ' + listAsFlatString(val);
          }
        });
    return returnVal.trim().toLowerCase();
  };
           return listAsFlatString(data).includes(filterObject);
        };
    });
    this.messageApi.getConversation(this.token['User']._id).subscribe(res => {
      this.allUser = res;
      for (let i = 0; i < this.allUser.length; i++) {
        this.profileApi.getUser(this.allUser[i]).subscribe(data => {
          this.allUserMessage.push(data);
        });
      }
    });
    this.scrollToBottom();
    this.messageApi.getprivateMessageSocket().subscribe(data => {
      this.privateMessage = [data];
    });
  }
applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();

}
FilterConsultant(f) {
  this.CategoryFil = this.listconsultant.filter(items => f === items.category);
  if (this.CategoryFil.length > 0) {
    this.listconsultant = this.CategoryFil;
  } else {
    alert('there No profil with this description');
  }
  // for (this.i = 0; this.i < this.CategoryFil.length; this.i++)

}
// for (this.i = 0; this.i < this.CategoryFil.length; this.i++)
removeFakePath(f) {

  this.fakePath = f.slice(12, f.length);
  return this.fakePath;
}
logOut() {
  localStorage.clear();
  this.router.navigateByUrl('/home');
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
// tslint:disable-next-line:use-life-cycle-interface
ngAfterViewChecked() {
  this.scrollToBottom();
}
scrollToBottom(): void {
  try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  } catch (err) { }
}
getId(f) {
  this.profileApi.setId(f);
  this.router.navigateByUrl('/viewprofile');
}

}
