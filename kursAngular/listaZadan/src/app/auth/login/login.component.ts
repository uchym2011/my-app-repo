import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public authService: AuthService) {
    console.log('Wykonuję add-login.component.ts constructor #1');
  }

  // w serwisie wywołuje logowanie
  login(formData: NgForm) {
    console.log('Wykonuję add-login.component.ts login #1');
    this.authService.login(formData.value.email, formData.value.password);
  }

  // w serwisie wywołuje rejestrację
  signup(formData: NgForm) {
    console.log('Wykonuję add-login.component.ts signup #1');
    this.authService.signup(formData.value.email, formData.value.password);
  }

}
