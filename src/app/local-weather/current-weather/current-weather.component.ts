import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/weather.service';
import { WeatherModule } from 'src/app/weather.model';
import { Animations } from '../../animations';
import { AuthService } from 'src/app/panel/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
  animations: [
    Animations
  ]
})
export class CurrentWeatherComponent implements OnInit {

  checkLog = true;
  currentWeather: WeatherModule[] = [];

  constructor(private weatherService: WeatherService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.getPosition();
    this.currentWeather = this.weatherService.getCurrentWeatherData();
    this.weatherService.currentWeatherSubject.subscribe(
      (data: WeatherModule[]) => {
        this.currentWeather = data;
      });
  }

getPosition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      this.weatherService.getCurrentWeather(position.coords.latitude.toFixed(2).toString(),
        position.coords.longitude.toFixed(2).toString());
        console.log(position);
    }, error => console.log(error));
  }
}

sendtoHistoryWeather() {

  if (this.authService.user) {
    const toDataWeatcher = this.currentWeather;
    toDataWeatcher[0].userId = this.authService.user.uid;
    this.weatherService.toHistoryWeather(toDataWeatcher);
    this.checkLog = true;
  } else {
    this.router.navigate(['/panel']);
    this.checkLog = false;
  }
}


}
