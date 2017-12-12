import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Http } from '@angular/http';
@Injectable()
export class LoginService {
  user_api;
  constructor(private af: AngularFire, private http: Http) { }
  getAuthState() {
    this.af.auth.subscribe(authState => {
      if (!authState) { return; }
      // calling facebook graph API:
      let userRef = this.af.database.object('/users/' + authState.uid);
      userRef.subscribe(user => {
        let url = `https://graph.facebook.com/${authState.facebook.uid}?fields=first_name,last_name,gender&access_token=${user.accessToken}`;
        this.http.get(url).subscribe(response => {
          this.user_api = response.json();
          // Save json to firebase database
          userRef.update({
            firstName: this.user_api.first_name,
            lastName: this.user_api.last_name,
            gender: this.user_api.gender,
            id: this.user_api.id
          }).then(x => { console.log('SAVED TO FIREBASE DATABASE'); });
        });
      });
    });
    return this.user_api;
  }
  loginFacebook() {
    return this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
      scope: ['public_profile', 'user_friends']
    });
  }
  logout() {
    this.af.auth.logout();
  }
  addUserToFirebase(authState: any) {
    this.af.database.object('/users/' + authState.uid).update({
      accessToken: authState.facebook.accessToken
    });
  }

  registerUser() {
    return this.af.auth.createUser({
      email: 'liliomyahoo.com',
      password: 'qazxswedc'
    });
  }
  loginEmail() {
    return this.af.auth.login({
      email: 'liliom@yahoo.com',
      password: 'qazxwedc'
    }, {
        method: AuthMethods.Password,
        provider: AuthProviders.Password
      });
  }
}
