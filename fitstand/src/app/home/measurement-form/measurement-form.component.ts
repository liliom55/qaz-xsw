import { Component, Input }         from '@angular/core';
import { FormGroup }                from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { AppConfig } from '../../config/app.config';
import { Client, ClientCapture, 
        ClientCaptureMetric }       from '../../shared/clients/client.model';
import { ProductService }           from '../../shared/products/product.service';
import { ClientService }            from '../../shared/clients/client.service';
import { MeasurementFormService }   from './measurement-form.service';
import { HomeRoutingService } from '../home-routing/home-routing.service';

import { DynamicFormComponent }     from '../../shared/dynamic-form/dynamic-form.component';


@Component({
    selector: 'measurement-form',
    templateUrl: './measurement-form.component.html',
    styleUrls: ['../home.component.css'],
    providers: [MeasurementFormService]
})

export class MeasurementFormComponent {

    @Input() client: Client;
    @Input() clientCapture: ClientCapture;
    dynamicForm: any;
    systemChoice: string;
    questions: any[];

    constructor(
        private clientService: ClientService,
        private productService: ProductService,
        private measurementFormService: MeasurementFormService,
        private config: AppConfig,
        private homeRoutingService: HomeRoutingService
    ) {
        //Load the system preference and measurement form from config file
        this.systemChoice = this.config.getConfig('defaultMeasurementSystem');
        this.dynamicForm = this.measurementFormService.loadQuestion();
        this.questions = this.dynamicForm[this.systemChoice];
    }

    //Switch between metrics and imperial system
    toggleSystemChoice(): void {
        this.systemChoice = this.systemChoice == 'metric' ? 'imperial' : 'metric';
        this.questions = this.dynamicForm[this.systemChoice];
    }

    //Create a clientCapture from measurement form; then tries to make a match
    updateClientCapture(): void {
        let metrics : ClientCaptureMetric[] = [];
        this.questions.map( (value) => {
            if(this.systemChoice == 'imperial') { //Convert value to metric system
                value.value = this.measurementFormService.convertUnit(value.value, 'metric', value.unit )
            }
            metrics.push( new ClientCaptureMetric(value.key, value.value) ); 
        });

        this.clientService.editClient(this.client.id, { // Add a preference unit system (metric or imperial) to the client preference
            client_metadatas: [{ 
                client_id: this.client.id, name: 'preference_unit_system', value: this.systemChoice 
            }]
        });
        if(!this.clientCapture.clientCaptureMetrics) { // First input of metrics in clientCapture
            this.clientCapture.clientCaptureMetrics = metrics;
            this.clientService.addClientCapture(this.clientCapture, this.client)
            .then(capture => this.match(capture.id));
        } else {                                        // Edit of the previously created clientCapture
            this.clientCapture.clientCaptureMetrics = this.clientCapture.clientCaptureMetrics.concat(metrics);
            this.clientService.editClientCapture(this.clientCapture)
            .then(capture => this.match(capture.id));
        }

    }

    match(captureId: string): void {
        this.productService.match(captureId);
        this.next();
    }

    next() {
        this.homeRoutingService.next(this.constructor.name);
    }
}