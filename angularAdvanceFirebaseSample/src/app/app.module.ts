import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { DatabaseFireService } from './database-fire.service';
import {LoginService} from './login/login.service';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';


export const firebaseConfig = {
    apiKey: 'AIzaSyB2l0CEM48nr7zNBefiw4X77bVlrZMPE50',
    authDomain: 'pepper-e92a2.firebaseapp.com',
    databaseURL: 'https://pepper-e92a2.firebaseio.com',
    projectId: 'pepper-e92a2',
    storageBucket: 'pepper-e92a2.appspot.com',
    messagingSenderId: '215979563574'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot([
          { path: 'login', component: LoginComponent }
      ])
  ],
  providers: [DatabaseFireService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
