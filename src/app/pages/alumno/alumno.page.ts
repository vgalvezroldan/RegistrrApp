import { Component, OnInit } from '@angular/core';
import { QrScannerService } from '../../services/qr-scanner.service'; // Ajusta la ruta según la ubicación de tu servicio
import { Router} from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  constructor(private qrScannerService: QrScannerService,
    private router: Router,
    private location: Location,) { }
  

  ngOnInit() {
  }

  async scanQRCode() {
    try {
      const qrCodeData = await this.qrScannerService.scanQR(); // Escanear el código QR
      if (qrCodeData) {
        const alumnoInfo = JSON.parse(qrCodeData); // Decodificar la información
        // Aquí puedes implementar la lógica para registrar la asistencia
        // y enviar un correo electrónico al profesor
      }
    } catch (error) {
      console.error('Error al escanear el código QR:', error);
    }
  }

  
  navigateToHome() {
    this.router.navigate(['/home']); 
  }
  navigateBack() {
   this.location.back(); 
  }
}


  

