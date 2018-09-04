import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LodgingsComponent} from './components/lodgings/lodgings.component';
import { LodgingComponent} from './components/lodging/lodging.component';
import { LoginComponent} from './components/login/login.component';
import { ReservationsComponent} from './components/reservations/reservations.component';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { LodgingService } from './services/lodging.service';
import { ReservationsService } from './services/reservations.service';
import { InboxComponent} from './components/inbox/inbox.component';
import { InboxService } from './services/inbox.service';
import { MessageComponent} from './components/message/message.component';
const appRoutes: Routes = [
 
  { path: 'register', component: RegisterFormComponent },
  { path: 'home', component: HomeComponent },
  { path: 'lodgings', component: LodgingsComponent },
  { path : 'lodging/:id' , component : LodgingComponent },
  { path : 'reservations' , component : ReservationsComponent },
  { path : 'login', component : LoginComponent},
  { path : 'inbox', component : InboxComponent},
  { path : 'send/:id', component: MessageComponent},
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
  
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    NavbarComponent,
    HomeComponent,
	LodgingsComponent,
	LodgingComponent,
	ReservationsComponent,
	LoginComponent,
	InboxComponent,
	MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [ HttpClientModule, AuthService, LodgingService, ReservationsService, InboxService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
