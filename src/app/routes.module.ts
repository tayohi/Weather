import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LocalWeatherComponent } from './local-weather/local-weather.component';
import { HistoryWeatherComponent } from './history-weather/history-weather.component';
import { PanelComponent } from './panel/panel.component';
import { AuthGuardService } from './panel/auth-guard.service';


const appRoutes: Routes = [
  {
    path: '',
    component: LocalWeatherComponent
  },
  {
    path: 'history',
    component: HistoryWeatherComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'panel',
    component: PanelComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    [RouterModule.forRoot(appRoutes, {useHash: true})]
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutesModule { }
