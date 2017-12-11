import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string;

  logIn(email: string, password: string): boolean {
    if (email === 'jesus@perro.com' && password === '1234') {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

    return this.isLoggedIn;
  }

  logOut() {
    this.isLoggedIn = false;
  }
}
