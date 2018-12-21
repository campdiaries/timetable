import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.googleLogin().then(data => {
      console.log('after login');
      console.log(data);
    });
  }

  logout() {
    this.authService.signOut();
  }

}
