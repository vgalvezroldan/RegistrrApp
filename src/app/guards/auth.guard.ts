import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isLoginProcess = localStorage.getItem('isLoginProcess') === 'true';

    if (isLoggedIn && isLoginProcess) {
    
      localStorage.setItem('isLoginProcess', 'false');
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
