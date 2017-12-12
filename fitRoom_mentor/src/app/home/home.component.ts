import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientCaptureService } from '../client-capture.service';
import { AddToCartService } from '../add-to-cart.service';
import { SendMessageServerService } from '../send-message-server.service';

//import { CustomerModel, CustomerCapture } from '../customerModel';
import { Observable } from 'rxjs/Observable';
import { BrowserDomAdapter } from '@angular/platform-browser/src/browser/browser_adapter';
import { TranslateService } from 'ng2-translate';

declare var require: any;
declare var $: any; // for jquery
declare var sessionStorage: any;
declare var alert: any;
declare var window: any;
//declare var location: any;
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
    //public callBackFunction: Function;
    //UI part:
    @ViewChild('suivant') suivant: ElementRef;
    @ViewChild('incognito') incognito: ElementRef;
    @ViewChild('suivant2') suivant2: ElementRef;
    @ViewChild('suivant3') suivant3: ElementRef;
    @ViewChild('carousel_item') carousel_item: ElementRef;

    //@ViewChild('navigate_before') navigate_before: ElementRef;
    //@ViewChild('navigate_next') navigate_next: ElementRef;
    //@ViewChild('imgContainer1') imgContainer1: ElementRef;


    @ViewChild('form_input') form_input: ElementRef;


    @ViewChild('nextCatalog') nextCatalog_: ElementRef;



    isSelect_formal = false;
    isSelect_casual = false;
    isSelect_sport = false;
    isSelect_all = false;

    //Backend part:
    errorMessage: string;

    // Client's information
    private clientId = "";
    private email = "";
    private fName = "";
    private lName = "";
    private bust = 0;
    private thorax = 0;
    private breastType = -1;
    private password = "";
    private measurementStatus = "";
    private oldMeasurements: Object;
    private scannerMeasurmentJson;
    private matchNo;
    private products = [];
    private captureId = "";

    private isError = false; //error handeling
    private isError_match = false;
    private isNoMatch = false;
    private msgErr: Object;  // json error message
    private permit = false;
    private validMsg = "";
    private icon_eye = "visibility";
    private isFirstTime_findingMatch = true;
    private hasOldSize = false;
    private wrongPass_msg = "";

    private firstViewIsVisible = true;

    //translation
    private selectedLang = "en";
    private supportedLangs = [];
    // connecting to server for scanning 
    private Message_rcvd = "connexion au scanner en cours";

    // breast Choice
    private brsChois = [
        { image1: "../../images/breastChoice/1massifs.png", image2: "../../images/breastChoice/1massifsP.png", title: "Massifs", description: "SEINS VOLUMINEUX, RONDS ET REMPLIS, DÉPASSANT LA LARGEUR DES ÉPAULES, TOMBANT EN RAISON DE LEUR POIDS." },
        { image1: "../../images/breastChoice/2petits.png", image2: "../../images/breastChoice/2petitsP.png", title: "Petits", description: "POITRINE MENUE, PEU DE VOLUME, HAUT SUR LE TORSE ET À L'INTÉRIEUR DE LA LARGEUR DES ÉPAULES." },
        { image1: "../../images/breastChoice/3ronds.png", image2: "../../images/breastChoice/3rondsP.png", title: "Ronds", description: "Seins uniformément ronds et fermes, peuvent-être collés ou avoir un petit espace." },
        { image1: "../../images/breastChoice/4venus.png", image2: "../../images/breastChoice/4venusP.png", title: "Vénus", description: "SEINS LÉGÈREMENT CONIQUES CAR LE MAMELON REMONTE. PETIT VOLUME DANS LA PARTIE INFÉRIEURE." },
        { image1: "../../images/breastChoice/5affaisses.png", image2: "../../images/breastChoice/5affaissesP.png", title: "Affaissés", description: "POITRINE AFFAISSÉE, SANS VOLUME, ESPACÉ AU CENTRE, LE MAMELON POINTANT VERS LE BAS." },
        { image1: "../../images/breastChoice/6communs.png", image2: "../../images/breastChoice/6communsP.png", title: "Communs", description: "LE PLUS COMMUN : SEINS LARGES, DÉPASSANT UN PEU LA LARGEUR DES ÉPAULES, PETIT ESPACE ENTRE LES SEINS, PLUS DE VOLUME DANS LA PARTIE INFÉRIEURE." }
    ];
    private selectNext = 0;
    constructor(private router: Router, private clientCaptureService: ClientCaptureService,
        private translate: TranslateService, private addTocartService: AddToCartService,
        private domAdapter: BrowserDomAdapter, private sendMsgService: SendMessageServerService) {
        sessionStorage.clear();
        this.addTocartService.orderNumber = 0;
        this.addTocartService.listCartProduct = [];
        this.clientCaptureService.clientExist = false;
        this.clientCaptureService.isRightPassword = false;
        this.clientCaptureService.passwordEmpty = true;
        this.clientCaptureService.onErrorReceived = this.theCallBackError.bind(this);
        //Language setting
        this.supportedLangs = [
            { display: 'En', value: 'en' },
            { display: 'Fr', value: 'fr' }
        ];
        translate.addLangs(["en", "fr"]);
        translate.setDefaultLang('en');
        translate.use(this.selectedLang);
        this.firstViewIsVisible = true;

    }
    //input events in formMeasure & form email & form password:
    onInput(type, val) {
        if (val == "") $(".errorTxt00").text("");
        switch (type) {
            case "bust":
                this.bust = val;
                break;
            case "thorax":
                this.thorax = val;
                break;
            case "email":
                this.email = val;
                this.validMsg = "";
                break;
            case "password":
                this.password = val;
                this.wrongPass_msg = "";
                break;
            case "f_name":
                this.fName = val;
                break;
            case "l_name":
                this.lName = val;
                break;
        }
    }

    ngOnInit() {
        sessionStorage.clear();
        this.addTocartService.orderNumber = 0;
        this.addTocartService.listCartProduct = [];
        this.clientCaptureService.clientExist = false;
        this.clientCaptureService.isRightPassword = false;
        this.clientCaptureService.passwordEmpty = true;
        this.clientCaptureService.onErrorReceived = this.theCallBackError.bind(this); //catching error if there is
        //Language setting
        this.supportedLangs = [
            { display: 'En', value: 'en' },
            { display: 'Fr', value: 'fr' }
        ];
        this.translate.addLangs(["en", "fr"]);
        this.translate.setDefaultLang('en');
        this.translate.use(this.selectedLang);
        this.firstViewIsVisible = true;

    }
    //language functions
    isCurrentLang(lang: string) {
        return lang === this.selectedLang;
    }

    selectLang(lang: string) {
        this.selectedLang = lang;
        sessionStorage.setItem("langSelected", this.selectedLang);
        this.translate.use(lang);
        this.setFormMessageValidating();
        if (this.selectedLang == 'en') { $("#txt_p6").attr("x", "15"); }
        if (this.selectedLang == 'fr') { $("#txt_p6").attr("x", "0"); }
    }
    // all the messages for invalid inputs in 2 languages
    setFormMessageValidating() {
        if (this.selectedLang == 'en') {
            $.extend($.validator.messages, {
                required: "This field is required.",
                remote: "Please fix this field.",
                email: "Please enter a valid email address.",
                url: "Please enter a valid URL.",
                date: "Please enter a valid date.",
                dateISO: "Please enter a valid date (ISO).",
                number: "Please enter a valid number.",
                digits: "Please enter only digits.",
                creditcard: "Please enter a valid credit card number.",
                equalTo: "Please enter the same value again.",
                accept: "Please enter a value with a valid extension.",
                maxlength: $.validator.format("Please enter no more than {0} characters."),
                minlength: $.validator.format("Please enter at least {0} characters."),
                rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
                range: $.validator.format("Please enter a value between {0} and {1}."),
                max: $.validator.format("Please enter a value less than or equal to {0}."),
                min: $.validator.format("Please enter a value greater than or equal to {0}.")
            });

        }
        if (this.selectedLang == 'fr') {
            $.extend($.validator.messages, {
                required: "Ce champ est requis.",
                remote: "Please fix this field.",
                email: "Veuillez entrer une adresse courriel valide.",
                url: "Please enter a valid URL.",
                date: "Please enter a valid date.",
                dateISO: "Please enter a valid date (ISO).",
                number: "Veuillez entrer une chiffre valide.",
                digits: "Please enter only digits.",
                creditcard: "Please enter a valid credit card number.",
                equalTo: "Please enter the same value again.",
                accept: "Please enter a value with a valid extension.",
                maxlength: $.validator.format("Please enter no more than {0} characters."),
                minlength: $.validator.format("Veuillez saisir au moins {0} caractères."),
                rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
                range: $.validator.format("Please enter a value between {0} and {1}."),
                max: $.validator.format("Veuillez entrer une valeur plus petite que ou &eacute;gale &agrave; {0}."),
                min: $.validator.format("Veuillez entrer une valeur plus grande que ou &eacute;gale &agrave; {0}.")
            });

        }

    }

    //---------------------------------

    findMatchProduct() {
        if (this.isFirstTime_findingMatch) {
            this.clientCaptureService.register_measurement(this.bust, this.thorax, this.clientId);
            this.clientCaptureService.onReceivedCaptureID = this.theCallBackGetCaptureId.bind(this);
        } else {
            if (this.hasOldSize) {
                this.hasOldSize = false;
                this.clientCaptureService.register_measurement(this.bust, this.thorax, this.clientId);
                this.clientCaptureService.onReceivedCaptureID = this.theCallBackGetCaptureId.bind(this);
            } else {
                this.clientCaptureService.findMatchProduct(this.captureId);
            }

        }

        // call back function for calling "theCallBack()" after "register_measurement" is compeletly done
        this.clientCaptureService.onErrorReceived = this.theCallBackError_match.bind(this);
        this.clientCaptureService.onMatchReceived = this.theCallBackMatch.bind(this);
    }
    //getting captureId from service
    theCallBackGetCaptureId() {
        this.captureId = this.clientCaptureService.captureId;
    }
    //in any error handling case fron clientCaptureService
    theCallBackError() {
        this.isError = this.clientCaptureService.serverError;
        this.errorMessage = this.clientCaptureService.errMsg;
        this.isNoMatch = true;
        //this.result_fn();
    }
    //in match error handling case from clientCaptureService
    theCallBackError_match() {
        this.errorMessage = this.clientCaptureService.errMsg;
        this.isNoMatch = true;
        this.isError_match = true;
        if (this.isFirstTime_findingMatch) {
            this.isFirstTime_findingMatch = false;
            this.result_first_match();
        }
        else {
            this.result_fn();
        }
    }
    //in sucessfull match 
    theCallBackMatch() {
        this.products = this.clientCaptureService.listProducts;
        this.matchNo = this.products.length;
        this.isNoMatch = this.matchNo <= 0 ? true : false;
        if (this.isNoMatch) {
            this.theCallBackError_match();

        } else {
            this.errorMessage = this.clientCaptureService.errMsg;
            this.isError_match = false;
            if (this.isFirstTime_findingMatch) {
                this.isFirstTime_findingMatch = false;
                this.result_first_match();
            }
            else {
                this.clientCaptureService.register_breast(this.clientId, this.captureId, this.breastType);
                this.result_fn();
            }

        }
    }
    // showing the suggested products
    result_fn() {
        //when getting error from mesh file's server
        if (this.captureId === '') {
            $("#content_loader").fadeOut("slow", function () {
                $("#bust_results").css("display", "none");
                $("#content_prefilter").fadeIn("2000");
            });

        } else {
            var langSel = this.selectedLang;
            $("#content_loader").fadeOut("fast", function () {
                $("#content_result").fadeIn("slow", function () {
                    $("#content_loader").css("display", "none");
                    $("#content_result").fadeOut("3000", function () {
                        if (langSel == 'en') { $("#txt_p6").attr("x", "15"); }
                        if (langSel == 'fr') { $("#txt_p6").attr("x", "0"); }
                        $("#bust_results").fadeIn("4000");
                    });
                });
            });
        }
    }
    result_first_match() {
        if (this.isNoMatch) {
            $('#content_login').fadeOut("slow", function () {
                $("#content_breastChs").fadeIn("fast");
                // breast choise view 
                $('.carousel').carousel();
                var first_time = true;
                autoplay();
                function autoplay() {
                    if (first_time) {
                        $('.carousel').carousel('next');
                        first_time = false;
                        setTimeout(autoplay, 500);

                    }
                }
            });
        } else {
            this.oldMeasurements = this.clientCaptureService.oldMeasurement;
            $('#preLoader_').fadeOut("slow", function () {
                $("#NewOrOldSizes").show("slide", { direction: "right" }, 500);
            });
        }
    }
    // when we get the result error, to back to measurement form
    reloadPage() {
        //location.reload();
        this.isNoMatch = false;
        
        $("#connecting_view ul").css({'display': 'none'});
        $("#content_prefilter").fadeOut("5000", function () {
            $("#scan_step1").fadeIn("2000");
        });
    }
    //select type of breast
    onchioseBrst(index) {
        this.breastType = index;
    }
    checkClientEmailExist() {
        this.clientCaptureService.checkOut_clientEmail(this.email);
        this.clientCaptureService.onCheckingEmailDone = this.doingTheRest.bind(this); // if checkOut_clientEmail() function in clientCaptureService is finished completly this line will execute
    }
    // after checkOut_clientEmail() function in clientCaptureService is finished completly the function below will be executed
    doingTheRest() {
        if (this.clientCaptureService.clientExist) {//if client's email exists
            this.clientId = this.clientCaptureService.clientId;
            this.oldMeasurements = this.clientCaptureService.oldMeasurement;
            if (this.clientCaptureService.passwordEmpty) { //if password's client is not registered yet
                $('#form_login').hide("slide", { direction: "left" }, 100);
                $("#form_registration").show("slide", { direction: "right" }, 300);
            } else { //if password is already registered

                $("#form_login").hide("slide", { direction: "left" }, { duration: 500, queue: false });
                $("#form_password").show("slide", { direction: "right" }, { duration: 500, queue: false });
            }
        } else {//if client's email does not exists register him/her and go to registration password

            this.clientCaptureService.register_client(this.email, this.fName, this.lName, 0); // call function of backend
            this.clientCaptureService.onReceivedClientID = this.theCallBackGetClientId2.bind(this);
        }
    }
    // call back function for new email
    theCallBackGetClientId2() {
        sessionStorage.setItem("email", this.email);
        this.clientId = this.clientCaptureService.clientId;
        //$('#form_login').hide("slide", { direction: "left" }, 100);
        //$("#form_registration").show("slide", { direction: "right" }, 300);
        $('#content_login').fadeOut("slow", function () {
            $("#content_breastChs").fadeIn("fast");
            // breast choise view 
            $('.carousel').carousel();
            var first_time = true;
            autoplay();
            function autoplay() {
                if (first_time) {
                    $('.carousel').carousel('next');
                    first_time = false;
                    setTimeout(autoplay, 500);

                }
            }
        });
    }
    //after entering the email for password form next button should check the password out that is exist or not
    check_passwrd() {
        if ($("#form_password").valid()) {
            // of the password is empty go to registration form
            if (this.clientCaptureService.passwordEmpty) {
                $('#form_password').fadeOut("slow");
                $("#form_registration").show("slide", { direction: "right" }, 300);
            } else {
                //checking for right password
                this.clientCaptureService.password_checkOut(this.email, this.password);
                this.clientCaptureService.onCheckingPasswordDone = this.theCallBackPassword.bind(this);
            }
        }
    }
    //call back of password checking
    theCallBackPassword() {
        // right password
        if (this.clientCaptureService.isRightPassword) {
            $('#form_password').fadeOut("slow");
            $('#preLoader_').fadeIn("slow");
            this.wrongPass_msg = "";
            //if client's password is not empty and there is old measurement go to new/old measurement form
            if (Object.keys(this.clientCaptureService.oldMeasurement).length > 0) { // check the length of an object
                if (this.clientCaptureService.oldMeasurement["breast_band_size"] !== undefined && this.clientCaptureService.oldMeasurement["breast_band_size"] !== "") { //check for measurement of bra
                    //check for match products according to previus measurement
                    this.bust = this.clientCaptureService.oldMeasurement["breast_band_size"];
                    this.thorax = this.clientCaptureService.oldMeasurement["under-breast_band_size"];
                    this.isFirstTime_findingMatch = true;
                    this.findMatchProduct(); // check is there any match product or not. If not go directly to measurement form
                } else {
                    this.oldMeasurements = null;
                    $('#content_login').fadeOut("slow", function () {
                        $("#content_breastChs").fadeIn("fast");
                        // breast choise view 
                        $('.carousel').carousel();
                        var first_time = true;
                        autoplay();
                        function autoplay() {
                            if (first_time) {
                                $('.carousel').carousel('next');
                                first_time = false;
                                setTimeout(autoplay, 500);

                            }
                        }
                    });
                }
            } else {
                //if client's password is not empty but there is no old measurement go to measurement form
                this.oldMeasurements = null;
                $('#content_login').fadeOut("slow", function () {
                    $("#content_breastChs").fadeIn("fast");
                    // breast choise view 
                    $('.carousel').carousel();
                    var first_time = true;
                    autoplay();
                    function autoplay() {
                        if (first_time) {
                            $('.carousel').carousel('next');
                            first_time = false;
                            setTimeout(autoplay, 500);

                        }
                    }
                });
            }
        }
        else  // wrong password
        {
            this.wrongPass_msg = "Mot de passe incorrect";
        }
    }
    //completing registration if password is empty
    register() {
        if ($("#form_register").valid()) {
            //this.email = sessionStorage.getItem("email");
            //this.clientId = sessionStorage.getItem("clientId");
            this.clientCaptureService.complete_registration(this.clientId, this.email, 0, this.password);

            //if old measurement of the client exist in database and the password is empty go to registration form
            if (this.oldMeasurements != null) {
                $('#form_registration').hide("slide", { direction: "left" }, 100);
                $("#NewOrOldSizes").show("slide", { direction: "right" }, 300);

            } else {//if there is no old measurement go to breast choise view
                $('#content_login').fadeOut("slow", function () {
                    $("#content_breastChs").fadeIn("fast");
                    // breast choise view 
                    $('.carousel').carousel();
                    var first_time = true;
                    autoplay();
                    function autoplay() {
                        if (first_time) {
                            $('.carousel').carousel('next');
                            first_time = false;
                            setTimeout(autoplay, 500);

                        }
                    }
                });
            }
        }
    }
    //next step after client selected the measurement status new or old 
    nextStep_newSize() {
        $('#content_login').fadeOut("slow", function () {
            $("#content_breastChs").fadeIn("fast");
            // breast choise view 
            $('.carousel').carousel();
            var first_time = true;
            autoplay();
            function autoplay() {
                if (first_time) {
                    $('.carousel').carousel('next');
                    first_time = false;
                    setTimeout(autoplay, 500);

                }
            }
        });
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
            this.bust = this.oldMeasurements["breast_band_size"]; // acccess to field of a general object
            this.thorax = this.oldMeasurements['under-breast_band_size'];
            this.hasOldSize = true;
            this.isFirstTime_findingMatch = false;
            this.findMatchProduct();
            $("#NewOrOldSizes").fadeOut("slow", function () {
                $("#content_loader").fadeIn("fast");
            });
        }
    }
    private switchEyes() {
        if (this.icon_eye == "visibility_off") {
            this.icon_eye = "visibility";
        } else {
            this.icon_eye = "visibility_off";
        }
    }
    goStep2() {
        $("#scan_step1").fadeOut("fast", function () {
            $("#scan_step2").fadeIn("fast");
        });
    }
    connectToServer() {
        this.Message_rcvd = "connexion au scanner en cours";
        $("#connecting_view ul").css('display','none');
        $("#scan_step2").fadeOut("fast", function () {
            $("#connecting_view").fadeIn("fast", function () {
                $("#connecting_view ul").fadeIn("7000");
            });
        });

        // start jumping bullets
        setTimeout(() => this.doJump(0), 1000);
        
        //Sending a message to RabbitMQ for informing scan is started
        setTimeout(() => this.sendMsgService.sendMessage(), 3000);
        setTimeout(() => this.getMessage_scanner(), 3010);
    }
    // jumping bullets when is connecting to scanner
    private doJump(index) {
        if (this.Message_rcvd === "connexion au scanner en cours") {
            $("#connecting_view ul li").eq(index).effect("bounce", { times: 2 }, "slow");
            if (index > 1) {
                index = 0
            } else {
                index++;
            }
            setTimeout(() => this.doJump(index), 1000);
        }
    }
    private getMessage_scanner() {
        this.sendMsgService.reciveMessageFromScaner();
        this.sendMsgService.onRecieveMsg_scaner = this.theCallBackRecieveMsg.bind(this);

    }


    private isOkToGetMessage = false;
    //gets captureId from server and goes for finding second match
    private theCallBackRecieveMsg() {
        if (this.sendMsgService.message_recieved === "SCAN_NOT_READY") {//If get the message from backend SCAN_NOT_READY, start connecting to server again
            this.Message_rcvd = "Il semble que vous n'êtes pas en position. Asseyez-vous en face du scanner et appuyer sur démarrer lorsque vous serez prête."
        } else {
            if (this.sendMsgService.message_recieved === "SCAN_STARTED") {//If get the message from backend SCAN_STARTED, do scan
                //start scanning 
                this.doScan();
            } else {

                if (this.sendMsgService.message_recieved.substring(0, 9) === "SCAN_STOP") {
                    $("#content_scan").fadeOut("5000", function () {
                        $("#content_loader").fadeIn("2000");
                    });
                    this.isOkToGetMessage = true;
                    setTimeout(() => this.getMessage_server(), 3000);
                }
            }

        }
    }
    doScan() {
        $("#connecting_view").fadeOut("fast", function () {
            $("#content_scan").fadeIn("fast");
            $('#loader_container').html('');

            // progressbar plugin
            var ProgressBar = require('../../js/progressbar.js');
            var bar = new ProgressBar.Circle('#loader_container', {
                color: '#aaa',
                // This has to be the same size as the maximum width to
                // prevent clipping
                strokeWidth: 4,
                trailWidth: 1,
                easing: 'easeInOut',
                duration: 30000,
                text: {
                    autoStyleContainer: false
                },
                from: { color: '#ff4081', width: 1 },
                to: { color: '#ff4081', width: 2 },
                // Set default step function for all animate calls
                step: function (state, circle) {
                    //console.log(circle);
                    circle.path.setAttribute('stroke', state.color);
                    circle.path.setAttribute('stroke-width', state.width);
                    var value = Math.round(circle.value() * 100);
                    if (value === 0) {
                        circle.setText('<label style ="position: absolute; top: -150px;color:black;font-size:24px;">0%</label>');
                    } else {
                        circle.setText('<label style ="position: absolute; top: -150px;color:black;font-size:24px;">' + value + ' %</label>');
                    }

                }
            });
            bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
            bar.text.style.fontSize = '2rem';
            bar.text.style.margin = '-2rem';
            bar.text.style.width = '300px';
            bar.text.style.textAlign = 'center';
            bar.animate(1.0);  // Number from 0.0 to 1.0
        });
        setTimeout(() => this.load_loader(), 30000);
    }
    private load_loader() {
        if (!this.isOkToGetMessage) {
            $("#content_scan").fadeOut("5000", function () {
                $("#content_loader").fadeIn("2000");
            });
            //setTimeout(() => this.getMessage_server(), 15000)
            setTimeout(() => this.refresh(), 50000);
        }
    }
    private refresh() {
        if (!this.isOkToGetMessage) {
            this.captureId = "";
            this.isFirstTime_findingMatch = false;
            this.findMatchProduct();
        }
    }
    private getMessage_server() {
        //after stop the scan this function get message from server
        //if (this.isOkToGetMessage) {

        this.sendMsgService.reciveMessageFromServer();
        this.sendMsgService.onRecieveMsg_server = this.theCallBackRecieveMsg_server.bind(this);
        //    this.isOkToGetMessage = false;
        //} else {
        //    this.captureId = "";
        //    //finding match products
        //    this.isFirstTime_findingMatch = false;
        //    this.findMatchProduct();
        //}

    }

    private theCallBackRecieveMsg_server() {

        //If get the json message from backend , find a match product
        if (this.sendMsgService.message_recieved.substring(0, 1) === "{") {
            let strToJson = $.parseJSON(this.sendMsgService.message_recieved);
            if (strToJson.status === "error") {
                this.captureId = "";
                this.isFirstTime_findingMatch = false;
                this.findMatchProduct();

            }
            if (strToJson.status === "ok") {
                $("#content_loader").fadeOut("slow");
                var message = strToJson.message;
                //console.log($("#svg_obj").contents());
                for (let param of message.client_capture_metrics) {
                    let type = param.type;
                    let value = param.value;
                    if (type !== "valid") {
                        let div_name = '#' + type + '-text-value tspan';
                        $(div_name).text(value.toFixed(2));
                    }
                }
                this.captureId = message.id;
                this.isFirstTime_findingMatch = false;
                this.findMatchProduct();
            }

        }
    }


    //after registering client this function get client id from client-capture-service
    private theCallBackGetClientId() {
        sessionStorage.setItem("email", this.email);
        this.clientId = this.clientCaptureService.clientId;
        $('#content_login').fadeOut("slow", function () {
            $("#content_breastChs").fadeIn("fast");
            // breast choise view 
            $('.carousel').carousel();
            var first_time = true;
            autoplay();
            function autoplay() {
                if (first_time) {
                    $('.carousel').carousel('next');
                    first_time = false;
                    setTimeout(autoplay, 500);

                }
            }
        });
    }
    private refreshPage() {
        window.location.reload();
    }
    private goToPrefilter() {
        $("#bust_results").fadeOut("5000", function () {
            $("#content_prefilter").fadeIn("2000");
        });
    }
    //UI JQUERY PART:
    ngAfterViewInit() {
        //loading runtime a svg file in a div
        $("#svgObj").svg({
            onLoad: function () {
                var svg = $("#svgObj").svg('get');
                svg.load('../../images/home/bust-results-new.svg', { addTo: true, changeSize: false });
            },
            settings: {width:800,height:500}
        });
        //calculating the x and y and width of contents according to window width
        function setPosition(div_name) {
            if (div_name != "#content_login" && div_name != "#form_div" &&
                div_name != "#form_registration" && div_name != "#NewOrOldSizes" &&
                div_name != "#connecting_view"
            ) {
                //alert($(window).width());
                var w = $(window).width() * (3 / 5);
                var h = $(window).height() * (3 / 5);
                $(div_name).css('width', w);
                if (div_name != "#content_breastChs") {
                    $(div_name).css('height', h);
                }
            }
            var x = ($(window).width() - $(div_name).width()) / 2;
            var y = ($(window).height() - $(div_name).height()) / 2;
            if (div_name === "#content_prefilter" || div_name === "#scan_step1" || div_name === "#scan_step2") {
                $(div_name).css('top', y - 50);
            } else {
                $(div_name).css('top', y);
            }

            $(div_name).css('left', x);
            $("#container_home").css({ "top": "0", "right": "0", "bottom": "0", "left": "0" })
            $("#footer").css('top', $(window).height() - 30);
            //if (div_name === "#content_scan") {
            //    alert(JSON.stringify($('#content_scan img').offset()));
            //    //$("#content_scan img").css('left', x + $("#loader_container path").width()/2 );
            //}
        }
        //rotation event from landscape to portrait or Vice versa
        $(window).on("orientationchange", function (event) {

            setPosition('#content_login');// #content_login div
            setPosition('#content_breastChs');
            setPosition('#content_scan');// #content_scan div
            setPosition('#content_result');// #content_result div
            setPosition('#content_prefilter');// #content_prefilter div
            setPosition('#scan_step1');
            setPosition('#scan_step2');
            setPosition('#content_loader');
            setPosition('#connecting_view');
            setPosition('#bust_results');

        });
        //re arrenging when the window is resizing
        $(window).resize(function () {
            setPosition('#content_login');// #content_login div
            setPosition('#content_breastChs');
            setPosition('#content_scan');// #content_scan div
            setPosition('#content_result');// #content_result div
            setPosition('#content_prefilter');// #content_prefilter div
            setPosition('#scan_step1');
            setPosition('#scan_step2');
            setPosition('#content_loader');
            setPosition('#connecting_view');
            setPosition('#bust_results');

        });
        //default setting
        setPosition('#content_login');// #content_login div
        setPosition('#content_breastChs');
        setPosition('#content_scan');// #content_scan div
        setPosition('#content_result');// #content_result div
        setPosition('#content_prefilter');// #content_prefilter div
        setPosition('#scan_step1');
        setPosition('#scan_step2');
        setPosition('#content_loader');
        setPosition('#connecting_view');
        setPosition('#bust_results');
        $('body').css({ 'background-color': 'white' });
        //-------------------------------------------------------------------------------------

        //SWITCH VIEW ACTION in first view
        $("#content_login").fadeIn('slow');

        //toggle password of registration form
        $.toggleShowPassword({
            field: '.password',
            control: '#test5'
        });

        // form validation link:http://demo.geekslabs.com/materialize/v3.1/form-validation.html

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
                    minlength: 2,

                },
                lastName: {
                    required: true,
                    minlength: 2,
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
        //}, "Incorrect");

        //password form
        $("#form_password").validate({
            lang: this.selectedLang,
            rules: {
                password: {
                    required: true
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
        //registration form
        $("#form_register").validate({
            lang: this.selectedLang,
            rules: {
                password: {
                    required: true,
                    minlength: 8
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


        //---------------------------------------------
        // Form Login
        // Button Suivant event
        var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i; //custom email validation by regular expression
        var testPhone = /^D*([2-9]\d{2})(\D*)([2-9]\d{2})(\D*)(\d{4})\D*$/i;//custom phone number validation by regular expression

        $(this.suivant.nativeElement).on('click touch', (e, args) => {
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
        $(this.incognito.nativeElement).on('click touch', (e, args) => {
            //checking for error connection to server
            this.clientCaptureService.onErrorReceived = this.theCallBackError.bind(this);
            this.isFirstTime_findingMatch = false;
            this.clientCaptureService.register_client("", "", "", 1); // call function of backend
            this.clientCaptureService.onReceivedClientID = this.theCallBackGetClientId.bind(this);
            setTimeout(() => this.firstViewIsVisible = false, 1000);

        });

        // breast choise view
        $(".btn_suivant").on('click touchstart', (e, args) => {
            // save the unit preference of client in each submit to the database
            //this.clientId = sessionStorage.getItem("clientId");
            //this.isFirstTime_findingMatch = false;   ---------------------
            //this.findMatchProduct();   -------------------------------------
            if (this.breastType !== -1) {
                this.isFirstTime_findingMatch = false;
                $("#content_breastChs").fadeOut("fast", function () {
                    $("#scan_step1").fadeIn("fast");
                });
            }

        });
    } // end of ngAfterViewInit()
    //SVG EVENTS
    //formal
    Portion9_click() {
        if (this.isSelect_formal) {
            $("#Portion_9_").css("fill", "white");
            $("#txt_p9").css("fill", "#ff4081");
            this.isSelect_formal = false
            //check for selecting all options
            if (!this.isSelect_formal && !this.isSelect_casual && !this.isSelect_sport) {
                $("#p6").css("fill", "#ff4081");
                $("#txt_p6").css("fill", "white");
                this.isSelect_all = true;
            } else {
                $("#p6").css("fill", "white");
                $("#txt_p6").css("fill", "#ff4081");
                this.isSelect_all = false;
            }
        } else {
            $("#Portion_9_").css("fill", "#ff4081");
            $("#txt_p9").css("fill", "white");
            this.isSelect_formal = true
            if (this.isSelect_formal && this.isSelect_casual && this.isSelect_sport) {
                $("#Portion_9_").css("fill", "white");
                $("#txt_p9").css("fill", "#ff4081");
                $("#Portion_8_").css("fill", "white");
                $("#txt_p8").css("fill", "#ff4081");
                $("#Portion_7_").css("fill", "white");
                $("#txt_p7").css("fill", "#ff4081");
                this.isSelect_casual = false;
                this.isSelect_sport = false;
                this.isSelect_formal = false;

                $("#p6").css("fill", "#ff4081");
                $("#txt_p6").css("fill", "white");
                this.isSelect_all = true;
            } else {
                $("#p6").css("fill", "white");
                $("#txt_p6").css("fill", "#ff4081");
                this.isSelect_all = false;
            }
        }
    }
    //casual
    Portion8_click() {
        if (this.isSelect_casual) {
            $("#Portion_8_").css("fill", "white");
            $("#txt_p8").css("fill", "#ff4081");
            this.isSelect_casual = false
            if (!this.isSelect_formal && !this.isSelect_casual && !this.isSelect_sport) {
                $("#p6").css("fill", "#ff4081");
                $("#txt_p6").css("fill", "white");
                this.isSelect_all = true;
            } else {
                $("#p6").css("fill", "white");
                $("#txt_p6").css("fill", "#ff4081");
                this.isSelect_all = false;
            }
        } else {
            $("#Portion_8_").css("fill", "#ff4081");
            $("#txt_p8").css("fill", "white");
            this.isSelect_casual = true
            if (this.isSelect_formal && this.isSelect_casual && this.isSelect_sport) {
                $("#Portion_9_").css("fill", "white");
                $("#txt_p9").css("fill", "#ff4081");
                $("#Portion_8_").css("fill", "white");
                $("#txt_p8").css("fill", "#ff4081");
                $("#Portion_7_").css("fill", "white");
                $("#txt_p7").css("fill", "#ff4081");
                this.isSelect_casual = false;
                this.isSelect_sport = false;
                this.isSelect_formal = false;

                $("#p6").css("fill", "#ff4081");
                $("#txt_p6").css("fill", "white");
                this.isSelect_all = true;
            } else {
                $("#p6").css("fill", "white");
                $("#txt_p6").css("fill", "#ff4081");
                this.isSelect_all = false;
            }
        }
    }
    //sport
    Portion7_click() {
        if (this.isSelect_sport) {
            $("#Portion_7_").css("fill", "white");
            $("#txt_p7").css("fill", "#ff4081");
            this.isSelect_sport = false
            if (!this.isSelect_formal && !this.isSelect_casual && !this.isSelect_sport) {
                $("#p6").css("fill", "#ff4081");
                $("#txt_p6").css("fill", "white");
                this.isSelect_all = true;
            } else {
                $("#p6").css("fill", "white");
                $("#txt_p6").css("fill", "#ff4081");
                this.isSelect_all = false;
            }

        } else {
            $("#Portion_7_").css("fill", "#ff4081");
            $("#txt_p7").css("fill", "white");
            this.isSelect_sport = true
            if (this.isSelect_formal && this.isSelect_casual && this.isSelect_sport) {
                $("#Portion_9_").css("fill", "white");
                $("#txt_p9").css("fill", "#ff4081");
                $("#Portion_8_").css("fill", "white");
                $("#txt_p8").css("fill", "#ff4081");
                $("#Portion_7_").css("fill", "white");
                $("#txt_p7").css("fill", "#ff4081");
                this.isSelect_casual = false;
                this.isSelect_sport = false;
                this.isSelect_formal = false;

                $("#p6").css("fill", "#ff4081");
                $("#txt_p6").css("fill", "white");
                this.isSelect_all = true;
            } else {
                $("#p6").css("fill", "white");
                $("#txt_p6").css("fill", "#ff4081");
                this.isSelect_all = false;
            }
        }
    }
    //last next button after finding match products
    goToCatalog() {
        this.router.navigate(['/catalog']);
        sessionStorage.setItem("langSelected", this.selectedLang);
    }
}
