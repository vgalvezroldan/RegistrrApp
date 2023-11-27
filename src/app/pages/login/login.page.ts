import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';

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
    private router: Router,
    private location: Location,
    private alertController: AlertController 
  ) {}

  async login() {
    // Verificar si el correo electrónico contiene '@'
    if (!this.user.email.includes('@')) {
      await this.mostrarAlerta('Correo inválido', 'Por favor, ingrese un correo electrónico válido.');
      return;
    }
  
    // Verificar si la contraseña está vacía
    if (!this.user.password) {
      await this.mostrarAlerta('Contraseña inválida', 'Por favor, ingrese una contraseña.');
      return;
    }
  
    // Intentar iniciar sesión
    if (this.authService.login(this.user.email, this.user.password)) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('loggedInEmail', this.user.email);

      const currentUser = this.authService.getCurrentUser(this.user.email);
      if (currentUser) {
        localStorage.setItem('loggedInName', currentUser.name); // Almacena el nombre del usuario

        // Redirigir según el nombre del usuario
        if (currentUser.name === 'Alumno') {
          this.router.navigate(['/alumno']);
        } else if (currentUser.name === 'Profesor') {
          this.router.navigate(['/profesor']);
        } else {
          this.router.navigate(['/welcome']);
        }
      }
    } else {
      await this.mostrarAlerta('Error de inicio de sesión', 'Correo electrónico o contraseña incorrectos.');
    }
  }

  private async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }  

  openPasswordRecovery() {
    this.router.navigate(['/password-recovery']);
  }

  navigateToHome() {
    this.router.navigate(['/home']); 
  }

  navigateBack() {
    this.location.back(); 
  }
}
