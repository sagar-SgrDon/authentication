import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: any) {
    return this.http
      .post('/api/authenticate', JSON.stringify(credentials))
      .pipe(
        map((response: any) => {
          // console.log(response);
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            return true;
          }
          return false;
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    let token = localStorage.getItem('token');
    if (!token) return false;
    let jwtHelper = new JwtHelperService();
    let tokenExpirationDate = jwtHelper.getTokenExpirationDate(token);
    let isExpired = jwtHelper.isTokenExpired(token);
    // console.log('Ex. date: ', tokenExpirationDate);
    // console.log('isExpired: ', isExpired);
    return !isExpired;
    return false;
  }

  get currentUser() {
    let token = localStorage.getItem('token');
    if (!token) return null;
    const decodedToken = new JwtHelperService().decodeToken(token);

    // console.log(decodedToken);
    return decodedToken;
  }
}
