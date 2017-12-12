import { Component, Input, OnInit } from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

import { AppConfig } from '../../config/app.config';

import { Client, ClientMetadata } from '../../shared/clients/client.model';
import { ClientService } from '../../shared/clients/client.service';

import { HomeRoutingService } from '../home-routing/home-routing.service';

import { MapUtils } from '../../shared/json-mapper/map-utils';
import { FormValidationService } from "../../shared/form-validation/form-validation.service";

@Component({
    selector: 'email-form',
    templateUrl: './email-form.component.html',
    styleUrls: ['./email-form.component.css', '../home.component.css'],
})

export class EmailFormComponent {
    @Input() client: Client;

    constructor(
        private clientService: ClientService,
        private config: AppConfig,
        private homeRoutingService: HomeRoutingService,
        private fv:FormValidationService
    ) { }

    ngOnInit() {
        this.fv.buildFormEmail();
    }
    next(anonymous: boolean): void {
        this.client.anonymous = anonymous === true ? 1 : 0;
        // If client is anonymous go directly to measurement form
        if (anonymous) {
            this.saveClient();
            this.homeRoutingService.next(this.constructor.name, { anonymous: true });
        }
        // Check if client exists in DB ; check if has password ;
        else {
            this.clientService.checkExist(this.client.email)
                .then(exists => 
                this.handleExist(exists)
                );
        }
    }
    saveClient(): void {
        let gender = new ClientMetadata('gender', this.config.getConfig('gender'));
        (this.client.clientMetadatas = this.client.clientMetadatas ? this.client.clientMetadatas : []).push(gender);
        if (this.client.anonymous === 1)
            this.client.email = null;
        //TODO implement validation / error handling
        else if (this.client.email === null) { return; }
        this.clientService.addClient(this.client)
            .then(client => this.client = client);
    }

    //If client doesn't exist then save; else route depending if password exists or not
    handleExist(res: Object) {
        if (!res['client']) {
            this.saveClient();
            let app = this.config.getConfig('app');
            this.homeRoutingService.next(this.constructor.name, { anonymous: false, exists: false });
        } else {
            res['hasPassword'] ?
                this.homeRoutingService.next(this.constructor.name, { anonymous: false, exists: true, hasPassword: true }) :
                this.homeRoutingService.next(this.constructor.name, { anonymous: false, exists: true, hasPassword: false });
        }
    }
}

    /*
        // Form Login
        // Button Suivant event

        var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i; //custom email validation by regular expression
        $(this.suivant.nativeElement).on('click', (e, args) => {
            if ($("#form_login").valid()) {
                if (testEmail.test(this.email)) {//custom email validation bt regular expression
                        this.validMsg = "";
                        //checking for error connection to server
                        this.clientCaptureService.onErrorReceived = this.theCallBackError.bind(this);
                        sessionStorage.setItem("email", this.email);
                        //this.clientId = sessionStorage.getItem("clientId");
                        this.isFirstTime_findingMatch = true;
                        this.checkClientEmailExist();
                } else {
                    this.validMsg = "Adresse Courriel incorrecte";
                }
                setTimeout(() => this.firstViewIsVisible = false, 1000);
            }
        });
        // Button Incognito event
        $(this.incognito.nativeElement).on('click', (e, args) => {
            //checking for error connection to server
            this.clientCaptureService.onErrorReceived = this.theCallBackError.bind(this);
            this.isFirstTime_findingMatch = false;
            this.clientCaptureService.register_client("","","","", 1); // call function of backend
            this.clientCaptureService.onReceivedClientID = this.theCallBackGetClientId.bind(this);
            setTimeout(() => this.firstViewIsVisible = false, 1000);
        });


    //after registering client this function get client id from client-capture-service
    private theCallBackGetClientId() {
        sessionStorage.setItem("email", this.email);
        this.clientId = this.clientCaptureService.clientId;
        $('#content_login').hide("slide", { direction: "left" }, 100);
        $("#form_div").show("slide", { direction: "right" }, 300);
    }

//email form
        $("#form_login").validate({
            lang: this.selectedLang,
            rules: {
                email: {
                    required: true,
                    email: true
                },
                firstName: {
                    required: true,
                    minlength: 2
                },
                lastName: {
                    required: true,
                    minlength: 2
                }
            },
            errorElement: 'div',
            errorPlacement: function (error, element) {
                var placement = $(element).data('error');
                if (placement) {
                    $(placement).append(error)
                } else {
                    error.insertAfter(element);
                }
            }
        });
        //$.validator.addMethod("lettersonly", function (value, element) {
        //    return this.optional(element) || /^[a-z]+$/i.test(value);
        //}, this.errorMessage_input_caracter);
    */
