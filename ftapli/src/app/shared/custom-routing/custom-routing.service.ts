import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { CustomRouting } from './custom-routing';

@Injectable()
export class CustomRoutingService {

  constructor() { }

  // Observable string sources
  private routingEmitter = new Subject<CustomRouting>();
  // Observable string streams
  routingEmmitter$ = this.routingEmitter.asObservable();

  switchRoute(previous: string, current: string) {
    this.routingEmitter.next(new CustomRouting([previous], current));
  }

}
