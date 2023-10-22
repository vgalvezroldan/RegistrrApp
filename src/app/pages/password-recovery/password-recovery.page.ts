
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
})
export class PasswordRecoveryPage implements OnInit {
  email: string = '';
  message: string = '';
  passwordRecovered: string = '';

  constructor(private authService: AuthService) {}

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
}
