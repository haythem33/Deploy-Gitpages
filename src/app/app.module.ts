import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
const config: SocketIoConfig = { url: 'http://localhost:4000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfilecompanyComponent,
    ProfilconsultantComponent,
    ConfirmationComponent,
    ProfilelistComponent,
    ChatboxComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
