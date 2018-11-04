import { Injectable } from '@angular/core';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { User } from '../../../node_modules/firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  public showEmailError;
  public showPassError;

  constructor(public angularFire: AngularFireAuth, private router: Router) {
    angularFire.authState.subscribe(user => {
      this.user = user;
    });
  }

login(email: string, password: string) {
  this.angularFire.auth.signInWithEmailAndPassword(email, password)
  .then(user => {
    this.router.navigate(['/history']);
  })
  .catch(err => {
    this.showEmailError = JSON.parse(JSON.stringify(err.message));
    console.log(this.showEmailError);
  });
}

signup(email: string, password: string) {
  this.angularFire.auth.createUserWithEmailAndPassword(email, password)
  .then(user => {
    this.router.navigate(['/']);
    console.log(user);
  })
  .catch(err => {
    this.showPassError = JSON.parse(JSON.stringify(err.message));
    console.log(this.showPassError);
  });
}

logout() {
  this.angularFire.auth.signOut();
  this.showEmailError = null ;
}



}
