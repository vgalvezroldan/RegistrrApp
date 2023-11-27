import { Injectable } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';


@Injectable({
  providedIn: 'root'
})
export class QrScannerService {

  constructor() {}

  async openCamera() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: false,
        resultType: CameraResultType.Uri
      });
      console.log(image);
      // Aquí puedes manejar la imagen o el URI devuelto por la cámara
    } catch (error) {
      console.error('Error al abrir la cámara:', error);
    }
  }
}
