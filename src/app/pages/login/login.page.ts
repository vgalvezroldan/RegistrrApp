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
    if (!this.user.email.includes('@')) {
      await this.mostrarAlerta('Correo inválido', 'Por favor, ingrese un correo electrónico válido.');
      return;
    }
  
    if (!this.user.password) {
      await this.mostrarAlerta('Contraseña inválida', 'Por favor, ingrese una contraseña.');
      return;
    }
  
    if (this.authService.login(this.user.email, this.user.password)) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('loggedInEmail', this.user.email);


      const user = this.authService.getUserByEmail(this.user.email);
      if (user) {
        localStorage.setItem('loggedInName', user.name);
      }

      // Verifica si el usuario es el profesor
      if (this.authService.isProfessor(this.user.email)) {
        this.router.navigate(['/profesor']);
      } else {
        this.router.navigate(['/alumno']); // Redirige a todos los demás usuarios a la página de Alumno
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
