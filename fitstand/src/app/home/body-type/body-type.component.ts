import { Component, Input, Output, EventEmitter,OnInit } from '@angular/core';

import { AppConfig } from '../../config/app.config';

import { Client, ClientCaptureMetric, ClientCapture } from '../../shared/clients/client.model';
import { ClientService } from '../../shared/clients/client.service';
import { HomeRoutingService } from '../home-routing/home-routing.service';

@Component({
    selector: 'body-type',
    templateUrl: './body-type.component.html',
    styleUrls: ['../home.component.css', 'body-type.component.css'],
})

export class BodyTypeComponent implements OnInit {
    @Input() client: Client;
    @Input() clientCapture: ClientCapture;
    @Output() switchView = new EventEmitter<string>();
    private gender: string = this.getGender();

    private imageSource: string = `../../assets/images/bodyTypes/${this.gender}/`;

    private clientBodyTypes: ClientCaptureMetric[] = [];
    private bodyTypes: Object = {
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
                        { id: 0, title: "Thin or muscular shape."},
                        { id: 1, title: "Average size / I don't know." },
                        { id: 2, title: "Stout build with slighty bumped stomach." }
                    ]
                }
            ]
        };
    private currentIndex: number;
    private selectedType: Object;

    constructor(
        private clientService: ClientService,
        private config: AppConfig,
        private homeRoutingService: HomeRoutingService
    ) {}

    ngOnInit() {
        this.currentIndex = 0;
        this.selectedType = { id: null, title: null}
    }
    
    private getGender(): string {
        return this.config.getConfig('gender');
    }

    selectType(bodyTypeItem: Object) {
        this.selectedType = bodyTypeItem;
    }

    gatherBodyType(type: string, value: number) {
        this.currentIndex += 1;
        this.clientBodyTypes.push(new ClientCaptureMetric(type, value));
        if(this.currentIndex == this.bodyTypes[this.gender].length) { // No more measurement to collect
            this.submitBodyType(this.clientBodyTypes);
        } else { //Go to next measurement type
        this.selectedType = { id: null, title: null}
        }
    }

     //Create a clientCapture from measurement form; then tries to make a match
    submitBodyType(clientCaptureMetrics: ClientCaptureMetric[]): void {
        if(!this.clientCapture.clientCaptureMetrics) { // First input of metrics in clientCapture
            this.clientCapture.clientCaptureMetrics = clientCaptureMetrics;
            this.clientService.addClientCapture(this.clientCapture, this.client)
            .then(() => this.next());
        } else {                                        // Edit of the previously created clientCapture
            this.clientCapture.clientCaptureMetrics = this.clientCapture.clientCaptureMetrics.concat(clientCaptureMetrics);
            this.clientService.editClientCapture(this.clientCapture)
            .then(() => this.next());
        }
    }

      next(): void {
        this.homeRoutingService.next(this.constructor.name);
    }


}