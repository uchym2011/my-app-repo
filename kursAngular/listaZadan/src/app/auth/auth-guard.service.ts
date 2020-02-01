import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public authService: AuthService, private router: Router) {
    console.log('Wykonuję auth-guard.service.ts constructor #1');
   }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('Wykonuję auth-guard.service.ts canActivate #1');
    if (this.authService.user) {
      return true;
    }
    this.router.navigate(['/login', {name: route.component['name']}]);
    return false;
  }

}
