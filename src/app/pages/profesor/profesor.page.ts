import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import * as QRCode from 'qrcode'; // Importa la biblioteca qrcode


@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})

export class ProfesorPage implements OnInit {
  qrCodeValue: string = ''; // Variable para almacenar el valor del código QR
  username : string = ''; // Variable para almacenar el nombre de usuario

  constructor(
    private router: Router,
    private location: Location
  ) {}
  
  ngOnInit() {
    this.generateQRCode();
    this.username = localStorage.getItem('loggedInName') || 'Invitado';
  }

  generateQRCode() {
    const email = 'profesor@duocuc.cl';
    const subject = encodeURIComponent('Registro de Asistencia');
    const body = encodeURIComponent('El alumno se ha registrado en la clase de hoy.');
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
    
    QRCode.toDataURL(mailtoLink)
      .then(url => {
        this.qrCodeValue = url;
      })
      .catch(err => {
        console.error('Error al generar el código QR:', err);
      });
  }
  

  openRegisteredUsersPage() {
    this.router.navigate(['/registered-users']); 
  }
  
    navigateToHome() {
      this.clearSession();
      this.router.navigate(['/home']);
    }
  
    navigateBack() {
      this.clearSession();
      this.location.back();
    }
  
    private clearSession() {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('loggedInEmail');
      localStorage.removeItem('loggedInName');
    }
  }
  

