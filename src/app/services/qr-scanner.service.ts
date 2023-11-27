import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Injectable({
  providedIn: 'root'
})
export class QrScannerService {

  constructor() {}

  async scanQR() {
    // Solicitar permiso para usar la cámara
    const status = await BarcodeScanner.checkPermission({ force: true });

    if (status.granted) {
      // Iniciar el escaneo
      const result = await BarcodeScanner.startScan();
      if (result.hasContent) {
        console.log(result.content); // Aquí manejas el contenido del código QR
        return result.content;
      }
    }
    return null;
  }
}
