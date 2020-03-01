import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(public angularFire: AngularFireAuth, private router: Router) {
    // pilnuje czy jestesmy zalogowani
    console.log('Wykonuję auth.service.ts constructor #1');
    angularFire.authState.subscribe(user => {
      this.user = user;
    });
  }

  login(email: string, password: string) {
    console.log('Wykonuję auth.service.ts login #1');
    this.angularFire.auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log(user);
        this.router.navigate(['/todoTask']);
      })
      .catch(err => {
        const check = err;
        if (check.code == "auth/wrong-password") {
          check.message = "Wpisane hasło jest niepoprawne!";
        }
        else if (check.code == "auth/invalid-email") {
          check.message = "Niepoprawnie wpisany adres email!";
        }
        else if (check.code == "auth/too-many-requests") {
          check.message = "Zbyt dużo błędnych logowań, spróbuj ponownie później";
        }
        else if (check.code == "auth/user-not-found") {
          check.message = "Niepoprawny adres email, brak takiego użytkownika!";
        }

        alert(check.message);
        console.log(err);

      });

  }

  signup(email: string, password: string, name: string) {
    console.log('Wykonuję auth.service.ts signup #1');
    this.angularFire.auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log(user.user.uid);
        user.user.updateProfile({
          displayName: name,
          photoURL: "https://example.com/jane-q-user/profile.jpg"
        })
        console.log(user);
      })
      .catch(err => {
        console.log(err);
      });


/*     this.angularFire.auth.currentUser.updateProfile({
        displayName: 'Witek'
      }) */

  }

  logout() {
    console.log('Wykonuję auth.service.ts logout #1');
    this.angularFire.auth.signOut();
  }

}
