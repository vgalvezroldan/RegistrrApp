import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { PasswordRecoveryPage } from '../password-recovery/password-recovery.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    if (this.authService.login(this.user.email, this.user.password)) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('loggedInEmail', this.user.email);
      this.router.navigate(['/welcome']);
    } else {
      console.error('Las credenciales son incorrectas.');
    }
  }

  openPasswordRecovery() {
    this.router.navigate(['/password-recovery']);
  }
}