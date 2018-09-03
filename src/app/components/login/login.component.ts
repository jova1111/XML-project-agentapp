import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ AuthService ]
})
export class LoginComponent implements OnInit {
	private agentId:string;
  constructor(private authService: AuthService) { 
	this.authService = authService
  }

  ngOnInit() {
	 
	  
  }
  
  onSubmit(){
	  console.log(this.agentId);
	  this.authService.login(this.agentId);
  }

}
