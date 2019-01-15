import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Control } from './control';
<<<<<<< HEAD
import { ProfilecompanyComponent } from './profilecompany/profilecompany.component';
import { ProfilconsultantComponent } from './profilconsultant/profilconsultant.component';
=======
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ProfilelistComponent } from './profilelist/profilelist.component';
>>>>>>> dce679cd8371fc12fe4408c6c22a98bea94d5d5c

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
<<<<<<< HEAD
    ProfilecompanyComponent,
    ProfilconsultantComponent
=======
    ConfirmationComponent,
    ProfilelistComponent
>>>>>>> dce679cd8371fc12fe4408c6c22a98bea94d5d5c
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
