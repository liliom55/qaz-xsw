import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

import * as Stomp from 'stompjs';

declare var jQuery: any;
declare var require: any;
@Injectable()
export class SendMessageServerService {
    public messages: Subject<Stomp.Message>;
    private client: Stomp.Client;
    public onRecieveMsg_scaner: Function;
    public onRecieveMsg_server: Function;
    public message_recieved = "";
    constructor() {
        this.messages = new Subject<Stomp.Message>();
    }
    sendMessage() {
        //var Stomp = require('stompjs');
        //var client = Stomp.client('ws://dev.stefanka.tech:15674/stomp/websocket');
        ////var ws = new WebSocket('ws://dev.stefanka.tech:15674/stomp/websocket');
        ////var client = Stomp.over(ws);
        //client.heartbeat.incoming = 0;
        //client.heartbeat.outgoing = 0;
        //var on_connect = function () {
        //    console.log('connected');
        //    client.send("/exchange/pool_001/#", {'routingKey': 'scanner.status'}, "SCAN_START");

        //};
        //var on_error = function () {
        //    console.log('error');
        //};
        //client.connect('medusa', 'm3dus4!', on_connect, on_error, '/');
        this.client = Stomp.client('ws://dev.stefanka.tech:15674/stomp/websocket');
        this.client.heartbeat.incoming = 0;
        this.client.heartbeat.outgoing = 0;
        this.client.connect('medusa', 'm3dus4!', this.on_connect_sending, this.on_error_sending, '/');
    }
    private on_connect_sending = (x) => {
        console.log('connected');
        //alert(x);
        setTimeout(() => this.client.send("/exchange/pool_001/scanner.status", { 'routingKey': 'scanner.status' }, "SCAN_START"), 1000);
    }
    private on_error_sending = () => {
        console.log('error');
    }
    //----------------------------------- Medusa / scanner ---------------------------------------------------
    reciveMessageFromScaner() {
        //var Stomp = require('stompjs');
        //var client = Stomp.client('ws://dev.stefanka.tech:15674/stomp/websocket');
        //client.heartbeat.incoming = 0;
        //client.heartbeat.outgoing = 0;
        //var on_connect = function (x) { //{"id":"sub-0"}
        //    var callback = function (message) {
        //        // called when the client receives a STOMP message from the server
        //        if (message.body) {
        //            if (message.body.substring(0, 1) == "{") {
        //                alert(message.body.substring(0, 1));
        //                let strToJson = jQuery.parseJSON(message.body);
        //                let id = strToJson.id;
        //                sessionStorage.setItem("captureId", id);
        //                //return id;
        //            }
        //        }
        //    };
        //    var sub1 = client.subscribe("/exchange/pool_001/scanner.status", callback, { routingKey: "scanner.status" });
        //};
        //var on_error = function () {
        //    console.log('error');
        //};
        //client.connect('medusa', 'm3dus4!', on_connect, on_error, '/');

        this.client = Stomp.client('ws://dev.stefanka.tech:15674/stomp/websocket');
        this.client.heartbeat.incoming = 0;
        this.client.heartbeat.outgoing = 0;

        this.client.connect('medusa', 'm3dus4!', this.on_connect_recieving_scaner, this.on_error_recieving, '/');
    }
    private on_connect_recieving_scaner = (x) => {
        console.log('connected');

        var sub1 = this.client.subscribe("/exchange/pool_001/viewer.status", this.callback_scaner, { routingKey: "viewer.status" });
        //var sub1 = this.client.subscribe("/exchange/pool_001/scanner.status", this.callback_scaner, { routingKey: "scanner.status" });
        
    }
    private callback_scaner = (message) => {
        if (message.body) {
            this.message_recieved = message.body;
            this.onRecieveMsg_scaner();
        }
    }
    public setRecieveMsgCallback1(cb: Function) {
        this.onRecieveMsg_scaner = cb;
    }
    //-------------------------------------------- result / server --------------------------------
    reciveMessageFromServer() {
        this.client = Stomp.client('ws://dev.stefanka.tech:15674/stomp/websocket');
        this.client.heartbeat.incoming = 0;
        this.client.heartbeat.outgoing = 0;

        this.client.connect('medusa', 'm3dus4!', this.on_connect_recieving_server, this.on_error_recieving, '/');
    }
    private on_connect_recieving_server = (x) => {
        console.log('connected');
        var sub1 = this.client.subscribe("/exchange/pool_001/allure.results", this.callback_server, { routingKey: "allure.results" });
        //var sub1 = this.client.subscribe("/exchange/pool_001/scanner.status", this.callback_server, { routingKey: "scanner.status" });
    }
    private callback_server = (message) => {
        if (message.body) {
            this.message_recieved = message.body;
            this.onRecieveMsg_server();
        }
    }
    public setRecieveMsgCallback2(cb: Function) {
        this.onRecieveMsg_server = cb;
    }

    private on_error_recieving = () => {
        console.log('error');
    }

}
