import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {

  constructor(public authService: AuthService) { }

  login(formData: NgForm) {
    this.authService.login(formData.value.email, formData.value.password);

  }

  signup(formData: NgForm) {
    this.authService.signup(formData.value.email, formData.value.password);
  }



}
