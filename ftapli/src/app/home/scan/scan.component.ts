import { Component, OnInit, OnDestroy ,Input} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription }   from 'rxjs/Subscription';


import { StompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';

import { ProductService } from '../../shared/products/product.service';
import { HomeRoutingService } from '../home-routing/home-routing.service';

import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css'],
  providers: [StompService]
})
export class ScanComponent implements OnInit {
  @Input() autoNextStep;

  viewerStatus : Observable<Message>;
  allureResults : Observable<Message>;
  subscriptions: Observable<Message>[];

  started: boolean;
  scanProgression: number = 0;
  scanCounterTimer: Subscription;     //  Scan Progression Timer
  scanStartTimeout: Subscription;     //  Timeout after SCAN_START if no SCAN_STARTED
  scanStopTimeout: Subscription;      //  Timeout after SCAN_STARTED + scanCounterTimer if no SCAN_STOP
  scanAnalysisTimeout: Subscription;  //  Timeout after SCAN_STOP if no results

  spinnerMode: string = 'determinate';
  messageToDisplay: string;
  error: boolean;
  

  constructor( 
    private stompService: StompService, 
    private productService: ProductService, 
    private homeRoutingService: HomeRoutingService 
  ) {
   } 

  ngOnInit() {
    this.viewerStatus = this.stompService.subscribe('/exchange/pool_001/viewer.status');
    this.allureResults = this.stompService.subscribe('/exchange/pool_001/allure.results');
    this.subscriptions = [ this.viewerStatus, this.allureResults ];
    this.subscribe();
  }


  subscribe() {
    this.subscriptions.forEach((subscription, index) => subscription.map((message: Message) => {
      return message.body;
    }).subscribe((msg_body: string) => {
      if(index == 0) { //viewer.results
        this.onViewerResponse(msg_body);
      } else if(index == 1) { // allure.results
        this.onResults(msg_body);
      }
    }));

    this.stompService.publish('/exchange/pool_001/scanner.status', 'SCAN_START'); //Scan start trigger
    let timerScanStart = Observable.timer(0, 100);
    this.scanStartTimeout = timerScanStart.subscribe(t => this.timeoutHandling(t, 150, 'scanStartTimeout', "SCAN DIDN'T START") );

  }

  onViewerResponse(message: string) {
    let messageSplit = message.split('_');
    if(messageSplit[0] == 'SCAN') {
      switch(messageSplit[1]) {
        case 'STARTED':
          this.scanStartTimeout.unsubscribe();
          this.started = true;
          this.error = false;
          let timer = Observable.timer(0, 100); 
          this.scanCounterTimer = timer.subscribe(t => this.scanCounter(t)); //30sec counter for UI
        break;

        case 'STOP':
        if(this.scanStopTimeout) {
        this.scanStopTimeout.unsubscribe();
        }
        let timerServerTimeout = Observable.timer(0, 100); // 45sec timer for server response timeout
        this.scanAnalysisTimeout = timerServerTimeout.subscribe(t => this.timeoutHandling(t, 450, 'scanAnalysisTimeout', "NO RESULT FROM SERVER"));
        break;

      }
    }

  }

  scanCounter(second: number) {
    if(this.scanProgression > 100) {
      this.scanCounterTimer.unsubscribe();
      this.spinnerMode = 'indeterminate';
      let timerScanTimeout = Observable.timer(0, 100); // 20sec timer for SCAN_STOP response timeout
      this.scanStopTimeout = timerScanTimeout.subscribe(t => this.timeoutHandling(t, 200, 'scanStopTimeout', "SCAN DIDN'T STOP"));
    } else {
      this.scanProgression = second/10*3.33;
    }
  }

  //RESPONSE from server as follow { "status": "ok"|"error", message: string }
  onResults(rawMessage: string) {
    if(this.scanAnalysisTimeout) {
    this.scanAnalysisTimeout.unsubscribe();
    }
    let result = JSON.parse(rawMessage);
    let status = result['status'];
    let message = result['message'];
    if(status == 'error') {
      this.handleError();
      console.log(`Error: ${message}`);
    } else if(status = 'ok') {
      if(!environment.production) console.log('Capture received')
      let capture = message;
      this.productService.match(capture['id']);
      this.next();
    }
  }

  timeoutHandling(progress: number, delay: number, timeoutName: string, why?:string) {
    if(progress > delay) {
      this[timeoutName].unsubscribe();
      if(!environment.production) console.log(why);
      this.handleError();
    }
  }

  handleError() {
    this.spinnerMode = 'determinate';
    // this.started = true;
    // this.scanProgression = 100;
    this.error = true;
    document.body.style.cursor = 'auto';
  }

  next() {
    this.homeRoutingService.next(this.constructor.name);
  }

  tryAgain() {
    this.homeRoutingService.back('ScanInstructionComponent');
  }

  ngOnDestroy() {
    this.stompService.disconnect();
    let timers = [this.scanStartTimeout, this.scanStopTimeout, this.scanAnalysisTimeout];
    timers.forEach(sub => {if(sub){ sub.unsubscribe() }});
  }
}
