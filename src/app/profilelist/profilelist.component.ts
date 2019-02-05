import { Component, OnInit } from '@angular/core';
import { ListService } from '../list.service';
import { Router } from '@angular/router';
import { Control } from '../control';
import { from } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-profilelist',
  templateUrl: './profilelist.component.html',
  styleUrls: ['./profilelist.component.css']
})
export class ProfilelistComponent implements OnInit {
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
  userFilter: any = { categoriesValue: '' };

  constructor(public listService: ListService, public router: Router) {
    this.dataSource = new MatTableDataSource([]);
    console.log(this.dataSource);


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

}
