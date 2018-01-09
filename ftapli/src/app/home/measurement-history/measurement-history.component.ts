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
    // avoiding to double click
    isClickedOld: boolean;
    isClickedNew: boolean;
    ngOnInit() {
        this.isClickedNew = false;
        this.isClickedOld = false;
        this.addCapture();
    }

    routeDecision(choice: string): void {
        document.body.style.cursor = 'wait';
        this.homeRoutingService.next(this.constructor.name, { previousMeasurementChoice: choice });
        if (choice === 'new') {
            this.isClickedNew = true;
        } else if (choice === 'old') {
            this.isClickedOld = true;
        }
    }

    //Creates new capture from old measurement
    //Promise is only for test purpose
    addCapture(): Promise<any> {
        if (this.client.clientMetrics) {
            let metrics: ClientCaptureMetric[] = [];
            for (let metric in this.client.clientMetrics) {
                metrics.push((new ClientCaptureMetric(metric, this.client.clientMetrics[metric])));
            }
            let clientCapture = ClientCapture.prototype;
            clientCapture.clientCaptureMetrics = metrics;
            clientCapture.clientId = this.client.id;
            this.clientService.getClientCapture(this.client)
                .then(captureObject => { if (captureObject) { this.match(captureObject['client_capture_id']); } })
        } else {
            this.routeDecision('new');
        }
        // if (this.client.clientMetrics) {
        //     // console.log(this.client);
        // } else {
        //     this.routeDecision('new');
        // }
        return null;
    }

    //Tries to make a match; redirect directly to new measurement form if not possible
    //Promise is only for test purpose
    match(captureId: string): Promise<any> {
        this.productService.match(captureId)
            .then(products => {
                this.products = products;
                document.body.style.cursor = 'auto';
                if (!products || products.length == 0) {
                    this.routeDecision('new');
                    this.show = true;
                }
            })
        return null;
    }
}
