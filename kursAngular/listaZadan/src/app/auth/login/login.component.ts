import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public authService: AuthService) { }

  // w serwisie wywołuje logowanie
  login(formData: NgForm) {
    this.authService.login(formData.value.email, formData.value.password);
  }

  // w serwisie wywołuje rejestrację
  signup(formData: NgForm) {
    this.authService.signup(formData.value.email, formData.value.password);
  }

}
