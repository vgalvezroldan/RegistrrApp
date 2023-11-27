import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';

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
    private location: Location,
    private alertController: AlertController 
  ) {}

  async register() {
    // Verificar si el correo electrónico contiene '@'
    if (!this.user.email.includes('@')) {
      await this.mostrarAlerta('Correo inválido', 'Por favor, ingrese un correo electrónico válido.');
      return;
    }
  
    // Intentar registrar al usuario
    const success = this.authService.registerUser(this.user.name, this.user.email, this.user.password);
    if (success) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('loggedInEmail', this.user.email);
      this.router.navigate(['/home']);
    } else {
      await this.mostrarAlerta('Error en el registro', 'El correo electrónico ya está en uso.');
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
  
  
  navigateToHome() {
    this.router.navigate(['/home']); 
  }
  navigateBack() {
   this.location.back(); 
  }

}
