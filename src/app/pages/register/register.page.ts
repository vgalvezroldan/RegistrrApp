import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  user = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) {}

  register() {
    const success = this.authService.registerUser(this.user.name, this.user.email, this.user.password);
    if (success) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('loggedInEmail', this.user.email);
      this.router.navigate(['/home']);
    } else {
      
      console.error('Error en el registro. El correo electrónico ya está en uso.');
    }
  }
  navigateToHome() {
    this.router.navigate(['/home']); 
  }
  navigateBack() {
   this.location.back(); 
  }

}
