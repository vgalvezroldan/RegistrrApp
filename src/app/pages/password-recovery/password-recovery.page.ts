
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router} from '@angular/router';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';


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
              private location: Location,
              private alertController: AlertController
    ) {}

  ngOnInit() {}

  async recoverPassword() {
    // Verificar si el correo electrónico contiene '@'
    if (!this.email.includes('@')) {
      await this.mostrarAlerta('Correo inválido', 'Por favor, ingrese un correo electrónico válido.');
      return;
    }
  
    // Intentar recuperar la contraseña
    const user = this.authService.getUserByEmail(this.email);
    if (user) {
      this.passwordRecovered = user.password;
      this.message = 'Contraseña recuperada:';
    } else {
      await this.mostrarAlerta('Correo no registrado', 'No se ha encontrado una cuenta con ese correo electrónico.');
      this.passwordRecovered = '';
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
