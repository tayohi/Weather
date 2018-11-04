import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpModule,  } from '@angular/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { LocalWeatherComponent } from './local-weather/local-weather.component';
import { HistoryWeatherComponent } from './history-weather/history-weather.component';
import { RoutesModule } from './routes.module';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './weather.service';
import { PanelComponent } from './panel/panel.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthGuardService } from './panel/auth-guard.service';
import { AuthService } from './panel/auth.service';
import { CurrentWeatherComponent } from './local-weather/current-weather/current-weather.component';



const config = {
  apiKey: 'AIzaSyDi8f46KJTxofI0ashTTBWwiN7d2R6zK2k',
  authDomain: 'todolist-ae185.firebaseapp.com',
  databaseURL: 'https://todolist-ae185.firebaseio.com',
  projectId: 'todolist-ae185',
  storageBucket: 'todolist-ae185.appspot.com',
  messagingSenderId: '112027026111'
};



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LocalWeatherComponent,
    HistoryWeatherComponent,
    PanelComponent,
    CurrentWeatherComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    RoutesModule,
    HttpModule,
    HttpClientModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule
  ],
  providers: [HttpService, WeatherService, AuthGuardService, AuthService],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
