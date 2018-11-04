import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { WeatherModule } from '../weather.model';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { Animations } from '../animations';

@Component({
  selector: 'app-history-weather',
  templateUrl: './history-weather.component.html',
  styleUrls: ['./history-weather.component.scss'],
  animations: [
    Animations
  ]
})
export class HistoryWeatherComponent implements OnInit {
  historyWeather: WeatherModule[];

  constructor(public weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherService.historyWeatherSubject.subscribe(
      (data: WeatherModule[]) => {
        this.historyWeather = data;
      });

  }
  sortData() {
    return this.historyWeather.sort((a, b) => {
      return <any>new Date(b.date) - <any>new Date(a.date);
    });
  }

  deletefromHistoryWeather(data: WeatherModule) {
    this.weatherService.deleteHistoryWeather(data);

  }

}
