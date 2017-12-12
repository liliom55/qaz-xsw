import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';

import { environment } from '../../../environments/environment';

import { Client, ClientCaptureMetric, ClientCapture } from '../../shared/clients/client.model';
import { ClientService } from '../../shared/clients/client.service';
import { HomeRoutingService } from '../home-routing/home-routing.service';

@Component({
    selector: 'body-type',
    templateUrl: './body-type.component.html',
    styleUrls: ['../home.component.css', 'body-type.component.css'],
})

export class BodyTypeComponent implements OnInit, AfterViewInit {
    @Input() client: Client;
    @Input() clientCapture: ClientCapture;
    @Input() autoNextStep;
    // @Output() switchView = new EventEmitter<string>();
    public gender: string = this.getGender();
    appType: string;
    private imageSource: string = `assets/images/bodyTypes/${this.gender}/`;

    clientBodyTypes: ClientCaptureMetric[] = [];
    public bodyTypes: Object = {
        "F": [
            {
                title: "Select your breast volume",
                type: "volume",
                bodyTypeItems: [
                    { id: 0, title: "Thin & discrete" },
                    { id: 1, title: "Somewhat average" },
                    { id: 2, title: "Voluminous & massive" }
                ]
            },
            {
                title: "Select your breast spacing",
                type: "spacing",
                bodyTypeItems: [
                    { id: 0, title: "Quite close" },
                    { id: 1, title: "Somewhat spaced" }
                ]
            },
            {
                title: "Select where the tip of your breast is pointing",
                type: "sagging",
                bodyTypeItems: [
                    { id: 0, title: "Upward" },
                    { id: 1, title: "Straight ahead" },
                    { id: 2, title: "Downward" }
                ]
            }
        ],
        "M": [
            {
                title: "Select your type of morphology",
                type: "belly_type",
                bodyTypeItems: [
                    { id: 0, title: "Thin or muscular shape." },
                    { id: 1, title: "Average size / I don't know." },
                    { id: 2, title: "Stout build with slighty bumped stomach." }
                ]
            }
        ]
    };
    currentIndex: number;
    selectedType: Object;

    constructor(
        private clientService: ClientService,
        private homeRoutingService: HomeRoutingService
    ) { }

    ngOnInit() {
        document.body.style.cursor = 'auto';
        this.currentIndex = 0;
        this.selectedType = { id: null, title: null }

        // for avoiding to get the previous measurement
        if (this.clientCapture.clientCaptureMetrics) {
            this.clientCapture.clientCaptureMetrics = null;
        }

        this.appType = environment.app;


    }
    ngAfterViewInit() {
        //only for fitroom app,implement auto step
        if (this.autoNextStep) {
            this.theLoop(this.bodyTypes['F'].length - 1)
        }
    }
    theLoop(i) {
        setTimeout(() => {
            let bodyTypeItems = this.bodyTypes['F'][i]['bodyTypeItems'];
            let type = this.bodyTypes['F'][i]['type'];
            // generate random body type selection
            let value = this.getRandomNumber(0, bodyTypeItems.length - 1);
            let bodyTypeItem = bodyTypeItems.find((obj) => obj.id == value);
            console.log('selected body type: ', bodyTypeItem);
            this.selectType(bodyTypeItem);
            this.gatherBodyType(type, value);
            if (--i >= 0) {
                this.theLoop(i);
            }
        }, this.autoNextStep * 1000);
    }
    // in fitroom app, implement auto step
    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    private getGender(): string {
        return environment.gender;
    }

    selectType(bodyTypeItem: Object) {
        this.selectedType = bodyTypeItem;

    }

    gatherBodyType(type: string, value: number) {
        this.currentIndex += 1;
        this.clientBodyTypes.push(new ClientCaptureMetric(type, value));
        if (this.currentIndex == this.bodyTypes[this.gender].length) { // No more measurement to collect
            if (this.autoNextStep) {
                setTimeout(() => {
                    this.submitBodyType(this.clientBodyTypes);
                }, this.autoNextStep);
            } else {
                this.submitBodyType(this.clientBodyTypes);
            }
        } else { //Go to next measurement type
            this.selectedType = { id: null, title: null }
        }

    }



    //Create a clientCapture from measurement form; then tries to make a match
    submitBodyType(clientCaptureMetrics: ClientCaptureMetric[]): void {

        if (!this.clientCapture.clientCaptureMetrics) { // First input of metrics in clientCapture
            this.clientCapture.clientCaptureMetrics = clientCaptureMetrics;
            if (this.appType === 'fitStand') {
                this.next();
            } else {
                // fitroom
                this.clientService.addClientCapture(this.clientCapture, this.client)
                    .then(() => this.next());
            }
        } else {                                        // Edit of the previously created clientCapture
            if (this.appType === 'fitStand') {
                this.clientCapture.clientCaptureMetrics = this.clientCapture.clientCaptureMetrics.concat(clientCaptureMetrics);
                this.next();
            } else {
                // fitroom
                this.clientCapture.clientCaptureMetrics = clientCaptureMetrics;
                this.clientService.editClientCapture(this.clientCapture)
                    .then(() => this.next());
            }
        }
    }
    next(): void {
        document.body.style.cursor = 'wait';
        this.homeRoutingService.next(this.constructor.name);
    }


}
