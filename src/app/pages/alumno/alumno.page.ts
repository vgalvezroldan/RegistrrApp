import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { BrowserQRCodeReader } from '@zxing/library';


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
  

    openCameraAndScanQR() {
      const codeReader = new BrowserQRCodeReader();
    
      this.authService.openCamera().then(stream => {
        if (stream) {
          this.videoStream = stream;
          const videoElement = document.getElementById('videoElement') as HTMLVideoElement;
          videoElement.srcObject = stream;
    
          codeReader.decodeFromVideoElement(videoElement)
            .then(result => {
              const scannedText = result.getText();
    
              
              
              window.location.href = scannedText; // Esto abrirá el enlace mailto
    
              codeReader.reset();
              // Si deseas detener el stream de la cámara después del escaneo, puedes descomentar la siguiente línea
              // stream.getTracks().forEach(track => track.stop());
            })
            .catch(err => {
              console.error('Error al escanear QR:', err);
            });
        } else {
          console.log('No se pudo abrir la cámara');
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

  
  scanQR() {
    const codeReader = new BrowserQRCodeReader();
    this.authService.openCamera().then(stream => {
      if (stream) {
        this.videoStream = stream;
        
        // Inicia el escaneo de QR
        const videoElement = document.getElementById('videoElement') as HTMLVideoElement;
  
        codeReader.decodeFromVideoElement(videoElement)
        .then(result => {
          console.log(result.getText()); // Usa getText() en lugar de text
          // Detiene el escaneo si es necesario
        })
        .catch(err => {
          console.error(err);
          // Maneja los errores aquí
        })
        .finally(() => {
          codeReader.reset();
        });
      } else {
        console.log('No se pudo abrir la cámara');
      }
    }).catch(err => {
      console.error('Error al iniciar la cámara:', err);
    });
  }


}





  

