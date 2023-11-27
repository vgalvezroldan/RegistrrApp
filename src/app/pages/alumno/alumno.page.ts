import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Location } from '@angular/common';
import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;


@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {
  username : string = '';

  constructor(
    private router: Router,
    private location: Location,
    private platform: Platform,
    ) { }
  

  ngOnInit() {
    this.username = localStorage.getItem('loggedInName') || 'Invitado';
  }

  openCameraApp() {
    const cameraAppUrl = 'intent://scan/#Intent;scheme=zxing;package=com.google.zxing.client.android;end'; // Cambia esto según la aplicación de cámara que uses
  
    window.location.href = cameraAppUrl;
  }
  
  
  navigateBack() {
    this.clearSession();
    this.location.back();
  }

  navigateToHome() {
    this.clearSession();
    this.router.navigate(['/home']);
  }
  
  private clearSession() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedInEmail');
    localStorage.removeItem('loggedInName');
    // Aquí puedes eliminar cualquier otra información relacionada con la sesión del usuario
  }
}



  

