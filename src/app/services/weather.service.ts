import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WeatherResponse } from './weather-response.model'; 

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '033edfbc6119a6ac7e6fb72f6aad2d61';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Santiago,cl&appid=' + this.apiKey;

  constructor(private http: HttpClient) {}

  getWeather(): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(this.apiUrl).pipe(
      map(response => {
        const temperatureKelvin = response.main.temp;
        const temperatureCelsius = (temperatureKelvin - 273.15).toFixed(1); 
        response.main.temp = parseFloat(temperatureCelsius); 
        return response;
      })
    );
  }
}
