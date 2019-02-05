import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild, } from '@angular/core';
import { AuthService } from '../auth.service';
import { ListService } from '../list.service';
import { Route , Router } from '@angular/router';
import { FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { CustomValidation } from '../custom-validation';
import { Control } from '../control';
import {ProfileApiService } from '../profile-api.service';
import {MatChipInputEvent} from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MessageService } from './../message.service';


@Component({
  selector: 'app-profilconsultant',
  templateUrl: './profilconsultant.component.html',
  styleUrls: ['./profilconsultant.component.css', './../../assets/dashboard/css/dashboard.css']
})
export class ProfilconsultantComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
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
categoriesValue = [
  { category: 'IT' },
  { category: 'Accounting / Finance' },
  { category: 'Marketing & Sales' },
  { category: 'Telecommunication' },
];
inputValue;
inputValue2;
conditionMaterial = 0;
conditionMaterial2 = 0;
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
visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  skills = [
  ];
  Salary: FormGroup;
  getSalary: any = [];
  message: any;
  imagePath: any;
  allUser: any = [];
  allUserMessage: any = [];
  privateMessage: any;
  userMessage: any;
  messageSend: FormGroup;
  schemaMessage: any;


  // tslint:disable-next-line:max-line-length
  constructor(public auth: AuthService, public listService: ListService, public router: Router, public profileApi: ProfileApiService, public messageApi: MessageService) {
    this.aboutMe = new FormGroup ({
      name: new FormControl ('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      telephone: new FormControl('', [Validators.required, CustomValidation.checkLimit(10000000, 99999999)]),
      adresse: new FormControl('', [Validators.required]),
      photo: new FormControl ('', [Validators.required]),
    });
    this.experience = new FormGroup ({
      Duration: new FormControl('', [Validators.required]),
      CompanyName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(14)]),
      Description: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      Poste : new FormControl ('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
        });
        this.Salary = new FormGroup({
            day: new FormControl   ('', [Validators.required, CustomValidation.checkLimit(1, 100000000)]),
            week: new FormControl  ('', [Validators.required, CustomValidation.checkLimit(1, 100000000)]),
            month: new FormControl ('', [Validators.required, CustomValidation.checkLimit(1, 100000000)]),
        });
        this.messageSend = new FormGroup({
          contenu : new FormControl('', [Validators.required, Validators.minLength(2)]),
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
      console.log(this.accountemail);
    }
    this.profileApi.getprofileApi(this.token['data'].code).subscribe(res => {
      this.exp = res['experience'];
      this.inputValue = res['Disponibilité'];
      this.inputValue2 = res['Categorie'];
      this.skills = res['skills'];
      this.getSalary = res['Salary'];
      if (res['aboutme'].length > 0) {
        this.aboutMelenght = 1;
        this.afficherAboutMe = res['aboutme'];
        this.togglemodal = '<button data-toggle="modal" data-target="#aboutMe" class="add-new-field">Edit</button>';
         document.getElementById('buttonModal').innerHTML = this.togglemodal;
      }
    });
    this.messageApi.getConversation(this.token['User']._id).subscribe(res => {
      this.allUser = res;
      console.log(this.allUser);
      for (let i = 0; i < this.allUser.length; i++) {
        this.profileApi.getUser(this.allUser[i]).subscribe(data => {
          this.allUserMessage.push(data);
          console.log(this.allUserMessage);
        });
      }
    });
    this.scrollToBottom();

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
      this.togglemodal = '<button data-toggle="modal" data-target="#aboutMe" class="add-new-field float-right">Edit</button>';
         document.getElementById('buttonModal').innerHTML = this.togglemodal;
    });
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
    this.profileApi.uploadFile(this.token['data'].code, fba).subscribe(res => {
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
       this.conditionMaterial = 0;
     });
  }
  editDispo() {
    this.conditionMaterial = 1;
  }
  addCategorie(f) {
    const obj = {dispo: f};
    this.profileApi.setCategorie(this.token['data'].code, obj).subscribe(res => {
    this.inputValue2 = res['Categorie'];
    this.conditionMaterial2 = 0;
    });
  }
  editCategorie() {
    this.conditionMaterial2 = 1;
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.skills.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(skill): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

 pushSkill(f) {
    this.profileApi.setSkills(this.token['data'].code, f).subscribe(res => {
      this.skills = res['skills'];
    });
}
addSalery() {
  if (this.Salary.value.day > 0 && this.Salary.value.week > 0 && this.Salary.value.month > 0) {
  this.profileApi.setSalary(this.token['data'].code, this.Salary.value).subscribe(res => {
    this.getSalary = res['Salary'];
  });
  }
}
findConversation(f) {
  const obj = {id : f};
this.messageApi.getPrivateConvertion(this.token['User']._id, obj).subscribe(res => {
  this.privateMessage = [res];
  console.log(this.privateMessage);
});

}
getUserMessage(f) {
  this.profileApi.getUser(f).subscribe(res => {
    this.userMessage = [res];
  });
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
    console.log(res);
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
}

