import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

import { environment } from '../../../environments/environment'
import { Client, ClientCapture, ClientCaptureMetric } from '../../shared/clients/client.model';
import { ProductService } from '../../shared/products/product.service';
import { ClientService } from '../../shared/clients/client.service';
import { MeasurementFormService } from './measurement-form.service';
import { HomeRoutingService } from '../home-routing/home-routing.service';

import { DynamicFormComponent } from '../../shared/dynamic-form/dynamic-form.component';
import { FormControlService } from '../../shared/dynamic-form/form-control.service';


@Component({
    selector: 'measurement-form',
    templateUrl: './measurement-form.component.html',
    styleUrls: ['../home.component.css'],
    providers: [MeasurementFormService, FormControlService, ClientService]
})

export class MeasurementFormComponent implements OnInit {

    @Input() client: Client;
    @Input() clientCapture: ClientCapture;
    dynamicForm: any;
    systemChoice: string;
    questions: any[];
    isClickedNext: boolean;

    measurementElem: any;
    form: FormGroup;
    hasHeight: boolean;

    constructor(
        private clientService: ClientService,
        private productService: ProductService,
        private measurementFormService: MeasurementFormService,
        private homeRoutingService: HomeRoutingService,
        private qcs: FormControlService
    ) {

    }
    ngOnInit() {
        document.body.style.cursor = 'auto';
        this.isClickedNext = false;
        //Load the system preference and measurement form from config file
        this.systemChoice = environment.defaultMeasurementSystem;
        this.dynamicForm = this.measurementFormService.loadQuestion();
        this.questions = this.dynamicForm[this.systemChoice];
        this.measurementElem = this.measurementFormService.measurementElements;
        this.cleanForm();
        this.form = this.qcs.toFormGroup(this.measurementElem);
        this.hasHeight = this.measurementElem.find(o => o.key === 'feet') ? true : false;
    }
    //Switch between metrics and imperial system
    toggleSystemChoice(): void {
        this.systemChoice = this.systemChoice == 'metric' ? 'imperial' : 'metric';
        this.questions = this.dynamicForm[this.systemChoice];
        // console.log(this.questions);
        this.measurementElem = this.measurementFormService.measurementElements;
        // console.log('measurementElem',this.measurementElem);
        this.cleanForm();
        this.form = this.qcs.toFormGroup(this.measurementElem);


    }

    //Create a clientCapture from measurement form; then tries to make a match
    // promise is only for test purpose
    updateClientCapture(): Promise<any> {
        let metrics: ClientCaptureMetric[] = [];
        if (!this.form.valid) {
            return;
        }
        // copy the value of the form to question object
        Object.keys(this.form.value).forEach((key_form) => {
            this.questions.forEach((q) => {
                Object.keys(q).forEach((key_question) => {
                    if (key_form == q['key']) {
                        q['value'] = this.form.value[key_form];
                    }
                });
            });
        });
        // app that has feet and inch
        let feet;
        let inch;
        let height;
        this.questions.forEach((q) => {
            if (q.key === 'feet') {
                feet = q.value;
            }
            if (q.key === 'inch') {
                inch = q.value;
                q.key = 'height';
                q.label = 'Height';
                height = parseInt(feet) * 12 + parseInt(inch);
                q.value = height + "";
            }
        });
        this.questions = this.questions.filter((elem) => {
            return elem.key !== 'feet';
        });
        this.questions.map((value) => {

            if (this.systemChoice == 'imperial') { //Convert value to metric system
                value.value = this.measurementFormService.convertUnit(value.value, 'metric', value.unit)
            }
            metrics.push(new ClientCaptureMetric(value.key, value.value));
        });
        this.clientService.editClient(this.client.id, { // Add a preference unit system (metric or imperial) to the client preference
            client_metadatas: [{
                client_id: this.client.id, name: 'preference_unit_system', value: this.systemChoice
            }]
        });
        if (!this.clientCapture.clientCaptureMetrics) { // First input of metrics in clientCapture
            this.clientCapture.clientCaptureMetrics = metrics;
            this.clientService.addClientCapture(this.clientCapture, this.client)
                .then(capture => this.match(capture.id));
        } else {                                        // Edit of the previously created clientCapture
            this.clientCapture.clientCaptureMetrics = this.clientCapture.clientCaptureMetrics.concat(metrics);
            // this.clientService.editClientCapture(this.clientCapture)
            //     .then(capture => this.match(capture.id));
            // **************************************************************????????
            this.clientService.addClientCapture(this.clientCapture, this.client)
                .then(capture => this.match(capture.id));
        }
        this.isClickedNext = true;
        return null;
    }
    // rearrenge form elements
    cleanForm() {
        if (this.systemChoice === 'imperial') {
            // delete this.form.value['height'];
            this.measurementElem = this.measurementElem.filter((elem) => {
                return elem.key !== 'height';
            });

        } else {
            this.measurementElem = this.measurementElem.filter((elem) => {
                return elem.key !== 'feet';
            });
            this.measurementElem = this.measurementElem.filter((elem) => {
                return elem.key !== 'inch';
            });
        }
    }
    // promise is only for test purpose
    match(captureId: string): Promise<any> {
        this.productService.match(captureId);
        this.next();
        return null;
    }

    next() {
        document.body.style.cursor = 'wait';
        this.homeRoutingService.next(this.constructor.name);
    }
}
