import { Component, OnInit } from '@angular/core';
import { Router } from 'node_modules/@angular/router';
import { AuthService } from '../panel/auth.service';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router, private weatherService: WeatherService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/panel']);
    this.weatherService.localWeather = [];
    }

}
