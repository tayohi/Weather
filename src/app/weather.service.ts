import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { WeatherModule } from './weather.model';
import { HttpService } from './http.service';
import { Subject, Subscription, Observable, BehaviorSubject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { AuthService } from './panel/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable({
  providedIn: 'root'
})
export class WeatherService implements OnDestroy {
  subscription: Subscription;
  currentSubscription: Subscription;
  constructor(private httpService: HttpService, private authService: AuthService, public angularFire: AngularFireAuth) {
    angularFire.authState.subscribe(user => {
      if (user) {
        this.init();
      } else {
        this.historyWeather.push();
        this.historyWeatherSubject.next([]);
        console.log('xxx');
      }
    });
  }

  state = 'out';
  userId = 'localWeather';
  searchError = null;
  localWeatherSubject = new Subject<WeatherModule[]>();
  currentWeatherSubject = new Subject<WeatherModule[]>();
  historyWeatherSubject = new BehaviorSubject<WeatherModule[]>([]);
  public localWeather: WeatherModule[] = [];
  currentWeather: WeatherModule[] = [];
  historyWeather: WeatherModule[] = [];


  init() {
    this.httpService.getHistoryWeather().subscribe(data => {
      this.historyWeatherSubject.next(data);
    });
  }

  getWeatherData() {
    return this.localWeather.slice();
  }
  getCurrentWeatherData() {
    return this.currentWeather.slice();
  }
  getHistoryWeather() {
    return this.historyWeather.slice();
  }

  getCurrentWeather(value, value2) {
    this.currentSubscription = this.httpService.geCurrentWeather(value, value2)
    .subscribe(data => {
      const getWeather = [new WeatherModule(data.name, data.sys.country, this.userId,
        (data.main.temp - 273.15), data.wind.speed, data.main.humidity, data.coord.lat, data.coord.lon, new Date())];
      this.currentWeather = getWeather;
      this.currentWeatherSubject.next(getWeather);
    });
  }

  getLocalWeather(value: string) {
    this.subscription = this.httpService.getWeather(value)
      .subscribe(data => {
        const getWeather = [new WeatherModule(value, data.sys.country, this.userId,
          (data.main.temp - 273.15), data.wind.speed, data.main.humidity, data.coord.lat, data.coord.lon, new Date())];
        this.localWeather = getWeather;
        this.localWeatherSubject.next(getWeather);
        this.searchError = null;
      }, (error => {
        this.searchError = error.status;
       }));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.currentSubscription.unsubscribe();

  }

  toHistoryWeather(data: WeatherModule[]) {

    this.historyWeatherSubject.next(this.historyWeatherSubject.getValue().concat(data));
    this.httpService.addtoDatabase(this.historyWeatherSubject.getValue());

  }

  deleteHistoryWeather(data: WeatherModule) {
    const list = this.historyWeatherSubject.getValue();
    this.historyWeatherSubject.next(list.filter(e => e.date !== data.date));
    this.httpService.addtoDatabase(this.historyWeatherSubject.getValue());

  }

  checkIfEmpty() {
    if (this.localWeather.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  onEnd(event) {
    this.state = 'out';
    if (event.toState === 'out') {
      setTimeout(() => {
        this.state = 'in';
      }, 0);
    }
  }
}
