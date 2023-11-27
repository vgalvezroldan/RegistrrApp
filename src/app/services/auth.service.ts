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
}


