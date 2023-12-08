import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BrowserQRCodeReader } from '@zxing/library';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {
  username: string = '';
  videoStream: MediaStream | null = null;
  showManualRegistrationButton: boolean = false;
  private scanTimeout: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.username = localStorage.getItem('loggedInName') || 'Invitado';
  }

  openCameraAndScanQR() {
    const codeReader = new BrowserQRCodeReader();

    this.showManualRegistrationButton = false;
    clearTimeout(this.scanTimeout);

    this.authService.openCamera().then(stream => {
      if (stream) {
        this.videoStream = stream;
        const videoElement = document.getElementById('videoElement') as HTMLVideoElement;
        videoElement.srcObject = stream;

        codeReader.decodeFromVideoElement(videoElement)
          .then(result => {
            window.location.href = result.getText();
            codeReader.reset();
            // stream.getTracks().forEach(track => track.stop());
          })
          .catch(err => {
            console.error('Error al escanear QR:', err);
            this.showManualRegistrationButton = true;
          });

        this.scanTimeout = setTimeout(() => {
          this.showManualRegistrationButton = true;
        }, 10000); // 10 segundos
      } else {
        console.log('No se pudo abrir la cámara');
        this.showManualRegistrationButton = true;
      }
    });
  }

  navigateToManualRegistration() {
    
    this.router.navigate(['/login']);
  }

  navigateBack() {
    this.clearSession();
    this.router.navigate(['/']);
  }

  navigateToHome() {
    this.clearSession();
    this.router.navigate(['/home']);
  }

  private clearSession() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedInEmail');
    localStorage.removeItem('loggedInName');
    
  }
}
