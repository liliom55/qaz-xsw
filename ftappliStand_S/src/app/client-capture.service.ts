import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
//import { ProductModel } from './productModel';
//import { CustomerModel, CustomerCapture } from './customerModel';
//import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';
declare var require: any;

@Injectable()
export class ClientCaptureService {
    public onMatchReceived: Function; // define a callback function
    public onErrorReceived: Function;
    public onGoodReceived: Function;
    public onCheckingEmailDone: Function;
    public onCheckingPasswordDone: Function;
    public onFindingSizeDone: Function;
    public onReceivedClientID: Function;
    public oldMeasurement: Object;
    public isRightPassword = false;
    private password = "";
    public clientId = "";
    private clientCaptureId = "";
    private captureId = "";
    public productsReceived: any;
    public machError = false;
    public serverError = false;
    public errMsg = "";
    private products;
    public listProducts = [];
    private listPrdVersionId = [];
    public email = "";
    public unit_prefer = "";
    private client_metadatasList = [];
    public clientExist = false;
    public passwordEmpty = false;
    private apiUrl = "https://fitadmin.ces.stefanka.tech/api/"; //"http://localhost:8080/api/";  //"https://fitadmin.ces.stefanka.tech/api/";
    private apiAuth = "Basic cGFuZHc6cGFuZHdhZG1pbg=="; //"Basic cGFuZHc6cGFuZHdhZG1pbg==";

    constructor(private http: Http, private router: Router) {
        this.getMessage();
    }
    //when the client press suivant after entering the email, this function check the email already exist in database or not
    checkOut_clientEmail(email) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.apiAuth });
        let options = new RequestOptions({ headers: headers });
        let jsonToSend = '{ "email": "' + email + '"}';
        let body = jsonToSend; //admin.dev.stefanka.tech   fitadmin.local
        return this.http.post(this.apiUrl + "clients/exists.json", body, options)
            .subscribe(
            (res: Response) => this.getRespone(res),
            (err) => this.catchError()  // catching exception
            );
    }
    private getRespone(res: Response) {
        let body = res.json();
        this.clientExist = body.client != null ? true : false;
        if (this.clientExist) {
            this.oldMeasurement = body.client.client_metrics;
            this.clientId = body.client.id;
            sessionStorage.setItem("clientId", this.clientId);
            this.client_metadatasList = body.client.client_metadatas;
            if (this.client_metadatasList.length > 0) {
                this.unit_prefer = this.find_unitOfMeasurement();
            } else {
                this.unit_prefer = "imperial";
            }
            //console.log(this.unit_prefer);
            this.passwordEmpty = !body.client.has_password;
        }

        this.onCheckingEmailDone();
        //return this.clientExist
    }
    //call back function for a function "checkClientEmailExist()"  in home component
    public setCheckEmailCallback(cb: Function) {
        this.onCheckingEmailDone = cb;
    }
    private find_unitOfMeasurement() {
        for (let meta of this.client_metadatasList) {
            if (meta.name == "preference_unit_system") { return meta.value; }
        }
        return null;
    }

    //checking out the password is right or not
    password_checkOut(email_, password_) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.apiAuth });
        let options = new RequestOptions({ headers: headers });
        let jsonToSend = {
            "email": email_,
            "password": password_
        };

        let body = JSON.stringify(jsonToSend);
        return this.http.post(this.apiUrl + "clients/password.json", body, options)
            .subscribe(
            (res: Response) => this.getRes(res),
            (err) => this.catchError()  // catching exception
            );

    }
    private getRes(res) {
        this.isRightPassword = res.json();
        this.onCheckingPasswordDone();
        //return res.json();
    }
    //call back function for a function "checkClientEmailExist()"  in home component
    public setCheckPasswordCallback(cb: Function) {
        this.onCheckingPasswordDone = cb;
    }

    // when the client press suivant (and the client did not register already) or Incognito button this function will be called
    //for register the client
    // returns clientId
    register_client(email,fName,lName,phone, anonymous) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.apiAuth });
        let options = new RequestOptions({ headers: headers });
        let body = "";
        let jsonToSend ;
        if ((email == "" || email == null) && anonymous == 1) {
            jsonToSend = {"anonymous": anonymous, "gender": "M"};

        } else {
            this.email = email;
            jsonToSend = {
                "email": email,
                "firstname": fName,
                "lastname": lName,
                "anonymous": anonymous
            };
        }
        body = JSON.stringify(jsonToSend);
        return this.http.post(this.apiUrl + "clients/add.json", body, options)
            .subscribe(
            (res: Response) => this.receivedClient(res),
            (err) => this.catchError()  // catching exception
            );
    }
    //call back function for a function "receivedClient()"  in home component
    public setReceivedClientCallback(cb: Function) {
        this.onReceivedClientID = cb;
    }
    // successful post
    private receivedClient(res: Response) {
        let body = res.json();

        this.clientId = body.client.id;
        sessionStorage.setItem("clientId", this.clientId + "");
        this.onReceivedClientID();
        //return body.data || {};
    }

    // in fitting room when the clients enter thair email
    update_client(clientId, email, anonymous) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.apiAuth });
        let options = new RequestOptions({ headers: headers });
        let jsonToSend = {
            "id": clientId,
            "email": email,
            "anonymous": anonymous
        };

        let body = JSON.stringify(jsonToSend);
        //console.log(body);
        return this.http.post(this.apiUrl + "clients/edit/" + clientId + ".json", body, options)
            .subscribe(
            (res: Response) => this.receivedResult3(res),
            (err) => this.catchError()  // catching exception
            );
    }
    update_client_unitSystem(clientId, unit) {
        //if (this.find_unitOfMeasurement() !== null) { //avoiding resave unit if there is preference_unit_system in backend
        //    return;
        //}
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.apiAuth });
        let options = new RequestOptions({ headers: headers });
        let jsonToSend = {
            "client_metadatas": [{ "name": "preference_unit_system", "value": unit }]
        }

        let body = JSON.stringify(jsonToSend);
        //console.log(body);
        return this.http.post(this.apiUrl + "clients/edit/" + clientId + ".json", body, options)
            .subscribe(
            (res: Response) => this.receivedResult2(res),
            (err) => this.catchError()  // catching exception
            );
    }
    // in home when the email's client is exist but password is empty for completing registration
    complete_registration(clientId, email, anonymous, password) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.apiAuth });
        let options = new RequestOptions({ headers: headers });
        let jsonToSend = {
            "id": clientId,
            "email": email,
            "anonymous": anonymous,
            "password": password
        };

        let body = JSON.stringify(jsonToSend);
        return this.http.post(this.apiUrl + "clients/edit/" + clientId + ".json", body, options)
            .subscribe(
            (res: Response) => this.receivedResult2(res),
            (err) => this.catchError()  // catching exception
            );
    }
    // finding the client and his measurement
    find_measurement(email) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.apiAuth });
        let options = new RequestOptions({ headers: headers });
        let jsonToSend = '{ "email": "' + email + '"}';
        let body = jsonToSend; //admin.dev.stefanka.tech   fitadmin.local
        return this.http.post(this.apiUrl + "clients/exists.json", body, options)
            .subscribe(
            (res: Response) => this.getClientInfo(res),
            (err) => this.catchError()  // catching exception
            );
    }
    private getClientInfo(res: Response) {
        let body = res.json();
        this.oldMeasurement = body.client.client_metrics;
        sessionStorage.setItem("clientId", body.client.id + "");
        this.onFindingSizeDone();
    }
    //call back function for a function "checkClientEmailExist()"  in home component
    public setFindingSizeCallback(cb: Function) {
        this.onFindingSizeDone = cb;
    }

    // when the client press suivant button of measurment form this function will be called
    //for register the client's measurment
    // returns captureId
    register_measurement(chestSize, bellySize, bodyHeight, bodyWeight, neckSize,bellyType,clientId) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.apiAuth });
        let options = new RequestOptions({ headers: headers });
        let capture = {
            "type": "Manual",
            "client_id": clientId,
            "client_capture_metrics": [
                {
                    "type": "chest_size",
                    "value": chestSize
                },
                {
                    "type": "waist_size",
                    "value": bellySize
                },
                {
                    "type": "height",
                    "value": bodyHeight
                },
                {
                    "type": "weight",
                    "value": bodyWeight
                },
                {
                    "type": "neck_size",
                    "value": neckSize
                },
                {
                    "type": "belly_type",
                    "value": bellyType
                }
            ]
        };

        let body = JSON.stringify(capture);
        //console.log(body);
        return this.http.post(this.apiUrl + "clientCaptures/add.json", body, options)
            .subscribe(
            (res: Response) => this.receivedCaptureID(res),
            (err) => this.catchError()  // catching exception
            );
    }
    // successful post
    private receivedCaptureID(res: Response) {
        let body = res.json();
        this.captureId = body.clientCapture.id;
        //console.log(this.captureId);
        sessionStorage.setItem("captureId", this.captureId);
        this.findMatchProduct(this.captureId); //1
        this.bindClientToCapture();//2

    }
    // for finding the products which are match to client's measurment
    private findMatchProduct(captureId) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.apiAuth });
        let options = new RequestOptions({ headers: headers });
        let jsonToSend = { "garment_type": "Shirt", "capture_id": captureId };
        //console.log("capture: " + this.captureId);
        let body = JSON.stringify(jsonToSend); //fitadmin.local
        return this.http.post(this.apiUrl + "products/match.json", body, options)
            .subscribe(
            (res: Response) => this.successRecieve(res),
            (err) => this.catchError_notMatch()  // catching exception
            );
    };
    //call back function for a function "findMatchProduct()"  in home component
    public setMatchCallback(cb: Function) {
        this.onMatchReceived = cb;
    }
    // successful post
    successRecieve(res: Response) {
        this.machError = false;
        this.productsReceived = res.json();
        this.products = this.productsReceived.products;
        this.listProducts = this.createProducts();
        for (var i = 0; i < this.listProducts.length; i++) {
            this.listPrdVersionId.push(this.listProducts[i].versionId);
        }
        //this.relation_suggested();
        this.onMatchReceived();  // like a pointer for calling another function when this line is executed


    }
    // bad post for no matching
    catchError_notMatch() {
        this.machError = true;
        this.products = [];
        this.onErrorReceived();
    }
    // bad post
    public setErrorCallback(cb: Function) {
        this.onErrorReceived = cb;
    }
    catchError() {
        this.serverError = true;
        this.products = [];
        this.onErrorReceived();

    }
    // create a relation between clientId and the suggested products
    //private relation_suggested() {
    //    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.apiAuth });
    //    let options = new RequestOptions({ headers: headers });
    //    let prev;
    //    var listVersionId = this.listPrdVersionId;
    //    let products = [];
    //    listVersionId.sort();
    //    for (var i = 0; i < listVersionId.length; i++) {
    //     if (listVersionId[i] !== prev) {
    //        products.push({ id: listVersionId[i], quantity: 1 });
    //     }
    //     prev = listVersionId[i];
    //    }
    //    let jsonToSend = {
    //        "client_id": sessionStorage.getItem("clientId"),
    //        "products": products,
    //        "relation_type": "SUGGESTED"
    //    };

    //    let body = JSON.stringify(jsonToSend);
    //    return this.http.post(this.apiUrl + "clientProductRelations/add.json", body, options)
    //        .subscribe(
    //        (res: Response) => this.receivedResult(res),
    //        (err) => this.catchError()  // catching exception
    //        );

    //}

    // sending an email of contents order and status to clients
    public sendEmail(selected_prd) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.apiAuth });
        let options = new RequestOptions({ headers: headers });
        let jsonToSend = {};
        if (selected_prd.length === 0) {
            jsonToSend = {
                "client_id": sessionStorage.getItem("clientId"),
                "template_name": "mccord",
		"data": {
			"fromApp": "fitStand",
			"fromRetailer": "simons"
		}
            };
        } else {
            let versionIdSelPrd = [];
            for (let i = 0; i < selected_prd.length; i++) {
                versionIdSelPrd.push(selected_prd[i].versionId);
            }
            //jsonToSend = {
            //    "client_id": sessionStorage.getItem("clientId"),
            //    "template_name": "sxsw",
            //    "data": { "products": { "product_versions": versionIdSelPrd } }
            //};
            jsonToSend = {
                "client_id": sessionStorage.getItem("clientId"),
                "template_name": "mccord",
                "data": {
                    "products": {
                        "product_versions": versionIdSelPrd
                    },
                    "fromApp": "fitStand",
                    "retailerApp": "simons"
                }
            };
        }

        let body = JSON.stringify(jsonToSend);
        return this.http.post(this.apiUrl + "clients/email.json", body, options)
            .subscribe(
            (res: Response) => this.receivedResult2(res),
            (err) => this.catchError2(err)  // catching exception
            );

    }
    catchError2(err) {
        console.log(err);
        this.machError = true;
        this.onErrorReceived();
    }
    receivedResult2(res: Response) {
        //let body = res.json();
        //this.onGoodReceived();
        //console.log(body);
        //return body.data || {};
    }
    receivedResult3(res: Response) {
        //let body = res.json();
        //console.log(" >> "+this.email);
        this.onGoodReceived();
    }
    public setGoodCallback(cb: Function) {
        this.onGoodReceived = cb;
    }
    // create a relation between clientId and the selected products
    public relation_Selected(listVersionId) {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.apiAuth });
        let options = new RequestOptions({ headers: headers });
        //Counting the occurrences array elements for filling the product in jsonToSend var
        let id = [];
        let quantity = [];
        let prev;
        listVersionId.sort();
        for (var i = 0; i < listVersionId.length; i++) {
            if (listVersionId[i] !== prev) {
                id.push(listVersionId[i]);
                quantity.push(1);
            } else {
                quantity[quantity.length - 1]++;
            }
            prev = listVersionId[i];
        }
        let products = [];
        for (var i = 0; i < id.length; i++) {
            products.push({ id: id[i], quantity: quantity[i] });
        }

        let jsonToSend = {
            "client_id": sessionStorage.getItem("clientId"),
            "products": products,
            "relation_type": "SELECTED"
        };


        let body = JSON.stringify(jsonToSend);

        return this.http.post(this.apiUrl + "clientProductRelations/add.json", body, options)
            .subscribe(
            (res: Response) => this.receivedResult(res),
            (err) => this.catchError()  // catching exception
            );

    }
    // successful post
    receivedResult(res: Response) {
        //let body = res.json();
        //console.log(body);
        //return body.data || {};
    }

    //getting the error message from a json file:
    private getMessage() {
        //this.http.get("../app/message.json").map((res: Response) => res.json()).subscribe(data => { this.errMsg = data.errorMessages.notMatch });
        let data = require("./message.json");
        this.errMsg = data.errorMessages.notMatch;
    }
    //for combining client and measurment
    private bindClientToCapture() {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.apiAuth });
        let options = new RequestOptions({ headers: headers });
        let jsonToSend = { "client_id": sessionStorage.getItem("clientId") };
        let body = JSON.stringify(jsonToSend);
        return this.http.post(this.apiUrl + "clientCaptures/edit/" + this.captureId + ".json", body, options)
            .subscribe(
            (res: Response) => this.bindComplete(res),
            (err) => this.catchError()  // catching exception
            );
    };
    // successful post
    private bindComplete(res: Response) {
        //let body = res.json();
    }


    //get VersionMetadata of the product object
    private getVersionMetadata(metadata_key, product_index, version_index) {
        try {
            for (let meta of this.products[product_index].product_versions[version_index].product_version_txtmetadatas) {
                if (meta.name == metadata_key)
                    return meta.value;
            }
            for (let meta of this.products[product_index].product_versions[version_index].product_version_floatmetadatas) {
                if (meta.name == metadata_key)
                    return meta.value;
            }
            for (let meta of this.products[product_index].product_versions[version_index].product_version_intmetadatas) {
                if (meta.name == metadata_key)
                    return meta.value;
            }

        } catch (err) {
            console.log(err);
        }
    }


    //creating product object and put it in array
    private prdName = "";
    private prdId = "";
    private prdBrand = "";
    private prdPrice = "";
    private prdPrice_string = this.prdPrice + '' + '$';
    private prdSku = 0;
    private prdColor = [];
    private prdPicS = "";
    private prdPicL = "";

    private prdFabric = "";
    private prdCut = "";
    private prdSize = "";
    private prdFeature = "";
    private prdSleeve = "";
    private colorsAvailable = [];
    private prdVersionId = "";
    //private prdModel: ProductModel;

    private createProducts() {
        var x = [];
        for (var i = 0; i < this.products.length; i++) {
            try {
                this.prdId = this.products[i].id;
                this.prdSku = this.products[i].sku;
                this.prdVersionId = this.products[i].product_versions[0].id;
                this.prdName = this.getVersionMetadata("_product_name", i, 0);
                this.prdPrice = this.getVersionMetadata("_product_price", i, 0) + '$';
                this.prdColor = JSON.parse(this.getVersionMetadata("_product_colors", i, 0));
                this.prdPicL = this.products[i].thumb_url;//this.prdColor[0].small_image;
                this.prdPicS = this.prdColor[0].large_image;
                this.prdBrand = "La Maison Simons";
                this.prdCut = this.getVersionMetadata("cut_style", i, 0);
                this.prdSize = this.getVersionMetadata("_shirt_size", i, 0);
                this.prdFabric = this.getVersionMetadata("fabric", i, 0);
                this.prdFeature = this.getVersionMetadata("feature", i, 0);
                this.prdSleeve = this.getVersionMetadata("sleeve_style", i, 0);
                if (this.getVersionMetadata("sleeve_style", i, 0) == "LONG") {
                    this.prdSleeve = "Longues";
                } else { this.prdSleeve = "Régulières" }
                x.push({ id: this.prdId, sku: this.prdSku, name: this.prdName, price: this.prdPrice, color: this.prdColor, large_picture: this.prdPicL, small_picture: this.prdPicS, brand: this.prdBrand, cut: this.prdCut, size: this.prdSize, fabric: this.prdFabric, feature: this.prdFeature, sleeve: this.prdSleeve, versionId: this.prdVersionId });
            } catch (err) {

                console.log(err);
            }

        }
        return x;
    }

}
