import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {
  username : string = '';
  videoStream : MediaStream | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location,
    ) { }
  

  openCamera() {
    this.authService.openCamera().then(stream => {
      if (stream) {
        this.videoStream = stream;
      }else{
        console.log('No se pudo abrir la camara');
      }
    });
  }


  ngOnInit() {
    this.username = localStorage.getItem('loggedInName') || 'Invitado';
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



  

