import { Injectable } from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {StompConfig, StompConfigService} from '@stomp/ng2-stompjs';

import {environment} from '../../../environments/environment';


/**
 * An injected class which will provide StompConfigService
 *
 * @type ConfigService
 */


@Injectable()
export class AppStompConfigService  extends StompConfigService {

   /** Constructor */
  constructor() {
    super();
  }

  public get(): Observable<StompConfig> {

      const conf: StompConfig= {
        // Which server?
        url: "ws://dev.stefanka.tech:15674/stomp/websocket",

        user: "medusa",
        pass: "m3dus4!",

        // How often to heartbeat?
        // Interval in milliseconds, set to 0 to disable
        heartbeat_in: 0, // Typical value 0 - disabled
        heartbeat_out: 20000, // Typical value 20000 - every 20 seconds

        // Wait in milliseconds before attempting auto reconnect
        // Set to 0 to disable
        // Typical value 5000 (5 seconds)
        reconnect_delay: 5000,

        // Will log diagnostics on console
        debug: environment.production ? false : true
      };

      return Observable.of(conf);
  }
}