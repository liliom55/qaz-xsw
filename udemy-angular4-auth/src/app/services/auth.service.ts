import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  //currentUser: any;

  constructor(private http: Http) {
  }

  login(credentials) {
    return this.http.post('/api/authenticate', JSON.stringify(credentials))
      .map(response => {
        let result = response.json();

        if (result && result.token) {
          localStorage.setItem('token', result.token);

          // let jwt = new JwtHelper();
          // this.currentUser = jwt.decodeToken(localStorage.getItem('token'));

          return true;
        }
        else return false;
      });
  }

  logout() {
    localStorage.removeItem('token');
    // this.currentUser = null;
  }

  isLoggedIn() {
    // let jwtHelper = new JwtHelper();
    // let token = localStorage.getItem('token');
    // if(!token)
    //   return false;
    // let expierationDate = jwtHelper.getTokenExpirationDate(token);
    // let isExpiered = jwtHelper.isTokenExpired(token);
    // return !isExpiered;
    // or only :
    return tokenNotExpired('token');
  }
  get currentUser()
  {
    let token = localStorage.getItem('token');
    if (!token) return null;
      return new JwtHelper().decodeToken(token);
  }
}

