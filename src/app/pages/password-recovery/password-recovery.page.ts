
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router} from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
})
export class PasswordRecoveryPage implements OnInit {
  email: string = '';
  message: string = '';
  passwordRecovered: string = '';

  constructor(private authService: AuthService,
              private router: Router,
              private location: Location
    ) {}

  ngOnInit() {}

  recoverPassword() {
    const user = this.authService.getUserByEmail(this.email);
    if (user) {
      this.passwordRecovered = user.password;
      this.message = 'Contraseña recuperada:';
    } else {
      this.message = 'Correo no registrado.';
      this.passwordRecovered = '';
    }
  }
  navigateToHome() {
    this.router.navigate(['/home']); 
  }
  navigateBack() {
   this.location.back(); 
  }
}
