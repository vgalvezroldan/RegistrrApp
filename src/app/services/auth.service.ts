import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: any[];

  constructor() {

    
     // Inicializar 'users' desde localStorage
     this.users = JSON.parse(localStorage.getItem('users') || '[]');

     // Verificar y añadir usuarios predefinidos si no existen
     this.ensurePredefinedUsers();
   }
 
   private ensurePredefinedUsers(): void {
     const predefinedUsers = [
       { name: 'Alumno', email: 'alumno@duocuc.cl', password: '12345'},
       { name: 'Profesor', email: 'profesor@duocuc.cl', password: '12345'}
     ];
 
     let needsUpdate = false;
     predefinedUsers.forEach(predefinedUser => {
       if (!this.userExists(predefinedUser.email)) {
         this.users.push(predefinedUser);
         needsUpdate = true;
       }
     });
 
     if (needsUpdate) {
       localStorage.setItem('users', JSON.stringify(this.users));
     }
   }

  registerUser(name: string, email: string, password: string): boolean {
    const userExists = this.users.some(user => user.email === email);
    if (userExists) {
      return false;
    }

    const newUser = { name, email, password };
    this.users.push(newUser);
    localStorage.setItem('users', JSON.stringify(this.users));
    return true;
  }

  login(email: string, password: string): boolean {
    return this.users.some(user => user.email === email && user.password === password);
  }

  userExists(email: string): boolean {
    return this.users.some(user => user.email === email);
  }

  getCurrentUser(email: string) {
    return this.users.find(user => user.email === email);
  }
  

  getRegisteredUsers() {
    return this.users;
  }

  getUserByEmail(email: string) {
    return this.users.find(user => user.email === email);
  }

  // Validar si el usuario es profesor sino enviar a page alumno

  isProfessor(email: string): boolean {
    return email === 'profesor@duocuc.cl'; // Asumiendo que este es el correo del profesor
}


async openCamera(): Promise<MediaStream | undefined> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    // Retorno exitoso del stream
    return stream;
  } catch (err) {
    console.error('Error al abrir la cámara:', err);
    // Retorno de undefined en caso de error
    return undefined;
  }
}
}




