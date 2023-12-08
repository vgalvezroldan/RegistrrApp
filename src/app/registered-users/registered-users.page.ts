import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.page.html',
  styleUrls: ['./registered-users.page.scss'],
})
export class RegisteredUsersPage implements OnInit {
  profesores: any[] = [];
  alumnos: any[] = []; 

  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    const allUsers = this.authService.getRegisteredUsers();
    this.profesores = allUsers.filter(user => user.email.includes('profesor'));
    this.alumnos = allUsers.filter(user => !user.email.includes('profesor'));
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  navigateBack() {
    this.location.back();
  }

  async saveAttendanceList() {
    // Aquí puedes procesar la lista de asistencia
    console.log('Lista de asistencia:', this.alumnos);

    const alert = await this.alertController.create({
      header: 'Lista Guardada',
      message: 'La lista de asistencia ha sido guardada exitosamente.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
