import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { User } from './user-model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  // reference: https://egghead.io/lessons/nodejs-creating-demo-apis-with-json-server
  // do: step1: npm install -g json-server
  // step2:json-server db.json
  private usersUrl = '//localhost:3000/users';

  constructor(private http: Http) { }

  getUsers(): Promise<User[]> {
    return this.http
      .get(this.usersUrl)
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  createUser(user: User): Promise<User> {
    console.log(JSON.stringify(user));
    return this.http
      .post(this.usersUrl, JSON.stringify(user), { headers: this.headers })
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  getUser(id: number): Promise<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  updateUser(user: User): Promise<User> {
    const url = `${this.usersUrl}/${user.id}`;
    return this.http
      .put(url, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(() => user)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}//-----

