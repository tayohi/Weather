import { Component, OnInit, } from '@angular/core';
import { ResponseOptions } from '@angular/http';
import { HttpService } from '../http.service';
import { WeatherModule } from '../weather.model';
import { NgModel } from '@angular/forms';
import { WeatherService } from '../weather.service';
import { AuthService } from '../panel/auth.service';
import { Animations } from '../animations';
import { Router } from '@angular/router';



@Component({
  selector: 'app-local-weather',
  templateUrl: './local-weather.component.html',
  styleUrls: ['./local-weather.component.scss'],
  animations: [
    Animations
  ]
})
export class LocalWeatherComponent implements OnInit {

  checkLog = true;
  localWeather: WeatherModule[] = [];


  constructor(private httpService: HttpService,
    public weatherService: WeatherService, public authServie: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.localWeather = this.weatherService.getWeatherData();
    this.weatherService.localWeatherSubject.subscribe(
      (data: WeatherModule[]) => {
        this.localWeather = data;
      });

  }

  sendtoLocalWeather(value: string) {
    this.weatherService.getLocalWeather(value);
  }

  sendtoHistoryWeather() {

    if (this.authServie.user) {
      const toDataWeatcher = this.localWeather;
      toDataWeatcher[0].userId = this.authServie.user.uid;
      this.weatherService.toHistoryWeather(toDataWeatcher);
      this.weatherService.localWeatherSubject.next([]);
      this.weatherService.localWeather = [];
      this.checkLog = true;
    } else {
      this.router.navigate(['/panel']);
      this.checkLog = false;
    }
  }

}
