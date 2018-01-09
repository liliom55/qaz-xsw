import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IPost } from '../../posts/post.interface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/Observable/throw';
import { AppError } from '../app-error';
import { NotFoundError } from '../not-found-error';
import { Response } from '@angular/http/src/static_response';
import { BadRequestError } from '../bad-request-error';

@Injectable()
export class DataService {
  // go to folder posts in cmd, do=>  json-server db.json watch
  constructor(private apiUrl: string, private http: Http) { }
  getAll() {
    return this.http.get(this.apiUrl)
      .map(response => response.json())
      .catch(this.errorHandle);
  }
  add(resource) {
    // // to simolate an error :
    // return Observable.throw(new AppError());
    // ------------------------------------
    return this.http.post(this.apiUrl, JSON.stringify(resource))
      .map(response => response.json())
      .catch(this.errorHandle);
  }
  update(resource) {
    return this.http.patch(this.apiUrl + '/' + resource.id, JSON.stringify({ isRead: true }))
      .map(response => response.json())
      .catch(this.errorHandle);
  }
  delete(resource) {
    // to simolate an error :
    return Observable.throw(new AppError());
    // ------------------------------------
    // return this.http.delete(this.apiUrl + '/' + resource.id)
    //   .map(response => response.json())
    //   .catch(this.errorHandle);
  }
  errorHandle(error) {
    // alert('An unexpected error');
    if (error.status === 404) {
      return Observable.throw(new NotFoundError());
    }
    if (error.status === 400) {
      return Observable.throw(new BadRequestError(error));
    }
    return Observable.throw(new AppError(error));
  }
}
