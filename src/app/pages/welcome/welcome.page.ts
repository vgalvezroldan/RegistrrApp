import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { WeatherService } from '../../services/weather.service'; 

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  userName: string = '';
  weatherData: any = null; 

  constructor(
    private authService: AuthService, 
    private router: Router,
    private weatherService: WeatherService 
  ) {}
  
  ngOnInit() {
    const userEmail = localStorage.getItem('loggedInEmail');
    if (userEmail) {
      const user = this.authService.getCurrentUser(userEmail);
      if (user) {
        this.userName = user.name;
      }
    }

    this.weatherService.getWeather().subscribe(data => {
      console.log('Datos del clima recibidos:', data);
      this.weatherData = data;
    }, error => {
      console.error('Error al obtener datos del clima:', error);
    });
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const dateLocale = currentDate.toLocaleDateString('es-ES', options);
    return dateLocale;
  }
  

  getCurrentTime(): string {
    const currentTime = new Date();
    const timeLocale = currentTime.toLocaleTimeString('es-ES');
    return timeLocale;
  }

  openRegisteredUsersPage() {
    this.router.navigate(['/registered-users']); 
  }

 
}
