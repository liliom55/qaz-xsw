import { Component, Input, OnInit } from '@angular/core';

import { Client, ClientCapture, ClientCaptureMetric } from '../../shared/clients/client.model';
import { ClientService } from '../../shared/clients/client.service';
import { Product } from '../../shared/products/product.model';
import { ProductService } from '../../shared/products/product.service';
import { HomeRoutingService } from '../home-routing/home-routing.service';




@Component({
    selector: 'measurement-history',
    templateUrl: './measurement-history.component.html',
    styleUrls: ['../home.component.css'],
})

export class MeasurementHistoryComponent implements OnInit {
    constructor(
        private clientService: ClientService,
        private productService: ProductService,
        private homeRoutingService: HomeRoutingService
    ) { }

    @Input() client: Client;
    @Input() products: Product[] = [];
    show: boolean;

    ngOnInit() {
        this.addCapture();
    }

    routeDecision(choice: string): void {
        this.homeRoutingService.next(this.constructor.name, { previousMeasurementChoice: choice });
    }

    //Creates new capture from old measurement
    addCapture() {
        // console.log(this.client);
        if (this.client.clientMetrics) {
            let metrics: ClientCaptureMetric[] = [];
            for (let metric in this.client.clientMetrics) {
                metrics.push((new ClientCaptureMetric(metric, this.client.clientMetrics[metric])));
            }
            let clientCapture = ClientCapture.prototype;
            clientCapture.clientCaptureMetrics = metrics;
            clientCapture.clientId = this.client.id;
            this.clientService.addClientCapture(clientCapture, this.client)
                .then(capture => {
                    //TODO handle error
                    if (this.client.clientCaptures) {
                        this.client.clientCaptures.push(capture);
                    } else {
                        this.client.clientCaptures = [capture];
                    }
                    this.match(capture.id);
                });
        } else {
            this.routeDecision('new');
        }
    }

    //Tries to make a match; redirect directly to new measurement form if not possible
    match(captureId: string): void {
        this.productService.match(captureId)
            .then(products => {
                this.products = products;
                if (!products || products.length == 0) {
                    this.routeDecision('new');
                    this.show = true;
                }
            })
    }
}

  /*
      //next step after client selected the measurement status new or old 
    nextStep_newSize() {
        $('#content_login').hide("slide", { direction: "left" }, 100);
        $("#form_div").show("slide", { direction: "right" }, 300);
    }
    nextStep_oldSize() {
        $("#content_login").fadeOut("fast");
        this.clientCaptureService.find_measurement(this.email);
        this.clientCaptureService.onFindingSizeDone = this.getMeasurements.bind(this);//
    }
    //getting old measurement from backend
    getMeasurements() {
        this.oldMeasurements = this.clientCaptureService.oldMeasurement;
        if (this.oldMeasurements != null) {
            this.bodyHeight = this.oldMeasurements['height'];// acccess to field of a general object
            this.bodyWeight = this.oldMeasurements['weight'];
            this.chestSize = this.oldMeasurements['chest_size'];
            this.neckSize = this.oldMeasurements['neck_size'];
            this.bellySize = this.oldMeasurements['waist_size'];
            $("#NewOrOldSizes").fadeOut("slow", function () {
                $("#content_scan").fadeIn("fast");
            });
            this.isFirstTime_findingMatch = false;
            this.findMatchProduct();
        }
    }

    */

