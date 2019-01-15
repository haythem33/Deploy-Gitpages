import { Component, OnInit } from '@angular/core';
import { ListService} from '../list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profilelist',
  templateUrl: './profilelist.component.html',
  styleUrls: ['./profilelist.component.css']
})
export class ProfilelistComponent implements OnInit {
token;
accountname;
accountemail;
  constructor(public listService: ListService, public router: Router) { }

  ngOnInit() {
    this.token = this.listService.decodetoken();
    if (this.token['data'].companyname) {
      this.accountname = this.token['data'].companyname;
      this.accountemail = this.token['data'].companyemail;
    } else {
      this.accountname = this.token['data'].username;
      this.accountemail = this.token['data'].email;
    }
  }
  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/home');
  }

}
