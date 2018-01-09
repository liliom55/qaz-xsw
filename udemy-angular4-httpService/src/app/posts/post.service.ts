import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from '../common/services/data.service';

@Injectable()
export class PostService extends DataService {
  // go to folder posts in cmd, do=>  json-server db.json watch
  constructor(http: Http) {
    super('http://localhost:3000/posts', http);
  }
}
