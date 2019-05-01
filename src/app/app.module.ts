import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
<<<<<<< HEAD

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
=======
import { FilterPipeModule } from 'ngx-filter-pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Control } from './control';
import { ProfilecompanyComponent } from './profilecompany/profilecompany.component';
import { ProfilconsultantComponent } from './profilconsultant/profilconsultant.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ProfilelistComponent } from './profilelist/profilelist.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ViewprofileComponent } from './viewprofile/viewprofile.component';
const config: SocketIoConfig = { url: 'http://localhost:4000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfilecompanyComponent,
    ProfilconsultantComponent,
    ConfirmationComponent,
    ProfilelistComponent,
    ChatboxComponent,
    ViewprofileComponent
  ],
  imports: [
    BrowserModule,
    FilterPipeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Control,
    SocketIoModule.forRoot(config),
>>>>>>> e41ee4ab29552ac61e451d643d51a6239d86b8c6
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
