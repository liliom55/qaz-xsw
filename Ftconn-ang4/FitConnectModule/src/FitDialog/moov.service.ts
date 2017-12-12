import { fitEnvironment } from '../environments/fitEnvironment';
import { Injectable, EventEmitter } from '@angular/core';
import { Headers, RequestOptionsArgs, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { StoreService } from './store.service';
import { ClientCapture, ClientCaptureMetric } from './../shared/client/client.model';
import { UnitConversionService } from './../shared/unit-conversion.service';

@Injectable()
export class MoovService extends StoreService {
    public static retailer: string = 'Moov';
    public static styles = {
        fitDialog: './FitDialog.moov.scss',
        input: './input.moov.scss'
    }
    public static htmls = {
        fitDialog: './FitDialog.moov.html',
        input: './input.moov.html'
    }
    public static dialogSize = {
        height: '100vh',
        width: '100vw'
    }
    public logo: string = './../assets/icons/moovlogo.png';
    public fit: string;
    protected retailer: string = 'moov';

    public steps = {
        welcome: { index: 0, title: 'MOOV.WELCOME.TITLE', content: '', borderColor: '#9D44B7', fontColor: '#CDDC39', btnsCaption: ['MOOV.WELCOME.BUTTON'], imgsUrl: null },
        profile: { index: 3, title: 'MOOV.PROFILE.TITLE', content: '', borderColor: '#0F1CF8', fontColor: '#0F1CF8', btnsCaption: ['MOOV.PROFILE.BUTTON'], imgsUrl: null },
        measurements: { index: 4, title: 'MOOV.MEASUREMENTS.TITLE', content: '', borderColor: '#CDDC39', fontColor: '#9D44B7', btnsCaption: ['MOOV.MEASUREMENTS.BUTTON1', 'MOOV.MEASUREMENTS.BUTTON2'], imgsUrl: null },
        loading: { index: 5, title: 'MOOV.LOADING.TITLE', content: '', borderColor: '#70F5D1', fontColor: '#9D44B7', btnsCaption: [], imgsUrl: null },
        yourFit: { index: 6, title: 'MOOV.YOUR-FIT.TITLE', content: 'MOOV.YOUR-FIT.RESULT', borderColor: '#70F5D1', fontColor: '#70F5D1', btnsCaption: ['MOOV.YOUR-FIT.BUTTON1', 'MOOV.YOUR-FIT.BUTTON2'], imgsUrl: null },
        measurementsHowTo: { index: 4, title: 'MOOV.MEASUREMENTS-HOW-TO.TITLE', content: ['MOOV.MEASUREMENTS-HOW-TO.BODY1', 'MOOV.MEASUREMENTS-HOW-TO.BODY2'], borderColor: '#CDDC39', fontColor: '', btnsCaption: ['MOOV.MEASUREMENTS-HOW-TO.BUTTON'], imgsUrl: ['./assets/icons/MoovActiveWear.jpg'] },
        fitDescription: { index: 7, title: 'MOOV.FIT-DESCRIPTION.TITLE', content: 'MOOV.FIT-DESCRIPTION.BODY', borderColor: '#F18630', fontColor: '#70F5D1', btnsCaption: ['MOOV.FIT-DESCRIPTION.BUTTON'], imgsUrl: null },
        login: { index: 1, title: 'MOOV.LOGIN.TITLE', content: '', borderColor: '#F18630', fontColor: '#70F5D1', btnsCaption: ['MOOV.LOGIN.BUTTON'], imgsUrl: null }
    };


    public showImageOnStep3 = false;


    public account = [
        {
            label: 'MOOV.LOGIN.FORM.EMAIL',
            name: 'Email',
            value: null
        }
    ]

    public profile = [
        {
            label: 'MOOV.PROFILE.FORM.INPUT1',
            name: fitEnvironment.SHAPE_KEY_NAMES.HEIGHT,
            value: null,
            imperialUnit: UnitConversionService.IMPUNITS.feet,
            metricUnit: UnitConversionService.METUNITS.centimeters,
            min: 147,
            max: 225
        },
        {
            label: 'MOOV.PROFILE.FORM.INPUT2',
            name: fitEnvironment.SHAPE_KEY_NAMES.WEIGHT,
            value: null,
            imperialUnit: UnitConversionService.IMPUNITS.pounds,
            metricUnit: UnitConversionService.METUNITS.kilograms,
            min: 40,
            max: 300
        }
    ];
    public measurements = [
        {
            label: 'MOOV.MEASUREMENTS.FORM.INPUT1',
            name: fitEnvironment.SHAPE_KEY_NAMES.WAIST,
            value: null,
            imperialUnit: UnitConversionService.IMPUNITS.inch,
            metricUnit: UnitConversionService.METUNITS.centimeters,
            min: 22,
            max: 152
        },
        {
            label: 'MOOV.MEASUREMENTS.FORM.INPUT2',
            name: fitEnvironment.SHAPE_KEY_NAMES.HIP,
            value: null,
            imperialUnit: UnitConversionService.IMPUNITS.inch,
            metricUnit: UnitConversionService.METUNITS.centimeters,
            min: 34,
            max: 168
        }
    ];

    activeColor(selectedTab) {
        for (var key in this.steps) {
            if (this.steps.hasOwnProperty(key)) {
                if (this.steps[key].index == selectedTab)
                    return this.steps[key].borderColor;
            }
        }
        return '#9D44B7';
    }

    submitMeasurements(profileSpecs: any): Promise<any> {
        let dataCaptures = profileSpecs.profile.concat(profileSpecs.measurements);

        let client_capture_metrics = [];
        dataCaptures.forEach((measurement) => {
            client_capture_metrics.push(new ClientCaptureMetric(
                measurement.name,
                parseInt(measurement.value)
            ))
        });
        let clientCaptureToSend = new ClientCapture(null, this.client.id, client_capture_metrics);

        return this.clientService.addClientCapture(clientCaptureToSend, this.client).then((clientCapture) => {
            return this.match(clientCapture.id, 'Leggings')
        }).then((result) => {
            console.log(JSON.stringify(result.products[0].product_versions[0].product_version_txtmetadatas[0].value, null, 2));
            this.fit = result.products[0].product_versions[0].product_version_txtmetadatas[0].value;
            //this.emailService.sendEmail(this.retailer, fitEnvironment.app, this.client, []);
            return;
        });
    }

    private match(clientCapture, productType): Promise<any> {
        let url: string = this.apiUrl + '/products/match.json';
        let data = {
            capture_id: clientCapture,
            garment_type: productType
        };
        let options: RequestOptionsArgs = new RequestOptions({ headers: this.headers });
        return this.http.post(url, data, options)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleErrorObservable);
    }

}
