import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ AuthService ]
})
export class NavbarComponent implements OnInit {

  public isLogged: boolean;

  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit() {
    this.isLogged = this.authService.isAuthenticated();
  }

  onClick(){
    this.isLogged = false;
    localStorage.removeItem('token');
    this.router.navigate(["/home"]);
  }
}
