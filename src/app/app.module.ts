import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';

const appRoutes: Routes = [
 
  { path: 'register', component: RegisterFormComponent },
  { path: 'home', component: HomeComponent },
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
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [ HttpClientModule, AuthService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
