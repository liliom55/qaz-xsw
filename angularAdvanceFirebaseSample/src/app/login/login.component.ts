import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  displayName = null;
  photoUrl = null;
  errorMessage: string;
  constructor(private service: LoginService) { }

  ngOnInit() {
    if (this.displayName === null) {
      console.log('NOT LOGGED IN');
      return;
    }
    console.log('LOGGED IN');
  }
    loginFacebook() {
    this.service.loginFacebook().then((authState: any) => {
      this.displayName = authState.auth.displayName;
      this.photoUrl = authState.auth.photoURL;
      this.service.addUserToFirebase(authState);
      // console.log('AUTHSTATE', authState);
    });
    this.service.getAuthState();

  }
  register() {
    this.service.registerUser()
      .then(authState => {
        authState.auth.sendEmailVerification()
          .then(x => {console.log('SUCCESSFUL REGISTRATION'); })
          .catch(error => this.errorMessage = 'ERROR-EMAIL-VERIFICATION: ' + error.message);
        console.log('REGISTER-THEN', authState);
      })
      .catch(error => this.errorMessage = 'REGISTER-ERROR: ' + error.message);
  }

  loginEmailPasswrd() {
    this.service.loginEmail()
    .then(authState => console.log('LOGIN-THEN', authState))
    .catch(error => this.errorMessage = 'ERROR-LOGIN: ' + error.message );
  }
  loguot() {
    this.displayName = null;
    this.photoUrl = null;
    this.service.logout();

  }
}
