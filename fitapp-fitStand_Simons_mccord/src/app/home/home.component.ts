import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientCaptureService } from '../client-capture.service';
import { AddToCartService } from '../add-to-cart.service';
//import { CustomerModel, CustomerCapture } from '../customerModel';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from 'ng2-translate';

declare var $: any; // for jquery
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
    private phone = "";
    private bodyWeight;
    private bodyHeight;
    private neckSize = 0;
    private chestSize = 0;
    private bellySize = 0;
    private bellyType = -1;
    private password = "";
    private measurementStatus = "";
    private oldMeasurements: Object;

    private matchNo;
    private products = [];

    private isError = false; //error handeling
    private isError_match = false; //for match error
    private isNoMatch = false;
    private msgErr: Object;  // json error message
    private permit = false;
    private validMsg = "";
    private icon_eye = "visibility";
    private isFirstTime_findingMatch = true;
    private wrongPass_msg = "";
    private firstViewIsVisible = true;

    //translation
    private selectedLang = "en";
    private supportedLangs = [];

    private errorMessage_input_caracter = "";
    // breast Choice
    private brsChois = [
        { image: "../../images/breastChoice/Torso_1Svelte.png", title: "Svelte", description: "Torse élancé ou bien défini." },
        { image: "../../images/breastChoice/Torso_2Median.png", title: "Régulier", description: "Torse moyen / Je ne sais pas." },
        { image: "../../images/breastChoice/Torso_3Fort.png", title: "Robuste", description: "Torse fort, enrobé." },
    ];
    private selectNext = 0;

    constructor(private router: Router, private clientCaptureService: ClientCaptureService, private translate: TranslateService, private addTocartService: AddToCartService) {
        sessionStorage.clear();
        this.addTocartService.orderNumber = 0;
        this.addTocartService.listCartProduct = [];
        this.clientCaptureService.clientExist = false;
        this.clientCaptureService.isRightPassword = false;
        this.clientCaptureService.passwordEmpty = true;
        this.isFirstTime_findingMatch = true;
        this.clientCaptureService.onErrorReceived = this.theCallBackError.bind(this); //catching error if there is
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
            case "height":
                this.bodyHeight = val;
                break;
            case "weight":
                this.bodyWeight = val;
                break;
            case "neckSize":
                this.neckSize = val;
                break;
            case "chestSize":
                this.chestSize = val;
                break;
            case "bellySize":
                this.bellySize = val;
                break;
            case "email":
                this.email = val;
                this.validMsg = "";
                break;
            case "f_name":
                this.fName = val;
                break;
            case "l_name":
                this.lName = val;
                break;
            case "password":
                this.password = val;
                this.wrongPass_msg = "";
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
                min: $.validator.format("Please enter a value greater than or equal to {0}."),
            });
            this.errorMessage_input_caracter = "Please enter Letters only";

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
                min: $.validator.format("Veuillez entrer une valeur plus grande que ou &eacute;gale &agrave; {0}."),
            });
            this.errorMessage_input_caracter = "Veuillez entrer les lettres seulement";
        }
    }
    //---------------------------------
    //select type of chest
    onSelectBody(index) {
        this.bellyType = index;
    }

    findMatchProduct() {
        this.clientCaptureService.register_measurement(this.chestSize, this.bellySize, this.bodyHeight, this.bodyWeight, this.neckSize, this.bellyType, this.clientId);
        // call back function for calling "theCallBack()" after "register_measurement" is compeletly done
        this.clientCaptureService.onErrorReceived = this.theCallBackError_match.bind(this);
        this.clientCaptureService.onMatchReceived = this.theCallBackMatch.bind(this);
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
        this.errorMessage = this.clientCaptureService.errMsg;
        this.isError_match = false;
        if (this.isFirstTime_findingMatch) {
            this.isFirstTime_findingMatch = false;
            this.result_first_match();
        }
        else {
            this.result_fn();
        }

    }
    // showing the suggested products
    result_fn() {
        var langSel = this.selectedLang;
        $("#content_scan").fadeOut("slow", function () {
            $("#content_result").fadeIn("5000", function () {
                $("#content_scan").css("display", "none");
                $("#content_result").fadeOut("5000", function () {
                    if (langSel == 'en') { $("#txt_p6").attr("x", "15"); }
                    if (langSel == 'fr') { $("#txt_p6").attr("x", "0"); }
                    $("#content_prefilter").fadeIn("2000");
                });
            });
        });
    }
    result_first_match() {
        if (this.isNoMatch) {
            $('#content_login').hide("slide", { direction: "left" }, 100);
            $("#form_div").show("slide", { direction: "right" }, 300);
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
        $("#content_prefilter").fadeOut("5000", function () {
            $("#form_div").fadeIn("2000");
        });
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
            this.clientCaptureService.register_client(this.email, this.fName, this.lName, this.phone, 0); // call function of backend
            this.clientCaptureService.onReceivedClientID = this.theCallBackGetClientId2.bind(this);
        }
    }
    //call back function for new email
    theCallBackGetClientId2() {
        sessionStorage.setItem("email", this.email);
        this.clientId = this.clientCaptureService.clientId;
        //$('#form_login').hide("slide", { direction: "left" }, 100);
        //$("#form_registration").show("slide", { direction: "right" }, 300);
        $('#content_login').hide("slide", { direction: "left" }, 100);
        $("#form_div").show("slide", { direction: "right" }, 300);
    }
    //after entering the email for password form next button should check the password out that is exist or not
    check_passwrd() {
        if ($("#form_password").valid()) {
            // of the password is empty go to registration form
            $('#form_password').fadeOut("slow");
            if (this.clientCaptureService.passwordEmpty) {
                $("#form_registration").show("slide", { direction: "right" }, 300);
            } else {
                //checking for right password
                $('#preLoader_').fadeIn("slow");
                this.clientCaptureService.password_checkOut(this.email, this.password);
                this.clientCaptureService.onCheckingPasswordDone = this.theCallBackPassword.bind(this);
            }
        }
    }
    //call back of password checking
    theCallBackPassword() {
        // right password
        if (this.clientCaptureService.isRightPassword) {
            this.wrongPass_msg = "";
            this.set_unit_ui(); // sets metric or imperial as default according to the "preference_unit_system" in backend
            //if client's password is not empty and there is old measurement go to new/old measurement form
            if (Object.keys(this.clientCaptureService.oldMeasurement).length > 0) { // check the length of an object
                if (this.clientCaptureService.oldMeasurement["neck_size"] !== undefined && this.clientCaptureService.oldMeasurement["neck_size"] !== "") { //check for measurement of shirt
                    //check for match products according to previus measuement
                    this.bellySize = this.clientCaptureService.oldMeasurement["waist_size"];
                    this.bodyHeight = this.clientCaptureService.oldMeasurement["height"];
                    this.bodyWeight = this.clientCaptureService.oldMeasurement["weight"];
                    this.chestSize = this.clientCaptureService.oldMeasurement["chest_size"];
                    this.neckSize = this.clientCaptureService.oldMeasurement["neck_size"];
                    //console.log({ "bellySize": this.bellySize, "bodyHeight": this.bodyHeight, "bodyWeight": this.bodyWeight, "chestSize": this.chestSize, "neckSize": this.neckSize });
                    this.isFirstTime_findingMatch = true;
                    this.findMatchProduct(); // check is there any match product or not. If not go directly to measurement form
                } else {
                    this.oldMeasurements = null;
                    $('#content_login').hide("slide", { direction: "left" }, 100);
                    $("#form_div").show("slide", { direction: "right" }, 300);
                }
            } else {
                //if client's password is not empty but there is no old measurement go to measurement form
                this.oldMeasurements = null;
                $('#content_login').hide("slide", { direction: "left" }, 100);
                $("#form_div").show("slide", { direction: "right" }, 300);
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

            //if old measurement of the client exist in database 
            if (this.oldMeasurements != null) {
                $('#form_registration').hide("slide", { direction: "left" }, 100);
                $("#NewOrOldSizes").show("slide", { direction: "right" }, 300);

            } else {//if there is no old measurement go to measurement form
                $('#content_login').hide("slide", { direction: "left" }, 100);
                $("#form_div").show("slide", { direction: "right" }, 300);
            }
        }
    }
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
    private switchEyes() {
        if (this.icon_eye == "visibility_off") {
            this.icon_eye = "visibility";
        } else {
            this.icon_eye = "visibility_off";
        }
    }
    private set_unit_ui() {
        switch (this.clientCaptureService.unit_prefer) {
            case "imperial":
                $('#Metrics_check').prop('checked', true);
                $(".lbl1 label").text("feet");
                $(".lbl2 label").text("lbs");
                $(".lbl3 label").text("inch");
                $(".lbl4 label").text("inch");
                $(".lbl5 label").text("inch");
                $('#height_cm').hide();
                $('#height_ft').show();
                break;
            case "metric":
                $('#Metrics_check').prop('checked', false);
                $(".lbl1 label").text("cm");
                $(".lbl2 label").text("kg");
                $(".lbl3 label").text("cm");
                $(".lbl4 label").text("cm");
                $(".lbl5 label").text("cm");
                $('#height_cm').show();
                $('#height_ft').hide();
                break;
        }
    }
    //after registering client this function get client id from client-capture-service
    private theCallBackGetClientId() {
        sessionStorage.setItem("email", this.email);
        this.clientId = this.clientCaptureService.clientId;
        $('#content_login').hide("slide", { direction: "left" }, 100);
        $("#form_div").show("slide", { direction: "right" }, 300);
    }
    private refreshPage() {
        location.reload();
    }
    //UI JQUERY PART:
    ngAfterViewInit() {

        //calculating the x and y and width of contents according to window width
        function setPosition(div_name) {
            $("#container_home").css({ "top": "0", "right": "0", "bottom": "0", "left": "0" })
            if (div_name != "#content_login" && div_name != "#form_div" && div_name != "#form_registration" && div_name != "#NewOrOldSizes" && div_name != "#content_breastChs") {
                //alert($(window).width());
                var w = $(window).width() * (3 / 5);
                var h = $(window).height() * (3 / 5);
                $(div_name).css('width', w);
                $(div_name).css('height', h);
            }
            var x = ($(window).width() - $(div_name).width()) / 2;
            var y = ($(window).height() - $(div_name).height()) / 2;
            if (div_name == "#content_prefilter" || div_name == "#content_breastChs") {
                $(div_name).css('top', y - 50);
            } else {

                $(div_name).css('top', y);
            }
            if (div_name == "#form_div") {
                $(div_name).css('top', y - 100);
            }
            $(div_name).css('left', x);
            $("#footer").css('top', $(window).height()-30);

        }
        //rotation event from landscape to portrait or Vice versa
        $(window).on("orientationchange", function (event) {

            setPosition('#content_login');// #content_login div
            setPosition('#form_div');
            setPosition('#content_breastChs');
            setPosition('#content_scan');// #content_scan div
            setPosition('#content_result');// #content_result div
            setPosition('#content_prefilter');// #content_prefilter div



        });
        //re arrenging when the window is resizing
        $(window).resize(function () {
            setPosition('#content_login');// #content_login div
            setPosition('#form_div');
            setPosition('#content_breastChs');
            setPosition('#content_scan');// #content_scan div
            setPosition('#content_result');// #content_result div
            setPosition('#content_prefilter');// #content_prefilter div


        });
        //default setting
        setPosition('#content_login');// #content_login div
        setPosition('#form_div');
        setPosition('#content_breastChs');
        setPosition('#content_scan');// #content_scan div
        setPosition('#content_result');// #content_result div
        setPosition('#content_prefilter');// #content_prefilter div
        $('body').css({ 'background-color': 'white' });



        //-------------------------------------------------------------------------------------

        //SWITCH VIEW ACTION in first view
        $("#content_login").fadeIn('slow');

        //toggle password of registration form
        $.toggleShowPassword({
            field: '.password',
            control: '#test5'
        });

        //form_div dropdown list
        $('select').material_select();
        $(".caret").text(""); //fir removing the extra arrow in dropdown list
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

        //measurment form
        $("#form_input").validate({
            lang: this.selectedLang,
            rules: {
                taille: {
                    required: true,
                    number: true,
                },
                poids: {
                    required: true,
                    number: true,
                },
                tour_cou: {
                    required: true,
                    number: true,
                },
                tour_poitrine: {
                    required: true,
                    number: true,

                },
                tour_taille: {
                    required: true,
                    number: true,
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

        // Form Measurment
        // Button Suivant event
        var cm_taille, kg_poids, cm_cou, cm_poitrine, cm_tour_taille;

        $(this.suivant2.nativeElement).on('click', (e, args) => {
            if ($("#form_input").valid()) {
                //checking for error connection to server
                this.clientCaptureService.onErrorReceived = this.theCallBackError.bind(this);
                // save the unit preference of client in each submit to the database
                let unit_prefer = $("#Metrics_check").prop("checked") ? "imperial" : "metric";
                this.clientCaptureService.update_client_unitSystem(this.clientId, unit_prefer);

                $("#form_div").fadeOut("slow", function () {
                    $("#content_breastChs").fadeIn("fast");
                });
            }
        });

        // chest choise view
        $(".btn_suivant").on('click', (e, args) => {
            if ($("#form_input").valid() && this.bellyType !== -1) {
                //Switching of Unit of measurements
                if ($("#Metrics_check").prop("checked")) {
                    cm_taille = ($('#feet select').val() * 12 + $('#inch select').val() * 1) * 2.54;
                    this.bodyHeight = cm_taille;
                    kg_poids = this.bodyWeight / 2.20462262185;  //1 kg = 2.20462262185 lb
                    this.bodyWeight = kg_poids;
                    cm_cou = this.neckSize * 2.54;
                    this.neckSize = cm_cou;
                    cm_poitrine = this.chestSize * 2.54;
                    this.chestSize = cm_poitrine;
                    cm_tour_taille = this.bellySize * 2.54;
                    this.bellySize = cm_tour_taille;
                }
                $("#content_breastChs").fadeOut("fast", function () {
                    $("#content_scan").fadeIn("fast");
                });
                this.isFirstTime_findingMatch = false;
                this.findMatchProduct();
            }
        });
        // chest choise event 
        $(".imgContainer,.txtContainer").on('click', function () {
            $(".section_choise").css({ 'background-color': 'white', 'border': 'none' })
            $(this).parent().css({ 'background-color': 'rgba(0,0,0,0.3)', 'border': '3px solid #017e61' });
        });

        // check box event for first one
        //$("#taille_check").change(function () {
        //    if ($("#taille_check").prop("checked")) {
        //        $('#poids_check').prop('checked', true);
        //        $('#cou_check').prop('checked', true);
        //        $('#poitrine_check').prop('checked', true);
        //        $('#tour_taille_check').prop('checked', true);
        //        //$('#height_ft').show();
        //        //$('#height_cm').hide();

        //    } else {
        //        $('#poids_check').prop('checked', false);
        //        $('#cou_check').prop('checked', false);
        //        $('#poitrine_check').prop('checked', false);
        //        $('#tour_taille_check').prop('checked', false);
        //        //$('#height_cm').show();
        //        //$('#height_ft').hide();
        //    }

        //});
        // check box event for first one
        $("#Metrics_check").change(function () {
            if ($("#Metrics_check").prop("checked")) {
                $(".lbl1 label").text("feet");
                $(".lbl2 label").text("lbs");
                $(".lbl3 label").text("inch");
                $(".lbl4 label").text("inch");
                $(".lbl5 label").text("inch");
                $('#height_cm').slideUp('slow', function () {
                    $('#height_ft').slideDown('slow');
                });
            } else {
                $(".lbl1 label").text("cm");
                $(".lbl2 label").text("kg");
                $(".lbl3 label").text("cm");
                $(".lbl4 label").text("cm");
                $(".lbl5 label").text("cm");
                $('#height_ft').slideUp('slow', function () {
                    $('#height_cm').slideDown('slow');
                });

            }

        });

    }// end of ngAfterViewInit()
    //SVG EVENTS
    //formal
    Portion9_click() {
        if (this.isSelect_formal) {
            $("#Portion_9_").css("fill", "white");
            $("#txt_p9").css("fill", "#017e61");
            this.isSelect_formal = false
            //check for selecting all options
            if (!this.isSelect_formal && !this.isSelect_casual && !this.isSelect_sport) {
                $("#p6").css("fill", "#017e61");
                $("#txt_p6").css("fill", "white");
                this.isSelect_all = true;
            } else {
                $("#p6").css("fill", "white");
                $("#txt_p6").css("fill", "#017e61");
                this.isSelect_all = false;
            }
        } else {
            $("#Portion_9_").css("fill", "#017e61");
            $("#txt_p9").css("fill", "white");
            this.isSelect_formal = true
            if (this.isSelect_formal && this.isSelect_casual && this.isSelect_sport) {
                $("#Portion_9_").css("fill", "white");
                $("#txt_p9").css("fill", "#017e61");
                $("#Portion_8_").css("fill", "white");
                $("#txt_p8").css("fill", "#017e61");
                $("#Portion_7_").css("fill", "white");
                $("#txt_p7").css("fill", "#017e61");
                this.isSelect_casual = false;
                this.isSelect_sport = false;
                this.isSelect_formal = false;

                $("#p6").css("fill", "#017e61");
                $("#txt_p6").css("fill", "white");
                this.isSelect_all = true;
            } else {
                $("#p6").css("fill", "white");
                $("#txt_p6").css("fill", "#017e61");
                this.isSelect_all = false;
            }
        }
    }
    //casual
    Portion8_click() {
        if (this.isSelect_casual) {
            $("#Portion_8_").css("fill", "white");
            $("#txt_p8").css("fill", "#017e61");
            this.isSelect_casual = false
            if (!this.isSelect_formal && !this.isSelect_casual && !this.isSelect_sport) {
                $("#p6").css("fill", "#017e61");
                $("#txt_p6").css("fill", "white");
                this.isSelect_all = true;
            } else {
                $("#p6").css("fill", "white");
                $("#txt_p6").css("fill", "#017e61");
                this.isSelect_all = false;
            }
        } else {
            $("#Portion_8_").css("fill", "#017e61");
            $("#txt_p8").css("fill", "white");
            this.isSelect_casual = true
            if (this.isSelect_formal && this.isSelect_casual && this.isSelect_sport) {
                $("#Portion_9_").css("fill", "white");
                $("#txt_p9").css("fill", "#017e61");
                $("#Portion_8_").css("fill", "white");
                $("#txt_p8").css("fill", "#017e61");
                $("#Portion_7_").css("fill", "white");
                $("#txt_p7").css("fill", "#017e61");
                this.isSelect_casual = false;
                this.isSelect_sport = false;
                this.isSelect_formal = false;

                $("#p6").css("fill", "#017e61");
                $("#txt_p6").css("fill", "white");
                this.isSelect_all = true;
            } else {
                $("#p6").css("fill", "white");
                $("#txt_p6").css("fill", "#017e61");
                this.isSelect_all = false;
            }
        }
    }
    //sport
    Portion7_click() {
        if (this.isSelect_sport) {
            $("#Portion_7_").css("fill", "white");
            $("#txt_p7").css("fill", "#017e61");
            this.isSelect_sport = false
            if (!this.isSelect_formal && !this.isSelect_casual && !this.isSelect_sport) {
                $("#p6").css("fill", "#017e61");
                $("#txt_p6").css("fill", "white");
                this.isSelect_all = true;
            } else {
                $("#p6").css("fill", "white");
                $("#txt_p6").css("fill", "#017e61");
                this.isSelect_all = false;
            }

        } else {
            $("#Portion_7_").css("fill", "#017e61");
            $("#txt_p7").css("fill", "white");
            this.isSelect_sport = true
            if (this.isSelect_formal && this.isSelect_casual && this.isSelect_sport) {
                $("#Portion_9_").css("fill", "white");
                $("#txt_p9").css("fill", "#017e61");
                $("#Portion_8_").css("fill", "white");
                $("#txt_p8").css("fill", "#017e61");
                $("#Portion_7_").css("fill", "white");
                $("#txt_p7").css("fill", "#017e61");
                this.isSelect_casual = false;
                this.isSelect_sport = false;
                this.isSelect_formal = false;

                $("#p6").css("fill", "#017e61");
                $("#txt_p6").css("fill", "white");
                this.isSelect_all = true;
            } else {
                $("#p6").css("fill", "white");
                $("#txt_p6").css("fill", "#017e61");
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
