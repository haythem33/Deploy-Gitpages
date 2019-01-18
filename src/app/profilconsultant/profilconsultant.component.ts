import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ListService } from '../list.service';
import { Route , Router } from '@angular/router';
import { FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { CustomValidation } from '../custom-validation';
import { Control } from '../control';
import {ProfileApiService } from '../profile-api.service';

@Component({
  selector: 'app-profilconsultant',
  templateUrl: './profilconsultant.component.html',
  styleUrls: ['./profilconsultant.component.css', './../../assets/dashboard/css/dashboard.css']
})
export class ProfilconsultantComponent implements OnInit {
token;
aboutMelenght = 0;
afficherAboutMe;
togglemodal;
togglemodalExp;
fileUpload: Array<File> = [];
fakePath: any;
experienceForm: FormArray;
experience: FormGroup;
accountname;
exp: any;
accountemail;
index;
dispo: FormControl;
aboutMe: FormGroup;
DispoChoice =  [
  {name: 'PartTime'},
  {name: 'FullTime'},
];
inputValue;
conditionMaterial = 0;
citys = [
  {name: 'Ariana'},
  {name: 'Béja'},
  {name: 'Bizerte'},
  {name: 'Gabès'},
  {name: 'Gafsa'},
  {name: 'Jendouba'},
  {name: 'Kairouan'},
  {name: 'Kasserine'},
  {name: 'Kébili'},
  {name: 'Le Kef'},
  {name: 'Mahdia'},
  {name: 'La Manouba'},
  {name: 'Médenine'},
  {name: 'Monastir'},
  {name: 'Nabeul'},
  {name: 'Sfax'},
  {name: 'Sidi Bouzid'},
  {name: 'Siliana'},
  {name: 'Tataouine'},
  {name: 'Tozeur'},
  {name: 'Tunis'},
  {name: 'Zaghouan'},
];


  constructor(public auth: AuthService, public listService: ListService, public router: Router, public profileApi: ProfileApiService) {
    this.aboutMe = new FormGroup ({
      name: new FormControl ('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      telephone: new FormControl('', [Validators.required, CustomValidation.checkLimit(10000000, 99999999)]),
      photo: new FormControl ('', [Validators.required]),
      adresse: new FormControl('', [Validators.required]),
    });
    this.experience = new FormGroup ({
      Duration: new FormControl('', [Validators.required, CustomValidation.checkLimit(1, 60) ]),
      CompanyName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(14)]),
      Description: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]),
        });
        this.dispo = new FormControl('', [Validators.required]);
   }

  ngOnInit() {
    this.token = this.listService.decodetoken();
    if (this.token['data'].companyname) {
     this.accountname = this.token['data'].companyname;
      this.accountemail = this.token['data'].companyemail;
    } else {
      this.accountname = this.token['data'].username;
      this.accountemail = this.token['data'].email;
      console.log(this.accountemail);
    }
    this.profileApi.getprofileApi(this.token['data'].code).subscribe(res => {
      this.exp = res['experience'];
      this.inputValue = res['Disponibilité'];
      if (res['aboutme'].length > 0) {
        this.aboutMelenght = 1;
        this.afficherAboutMe = res['aboutme'];
        this.togglemodal = '<button data-toggle="modal" data-target="#aboutMe" class="add-new-field">Edit</button>';
         document.getElementById('buttonModal').innerHTML = this.togglemodal;
      }
    });
  }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/home');
  }
  addAboutMe() {
    this.profileApi.postApiAbout(this.token['data'].code, this.aboutMe.value).subscribe(res => {
      console.log(res);
      this.afficherAboutMe = res['aboutme'];
      this.aboutMelenght = 1;
      this.togglemodal = '<button data-toggle="modal" data-target="#aboutMe" class="add-new-field">Edit</button>';
         document.getElementById('buttonModal').innerHTML = this.togglemodal;
    });
  }
  removeFakePath() {
   this.fakePath = this.aboutMe.value.photo.slice(12, this.aboutMe.value.photo.length);
  }
  removeFakePathUrl(f) {

    this.fakePath = f.slice(12, f.length);
    return this.fakePath;
  }
  filechangeEvent(fileInput: any) {
    this.fileUpload = <Array<File>>fileInput.target.files;
  }
  uploadFile() {
    const fba = new FormData();
    fba.append('file', this.fileUpload[0]);
    this.profileApi.uploadFile(fba).subscribe(res => {
      console.log(res);
    });
  }
  addExp() {
    this.profileApi.postexpApi(this.token['data'].code, this.experience.value).subscribe(res => {
      this.exp = res['experience'];
    });
    }
    getIndex(f) {
      this.index = f;
  }
  editExp() {
    this.profileApi.updateApiExp(this.token['data'].code, this.index, this.experience.value).subscribe(res => {
     this.exp = res['experience'];
    });
  }
  addDispo(f) {
    const obj = {dispo: f};
     this.profileApi.setDispo(this.token['data'].code, obj).subscribe(res => {
       this.inputValue = res['Disponibilité'];
     });
  }
  editDispo() {
    this.conditionMaterial = 1;
  }
}

