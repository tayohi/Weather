import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { Model } from './app.component';
import { WeatherModule } from './weather.model';
import { AuthService } from './panel/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  readonly apiKey = '5a5badc73b36e7d0d731343293baf268';
  readonly URL_DB = 'https://api.mlab.com/api/1/databases/weatherapp/collections/weatherData';
  readonly param: HttpParams;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getParametr(): HttpParams {
    const userId = this.authService.user.uid;
    const user =  {'userId': userId};
    return new HttpParams().set('apiKey', 'QAAljACl8Wtei2hGTRCPO-1xTKkjtdOc').append('q', JSON.stringify(user));
  }



  geCurrentWeather(lat, lon): Observable<any> {
    return this.http.get(
      'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + this.apiKey).pipe(map(data => data));
  }


  getWeather(location): Observable<any> {
    return this.http.get(
      'https://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=' + this.apiKey).pipe(map(data => data));
  }

  getHistoryWeather(): Observable<WeatherModule[]> {
    return this.http.get<WeatherModule[]>(this.URL_DB, { params: this.getParametr() });

  }

  addtoDatabase(data: WeatherModule[]) {
     this.http.put(this.URL_DB, data, { params: this.getParametr() }).subscribe(datax => {
      console.log(datax);
    });
  }
}
