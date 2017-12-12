import { Component, Input, ViewChild } from '@angular/core';

import { CartService } from './cart-list/cart.service';
///import { ClientCaptureService } from '../client-capture.service';
import { PriceFilterPipe } from '../shared/price-filter/price-filter.pipe'

import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { Product } from '../shared/products/product.model';
import { Client } from '../shared/clients/client.model';
import { MdGridListModule, MdSidenavModule, MdToolbarModule } from '@angular/material';
import { LogoutService } from '../shared/logout/logout.service';
import { NavbarService } from './navbar.service';



@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.css'],
    providers: [CartService, NavbarService]
})


export class CatalogComponent {

    @Input() products: Product[];
    @Input() client: Client;
    @Input() selectedProducts: Product[];
    @ViewChild('sidenav') sidenav; 
    @ViewChild('catalogList') catalogList;

    productSelected: Product;

    constructor( cartService : CartService, private logoutService: LogoutService, private navbarService: NavbarService ) {
        navbarService.toggle$.subscribe(
            () => this.sidenav.close()
        )
     }

    onSelect(product: Product) {
        this.productSelected = product;
        this.sidenav.open();
    }

    logout(){
        let selection = this.selectedProducts.length != 0 ? true : false
        this.logoutService.logout(this.client, selection ? this.selectedProducts.map(product => product.productVersions[0].id) : null);
    }

    selectedProductsUpdate(products: Product[]){
        this.selectedProducts = products;
    }

}


    /*

    // UI part
    //declaring elements from html to angular
    //filter type
    @ViewChild('tous') tous: ElementRef;
    @ViewChild('sexy') sexy: ElementRef;
    @ViewChild('sport') sport: ElementRef;
    @ViewChild('classique') classique: ElementRef;

    //filter color
    @ViewChild('black') black: ElementRef;
    @ViewChild('lightblue') lightblue: ElementRef;
    @ViewChild('purple') purple: ElementRef;
    @ViewChild('redpurple') redpurple: ElementRef;
    @ViewChild('greenblue') greenblue: ElementRef;
    @ViewChild('red') red: ElementRef;
    @ViewChild('beige') beige: ElementRef;
    @ViewChild('pink') pink: ElementRef;
    @ViewChild('blue') blue: ElementRef;

    //@ViewChild('btn_filter') btn_filter: ElementRef;
    @ViewChild('cart') cart: ElementRef;

    @ViewChild('nav') nav: ElementRef;
    @ViewChild('exit') exit: ElementRef;
    @ViewChild('assist') assist: ElementRef;

    @ViewChild('result') result: ElementRef;
    
    @ViewChild('minPrice') minPrice: ElementRef;
    @ViewChild('maxPrice') maxPrice: ElementRef;

    

    private cart_height;

    //Backend part:
    private products = [];
    //private originalProducts = [];

    //ERROR HANDELING
    private error_ = "";
    private isError = false;

    private selectedLang = "";
    public supportedLangs: any[];
    private viewLang = "";
    //this.clientCaptureService.productsReceived.products;
    // list of availble colors
    color_prd = ["black", "lightblue", "purple", "redpurple", "greenblue", "red", "beige", "pink", "blue"];
    color_selected = [];
    titr_selected = "TOUS";
    private result_msg = "";
    private matchNo = 0;
    private minPriceVal = 0;
    private maxPriceVal = 0;
    private minPriceRange = 0;
    private maxPriceRange = 0;
    private listPrice = [];
    //private filterRange: FilterRange = { minPrice: 0, maxPrice: 0};
    private filterRange = { minPrice: 0, maxPrice: 0 };

    private globOrder = 0;
    private idPrd = 0;
    private picPrd = "";
    private namePrd = "";
    private brandPrd = "";
    private pricePrd = "";
    private sizePrd = "";
    private descPrd = "";
    private featrPrd = [];
    private colorPrd = [];
    private quantPrd = 0;
    private cutPrd = "";
    private fabricPrd = "";
    private skuPrd = "";
    private sleevePrd = "";
    private versionId = "";
    private email = "";
    private inputEmail = "";
    private icon_filter = "filter_list";
    private listPrdVersionIdSelected = [];
    private clientId = "";
    private msg_invalidEmail = "";
    constructor(private CartService: CartService, private router: Router,
        ///private clientCaptureService: ClientCaptureService, private http: Http,
        private translate: TranslateService) {
        // for refreshing page case       
        if (JSON.parse(sessionStorage.getItem("products")) != null) {
            this.products = JSON.parse(sessionStorage.getItem("products"));
            this.matchNo = parseInt(sessionStorage.getItem("matchNo"));
            if (JSON.parse(sessionStorage.getItem("orderNumber")) !== null ) {
                this.CartService.listCartProduct = JSON.parse(sessionStorage.getItem("listCartProduct"));
                this.CartService.orderNumber = parseInt(sessionStorage.getItem("orderNumber"));
            } else {
                this.CartService.orderNumber = 0;
            }
            
            
        //for the first time
        } else { 
            // List of match products
            this.products = this.clientCaptureService.listProducts;
            this.matchNo = this.products.length;
            //saving variables in sessionStorage
            sessionStorage.setItem("products", JSON.stringify(this.products));
            sessionStorage.setItem("matchNo", this.matchNo+"");
        }
        // if there is no match product back to home page
        if (this.products == null || this.products.length == 0) {
            sessionStorage.clear();
            this.CartService.listCartProduct = [];
            this.CartService.orderNumber = 0;
            this.router.navigate(['/']);
        }
        //getting some variable from sessionStorage
        this.selectedLang = sessionStorage.getItem("langSelected");
        this.clientId = sessionStorage.getItem("clientId");
        this.email = sessionStorage.getItem("email");
        sessionStorage.setItem("listCartProduct", JSON.stringify(this.CartService.listCartProduct));

        // --
        // calculating the list of price for filtering price
        for (var i = 0; i < this.products.length; i++) {
            this.listPrice.push(parseInt(this.products[i].price.replace('$', '')));
        }
        this.listPrice.sort((n1, n2) => n1 - n2);
        this.minPriceRange = parseInt(this.listPrice[0]);
        this.maxPriceRange = parseInt(this.listPrice[this.listPrice.length - 1]);
        this.filterRange.minPrice = this.minPriceRange;
        this.filterRange.maxPrice = this.maxPriceRange;
    }

    ngOnInit() {
        this.selectLang(this.selectedLang);
    }
    //getting current language
    isCurrentLang(lang: string) {
        return lang === this.translate.currentLang;
    }
    selectLang(lang: string) {
        this.selectedLang = lang;
        sessionStorage.setItem("langSelected", this.selectedLang);
        if (lang == 'fr') { this.viewLang = 'Français' }
        if (lang == 'en') { this.viewLang = 'English' }
        this.translate.use(lang);
        this.setFormMessageValidating();
    }
    setFormMessageValidating() {
        if (this.selectedLang == 'en') {
            $.extend($.validator.messages, {
                required: "This field is required.",
                email: "Please enter a valid email address.",
            });
        }
        if (this.selectedLang == 'fr') {
            $.extend($.validator.messages, {
                required: "Ce champ est requis.",
                email: "Veuillez entrer une adresse courriel valide.",
            });
        }
    }
    //---------------------------------
    // input value as email
    onInput(val) {
        this.msg_invalidEmail = "";
        this.inputEmail = val;
    }
    //sending email to client when client wants to exit
    createRelation() {
        for (var i = 0; i < this.CartService.listCartProduct.length; i++) {
            this.listPrdVersionIdSelected.push(this.CartService.listCartProduct[i].versionId);
        }
        this.clientCaptureService.relation_Selected(this.listPrdVersionIdSelected);
        this.sendEmail();
        sessionStorage.clear();
        this.CartService.listCartProduct = [];
        this.CartService.orderNumber = 0;
        this.router.navigate(['/']);
    }
    sendEmail() {
        if (sessionStorage.getItem("email") != "" && sessionStorage.getItem("email") != null) {
            this.clientCaptureService.sendEmail(this.CartService.listCartProduct);
        }
    }
    //register email of client in fitting panel and create a new clientId
    registerClient() {
        var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i; //custom email validation bt regular expression
        if ($("#form_login").valid()) {
            if (testEmail.test(this.inputEmail)) {//custom email validation bt regular expression
                this.msg_invalidEmail = "";
                if (this.inputEmail != "" || this.inputEmail != null) {
                    sessionStorage.setItem("email", this.inputEmail);
                    this.clientCaptureService.update_client(this.clientId, this.inputEmail, 0); // call function of backend
                    this.clientCaptureService.onGoodReceived = this.update_client.bind(this);
                    this.clientCaptureService.onErrorReceived = this.theCallBackError_register.bind(this);

                }
            } else {
                this.msg_invalidEmail = "Adresse Email incorrecte";
            }
        }

    }
    // refused update_client in clientCaptureService
    private theCallBackError_register() {
        this.email = "";
        sessionStorage.setItem("email", "");
        this.msg_invalidEmail = "Cet email est déjà pris";
    }
    //successfull update_client in clientCaptureService
    private update_client() {
        this.msg_invalidEmail = "";
        sessionStorage.setItem("email", this.inputEmail);
        $("#envoyer_btn").fadeOut("slow", function () {
            $("#sendMessage").fadeIn("slow");
        });
    }
    private w_;
    private width_product_cart_;
    //click on tile and shows the detail's product
    private ProductSelected: Object;

    //showing detail product by clicking on cart
    onClickProduct(id,e) {
        this.ProductSelected = this.products.filter((row) => row.id == id);
        this.idPrd = this.ProductSelected[0].id;
        this.picPrd = this.ProductSelected[0].large_picture;
        this.namePrd = this.ProductSelected[0].name;
        this.brandPrd = this.ProductSelected[0].brand;
        this.quantPrd = this.ProductSelected[0].Quantity;
        this.pricePrd = this.ProductSelected[0].price;
        this.descPrd = this.ProductSelected[0].description;
        this.sizePrd = this.ProductSelected[0].size;
        var str = this.ProductSelected[0].feature;
        this.featrPrd = str.split(' - ');
        this.colorPrd = this.ProductSelected[0].color;
        this.cutPrd = this.ProductSelected[0].cut;
        this.fabricPrd = this.ProductSelected[0].fabric;
        this.skuPrd = this.ProductSelected[0].sku;
        this.sleevePrd = this.ProductSelected[0].sleeve;
        this.versionId = this.ProductSelected[0].versionId

        //  ui
        // hightlight the selected li
        $("li").removeClass("hightlight_item");
        $(e.currentTarget).addClass("hightlight_item");

        //opening the product detail on click on cart tile
        if ($('#product_panel').offset().left + 50 >= $(window).width()) {//calculating the product_panel is out of screen or not
            $('#dropdown2').hide("slide", { direction: "up" }, 300);
            $("#product_panel").animate({ "right": '0' }, { duration: 500, queue: false }); //w: width of product_panel , queue: false -> animations simultaneously 
            if ($(window).width() < 1260) {
                $(".product_cart").animate({ "width": this.width_product_cart_ }, { duration: 500, queue: false });
                $(".product_cart").animate({ "height": this.width_product_cart_ / 0.85 }, { duration: 500, queue: false });
            }
            $("#result ul li").css({ "display": "block" });
            $("#ul_wrapper").animate({ "margin-left": "0" }, { duration: 500, queue: false });
            $("#colors ul").css({ "display": "none" });
            $(".product_cart #pic").css({ "width": "55%", "height": "auto", "margin-left": "23%" });
            if ($(window).width() >= 768 && $(window).width() <= 1024) {
                $("#result ul").animate({ "margin-top": "100px", "margin-left": ($(window).width() - $('#product_panel').width()) / 2 - this.width_product_cart_ / 2 }, { duration: 500, queue: false });
                $(".nav-wrapper h3").animate({ "font-size": "18px" }, { duration: 500, queue: false });
                $("#title p").css({ "font-size": "16px", "text-align": "center" });
                $("#brand label").css({ "font-size": "14px" });
                $("#price label").css({ "font-size": "14px" });
            }
            if ($(window).width() > 1024) {
                $("#result ul").animate({ "margin-top": "100px", "margin-left": ($(window).width() - $('#product_panel').width()) / 2 - this.width_product_cart_ / 2 }, { duration: 500, queue: false });
                $("#title p").css({ "font-size": "24px", "text-align": "center" });
                $("#brand label").css({ "font-size": "20px" });
                $("#price label").css({ "font-size": "20px" });
            }
            if ($(window).width() > 1260) {
                $("#result ul").animate({ "margin-top": "100px", "margin-left": ($(window).width() - $('#product_panel').width()) / 2 - ($("#result ul li").width() + (26 * 2)) / 2 }, { duration: 500, queue: false });
            }
            $("#btn_add").css({ "display": "block" });
            //scrolling to selected li when product detail is giong to be opened
            setTimeout(() => this.scrollToSeleced(), 700);


        } else {//scrolling to selected li when product detail was opened
            this.scrollToSeleced();
        }
    }
    scrollToSeleced() {
        var container_ = $('#container'), scrollTo = $('.hightlight_item');
        container_.animate({
            scrollTop: scrollTo.offset().top + container_.scrollTop() - container_.offset().top - 100
        }, 'slow');
    }

    //checks if the the color is exist in array or not : for showing or hiding the colors in filter panel
    check_color(color) {
        return this.color_prd.indexOf(color) > -1;
    }
    //swipe event for closing product_panel in ipad
    private ww;
    private xx;
    swipe(action) {
        if (action === "swiperight") {
            this.xx = ($(window).width() / 2) - ($("#ul_wrapper").width() / 2)
            //changing the width of product detail according to window width
            if ($(window).width() >= 1260) {
                this.ww = $(window).width() - ($(".product_cart").width() + (26 * 2) + 50);
            } else {
                this.ww = $(window).width() * (2 / 3);
            }
            $('#dropdown3').hide("slide", { direction: "up" }, 300);
            $("#btn_add").css({ "display": "none" });
            $(".nav-wrapper h3").animate({ "margin-left": "35px", "font-size": "24px" }, { duration: 500, queue: false });
            $("#product_panel").animate({ "right": '-=' + (this.ww + 50) }, { duration: 500, queue: false });
            $("#ul_wrapper").animate({ "margin-left": this.xx - 14 }, { duration: 500, queue: false });
            $("#result ul").animate({ "margin-top": "100px" }, { duration: 500, queue: false });
            $(".product_cart #pic").animate({ "width": "200px", "height": "250px" }, { duration: 500, queue: false });
            if ($(window).width() >= 768 && $(window).width() < 1024) {
                $(".product_cart").animate({ "width": "330" }, { duration: 500, queue: false });
                $(".product_cart").animate({ "height": "458" }, { duration: 500, queue: false });
                $(".product_cart #pic").animate({ "margin-left": "13%" }, { duration: 500, queue: false });
                $(".nav-wrapper h3").css({ "font-size": "24px" });
                $("#title p").css({ "font-size": "20px", "text-align": "center" });
                $("#brand label").css({ "font-size": "16px" });
                $("#price label").css({ "font-size": "16px" });
            }
            if ($(window).width() >= 1024) {
                $(".product_cart").animate({ "width": "390" }, { duration: 500, queue: false });
                $(".product_cart").animate({ "height": "458" }, { duration: 500, queue: false });
                $("#title p").css({ "font-size": "24px", "text-align": "center" });
                $("#brand label").css({ "font-size": "19px" });
                $("#price label").css({ "font-size": "19px" });

            }
            $("#result ul li").css({ "display": "inline-block" });
            //scrolling to selected li
            setTimeout(() => this.scrollToSeleced(), 700);
        }
    }

    openDropdown2() {
        $('#dropdown2').show("slide", { direction: "up" }, 300);
        
    }
    closeDropdown2() {
        $("#dropdown2").hide("slide", { direction: "up" }, 500);
    }
    
    // jQuery part:
    ngAfterViewInit() {
        // set the position of "register_div" and "not_register_div"
        function setPosition1(div_name) {
            var w = $(window).width() * (3 / 5);
            var h = $(window).height() * (3 / 5);
            if (w > 700) {
                w = 700;
            }
            if (h > 500) {
                h = 500;
            }
            if (div_name == '#assistance_div') {
                $(div_name).css('width', w/2);
                $(div_name).css('height', h / 2);
                
            } else {
                $(div_name).css('width', w);
                $(div_name).css('height', h);
                
            }
            var x = ($(window).width() - $(div_name).width()) / 2;
            var y = ($(window).height() - $(div_name).height()) / 2;
            $(div_name).css('left', x);
            $(div_name).css('top', y);

            $("#content_essayage").css({ "width": $(window).width(), "height": $(window).height(), "background-color": "white" });
            $("#content_assist").css({ "width": $(window).width(), "height": $(window).height(), "background-color": "rgba(0,0,0,0.5)" });
        }
        setPosition1('#register_div');
        setPosition1('#not_register_div');
        setPosition1('#assistance_div');
        // ---------------------
        // exit button and back to home page
        $(this.exit.nativeElement).on('click touch', (e, args) => {
            this.sendEmail();
            this.CartService.listCartProduct = [];
            this.CartService.orderNumber = 0;
            this.router.navigate(['/']);
        });
        // exit button in product detail
        $("#dropdown3 #exit").on('click touch', (e, args) => {
            this.sendEmail();
            this.CartService.listCartProduct = [];
            this.CartService.orderNumber = 0;
            this.router.navigate(['/']);
        });
        // calling assistant
        $(this.assist.nativeElement).on('click touch', (e, args) => {
            $("#content_assist").fadeIn("3000");
            $('#dropdown2').hide("slide", { direction: "up" }, 300);
        });
        
        // calling assistant from product detail
        $("#dropdown3 #assist").on('click touch', (e, args) => {
            $("#content_assist").fadeIn("3000");
            $('#dropdown3').hide("slide", { direction: "up" }, 300);
        });
        $("#assistance_div button").on('click touch', (e, args) => {
            $("#content_assist").fadeOut("3000");
        });
        $("#content_assist").on('click touch', (e, args) => {
            $("#content_assist").fadeOut("3000");
        });
        $("body").on('click touch', (e, args) => {
            if (e.target.nodeName !== "I") {
                $('#dropdown2').hide("slide", { direction: "up" }, 300);
                $('#dropdown3').hide("slide", { direction: "up" }, 300);
            }
            if (e.target.id !== "language_sel") {
                $("#menu3").animate({ "height": "0" }, 300, function () {
                    $("#menu3").css({ "display": "none" });

                });
            }
            //console.log(e);
        });
        // for dropdown nav bar item in materialize
        $(".dropdown-button").dropdown();
        // -----------------------
        //set the position of ul in center and set the width and position tile card and product_detail panel
        var width_product_cart;
        var height_product_cart;
        var w;
        var h;
        var lisInRow;
        var x;
        function set_position() {
            calculateLisInRow();
            //changing the width of cart tile according to window width when the product detail is showed
            width_product_cart = $(window).width() * (1 / 3) - 50;
            height_product_cart = ($(".product_cart").width() + (26 * 2)) / 0.85;
            if ($(window).width() >= 768 && $(window).width() < 1024) {
                $(".product_cart").css('width', '330');
            }
            if ($(window).width() >= 1024) {
                $(".product_cart").css('width', '390');
            }
            $(".product_cart").css('height', 458);

            // calculating the width of li and the spaces between them. 
            // (li's width + 2 side padding) * number of li in row + distance width between each li
            
            var w2 = (($(".product_cart").width() + (26 * 2)) * lisInRow) + ((lisInRow - 1) * 14);
            //set the width of ul to align it in the center of screen
            $("#ul_wrapper").css('width', w2 + 26); 
            $("#result ul").css('width', w2 + 26);
            $("#colors ul").css('width', '30px');
            x = ($(window).width() / 2) - ($("#ul_wrapper").width() / 2)


            //changing the width of product detail according to window width
            if ($(window).width() >= 1260) {
                w = $(window).width() - ($(".product_cart").width() + (26 * 2) + 50);
            } else {
                w = $(window).width() * (2 / 3);
            }
            h = $(window).height() ;
            $("#product_panel").css('width', w);
            $("#product_panel").css('height', h);
            $("#container").css('height', h);
            $("#product_panel").css('right', - $("#product_panel").width() - 50);
            $("#ul_wrapper").css('margin-top', '100px');
            $("#ul_wrapper").css('margin-left', x + 14);
            //$("#btn_filter").css('top', $(window).height() - 100);
            //$("#btn_filter").css('left', $(window).width() - 100);
            $("#btn_add").css('top', $(window).height() - 100);
            $("#btn_add").css('left', $(window).width() - 100);
            $('body').css({ 'background-color': '#e4e4e4'});
        }
        //calculate how many li per row we have
        var product_number = this.products.length; 
        function calculateLisInRow() {
            lisInRow = 0;
            w = $(window).width();
            var w_card = $(".product_cart").width() + (26 * 2) + 14 ;
            lisInRow = Math.floor(w / w_card);
            if (lisInRow > product_number) {
                lisInRow = product_number;
            }
        }

        //set the position of some element
        set_position();
        this.w_ = w;
        this.width_product_cart_ = width_product_cart;
        //rotation event from landscape to portrait or Vice versa
        $(window).on("orientationchange", function (event) {
            location.reload();
        });
        $(window).resize(function () {
            location.reload();
        });
        // -----------------------------
        // form validation
        $("#form_login").validate({
            rules: {
                email: {
                    required: true,
                    email: true
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

        // -----------------------------
        //filtering price
        $("#maxPrice").val(Math.floor(this.maxPriceRange));
        $("#minPrice").val(Math.ceil(this.minPriceRange));
        this.minPriceVal = $("#minPrice").val();
        this.maxPriceVal = $("#maxPrice").val();
        $(this.minPrice.nativeElement).on('change', (e, args) => {
            if (parseInt($("#maxPrice").val()) < parseInt($("#minPrice").val())) {
                $("#maxPrice").val($("#minPrice").val());
                this.maxPriceVal = $("#maxPrice").val();
                return;
            }
            this.minPriceVal = $("#minPrice").val();
            //filtering the producs list according to min val
            this.filterRange.minPrice = this.minPriceVal;
        });
        $(this.maxPrice.nativeElement).on('change', (e, args) => {
            if (parseInt($("#maxPrice").val()) < parseInt($("#minPrice").val())) {
                $("#maxPrice").val($("#minPrice").val());
                this.maxPriceVal = $("#maxPrice").val();
                return;
            }
            this.maxPriceVal = $("#maxPrice").val();
            this.filterRange.maxPrice = this.maxPriceVal;
        });
        // ----------------------------
        // for hiding the filter_panel and cart_list on click on background
        $(this.result.nativeElement).on('click touch', (e, args) => {
            $('#filter_panel').hide("slide", { direction: "right" }, 700);
            this.icon_filter = "&#xE152;";
            is_open = false;
            $('.cart_list').hide("slide", { direction: "up" }, 700);
            $('#dropdown2').hide("slide", { direction: "up" }, 700);
        });

        // for hiding the filter_panel and cart_list on click on nav bar
        $(this.nav.nativeElement).on('click touch', (e, args) => {
            $('#filter_panel').hide("slide", { direction: "right" }, 700);
            this.icon_filter = "&#xE152;"; // changing the icon of filter when the filter panel is open or is close
            //is_open = false;
            $('.cart_list').hide("slide", { direction: "up" }, 700);
            if (!$(e.target).is('i')) {
                $('#dropdown2').hide("slide", { direction: "up" }, 700);
            }
        });
        $("#menu3").on('click touch', (e, args) => {
            //$("#menu3").hide("slide", { direction: "up" }, 500);
            $("#menu3").animate({ "height": "0" }, 500, function () {
                $("#menu3").css({ "display": "none" });

            });
        });
        $("#language_sel").on('click touch', (e, args) => {
            $("#menu3").css({ "height": "0" });
            $("#menu3").css({ "display": "block" });
            $("#menu3").animate({ "height": "120" }, 500);
        });
        //prevent to click on card when we are clicking on language item
        $("#menu3 li").on('click touch', (e, args) => {
            if (e.target.id === "card_") {
                e.preventDefault();
            }
        });
        //Btn Filter
        var is_open = false;
        //$(this.btn_filter.nativeElement).on('click', (e, args) => {
        //    // changing the icon of filter when the filter panel is open or is close
        //    if (!is_open) {
        //        $('#filter_panel').show("slide", { direction: "right" }, 700);
        //        this.icon_filter = "&#xE876;";
        //        is_open = true;
        //    } else {
        //        $('#filter_panel').hide("slide", { direction: "right" }, 700);
        //        this.icon_filter = "&#xE152;";
        //        is_open = false;
        //    }
        //    $('#dropdown2').hide("slide", { direction: "up" }, 700);
        //    $('.cart_list').hide("slide", { direction: "up" }, 700);
        //});


        //open cart list panel
        $(this.cart.nativeElement).on('click touch', (e, args) => {
            e.stopPropagation();
            $('#filter_panel').hide("slide", { direction: "right" }, 700);
            $('.cart_list').show("slide", { direction: "up" }, 700);
            $('#dropdown2').hide("slide", { direction: "up" }, 700);
        });
        $("#product_panel").on('click touch', (e, args) => {
            //close dropdown3 panel
            if (!($('#dropdown3').is(':hidden')) && !$(e.target).is('i')) {
                $('#dropdown3').hide("slide", { direction: "up" }, 700);
            }
            //close cart list panel
            if (!($('.cart_list').is(':hidden'))) {
                $('.cart_list').hide("slide", { direction: "up" }, 700);
            }
        });

        //for filter type
        $(this.tous.nativeElement).on('click touch', (e, args) => {
            this.titr_selected = "TOUS";
        });
        $(this.sexy.nativeElement).on('click touch', (e, args) => {
            this.titr_selected = "HABILLE";
        });
        $(this.sport.nativeElement).on('click touch', (e, args) => {
            this.titr_selected = "SPORT";
        });
        $(this.classique.nativeElement).on('click touch', (e, args) => {
            this.titr_selected = "CASUAL";
        });

        // for filtering color in filter panel

        var isSelect_element1 = false;
        var isSelect_element2 = false;
        var isSelect_element3 = false;
        var isSelect_element4 = false;
        var isSelect_element5 = false;
        var isSelect_element6 = false;
        var isSelect_element7 = false;
        var isSelect_element8 = false;
        var isSelect_element9 = false;
        //select and deselect colors
        if (this.check_color("black")) {
            $(this.black.nativeElement).on('click touch', (e, args) => {
                if (isSelect_element1) {
                    var index = this.color_selected.indexOf("black");
                    if (index > -1) {
                        this.color_selected.splice(index, 1);
                    }
                    $(".black div").css('display', 'none');
                    isSelect_element1 = false;
                } else {
                    $(".black div").css('display', 'block');
                    this.color_selected.push("black");
                    isSelect_element1 = true;
                }

            });
        }
        if (this.check_color("lightblue")) {
            $(this.lightblue.nativeElement).on('click touch', (e, args) => {
                if (isSelect_element2) {
                    var index = this.color_selected.indexOf("lightblue");
                    if (index > -1) {
                        this.color_selected.splice(index, 1);
                    }
                    $(".lightblue div").css('display', 'none');
                    isSelect_element2 = false;
                } else {
                    $(".lightblue div").css('display', 'block');
                    this.color_selected.push("lightblue");
                    isSelect_element2 = true;
                }

            });
        }
        if (this.check_color("purple")) {
            $(this.purple.nativeElement).on('click touch', (e, args) => {
                if (isSelect_element3) {
                    var index = this.color_selected.indexOf("purple");
                    if (index > -1) {
                        this.color_selected.splice(index, 1);
                    }
                    $(".purple div").css('display', 'none');
                    isSelect_element3 = false;
                } else {
                    $(".purple div").css('display', 'block');
                    this.color_selected.push("purple");
                    isSelect_element3 = true;
                }
            });
        }
        if (this.check_color("redpurple")) {
            $(this.redpurple.nativeElement).on('click touch', (e, args) => {
                if (isSelect_element4) {
                    var index = this.color_selected.indexOf("redpurple");
                    if (index > -1) {
                        this.color_selected.splice(index, 1);
                    }
                    $(".redpurple div").css('display', 'none');
                    isSelect_element4 = false;
                } else {
                    $(".redpurple div").css('display', 'block');
                    this.color_selected.push("redpurple");
                    isSelect_element4 = true;
                }
            });
        }
        if (this.check_color("greenblue")) {
            $(this.greenblue.nativeElement).on('click touch', (e, args) => {
                if (isSelect_element5) {
                    var index = this.color_selected.indexOf("greenblue");
                    if (index > -1) {
                        this.color_selected.splice(index, 1);
                    }
                    $(".greenblue div").css('display', 'none');
                    isSelect_element5 = false;
                } else {
                    $(".greenblue div").css('display', 'block');
                    this.color_selected.push("greenblue");
                    isSelect_element5 = true;
                }
            });
        }
        if (this.check_color("red")) {
            $(this.red.nativeElement).on('click touch', (e, args) => {
                if (isSelect_element6) {
                    var index = this.color_selected.indexOf("red");
                    if (index > -1) {
                        this.color_selected.splice(index, 1);
                    }
                    $(".red div").css('display', 'none');
                    isSelect_element6 = false;
                } else {
                    $(".red div").css('display', 'block');
                    this.color_selected.push("red");
                    isSelect_element6 = true;
                }
            });
        }
        if (this.check_color("beige")) {
            $(this.beige.nativeElement).on('click touch', (e, args) => {
                if (isSelect_element7) {
                    var index = this.color_selected.indexOf("beige");
                    if (index > -1) {
                        this.color_selected.splice(index, 1);
                    }
                    $(".beige div").css('display', 'none');
                    isSelect_element7 = false;
                } else {
                    $(".beige div").css('display', 'block');
                    this.color_selected.push("beige");
                    isSelect_element7 = true;
                }
            });
        }
        if (this.check_color("pink")) {
            $(this.pink.nativeElement).on('click touch', (e, args) => {
                if (isSelect_element8) {
                    var index = this.color_selected.indexOf("pink");
                    if (index > -1) {
                        this.color_selected.splice(index, 1);
                    }
                    $(".pink div").css('display', 'none');
                    isSelect_element8 = false;
                } else {
                    $(".pink div").css('display', 'block');
                    this.color_selected.push("pink");
                    isSelect_element8 = true;
                }
            });
        }
        if (this.check_color("blue")) {
            $(this.blue.nativeElement).on('click touch', (e, args) => {
                if (isSelect_element9) {
                    var index = this.color_selected.indexOf("blue");
                    if (index > -1) {
                        this.color_selected.splice(index, 1);
                    }
                    $(".blue div").css('display', 'none');
                    isSelect_element9 = false;
                } else {
                    $(".blue div").css('display', 'block');
                    this.color_selected.push("blue");
                    isSelect_element9 = true;
                }
            });
        }
        //swipe panel to hiding product detail for descktop
        $("#product_panel").on("swiperight", (e, args) => {
            $('#dropdown3').hide("slide", { direction: "up" }, 300);
            $("#btn_add").css({ "display": "none" });
            $("#product_panel").animate({ "right": '-=' + (w + 50) }, { duration: 500, queue: false });
            $("#ul_wrapper").animate({ "margin-left": x - 14 }, { duration: 500, queue: false });
            $("#result ul").animate({ "margin-top": "100px" }, { duration: 500, queue: false });
            $(".nav-wrapper h3").animate({ "margin-left": "35px", "font-size": "24px" }, { duration: 500, queue: false });
            $(".product_cart #pic").animate({ "width": "200px", "height": "250px" }, { duration: 500, queue: false });
            if ($(window).width() >= 768 && $(window).width() < 1024) {
                $(".product_cart").animate({ "width": "330" }, { duration: 500, queue: false });
                $(".product_cart").animate({ "height": "458" }, { duration: 500, queue: false });
                $(".product_cart #pic").animate({ "margin-left": "13%" }, { duration: 500, queue: false });
                $(".nav-wrapper h3").css({ "font-size": "24px" });
                $("#title p").css({ "font-size": "20px", "text-align": "center" });
                $("#brand label").css({ "font-size": "16px" });
                $("#price label").css({ "font-size": "16px" });
            }
            if ($(window).width() >= 1024) {
                $(".product_cart").animate({ "width": "390" }, { duration: 500, queue: false });
                $(".product_cart").animate({ "height": "458" }, { duration: 500, queue: false });
                $("#title p").css({ "font-size": "24px", "text-align": "center" });
                $("#brand label").css({ "font-size": "19px" });
                $("#price label").css({ "font-size": "19px" });
            }
            $("#result ul li").css({ "display": "inline-block" });
            //scrolling to selected li
            setTimeout(() => this.scrollToSeleced(), 700);
        });

        // back_btn click event in product detail to hiding product detail
        $("#header_prd #back_btn").on("click touch", (e, args) => {
            $('#dropdown3').hide("slide", { direction: "up" }, 300);
            $("#btn_add").css({ "display": "none" });
            $("#product_panel").animate({ "right": '-=' + (w + 50) }, { duration: 500, queue: false });
            $(".nav-wrapper h3").animate({ "margin-left": "35px", "font-size": "24px" }, { duration: 500, queue: false });
            $("#ul_wrapper").animate({ "margin-left": x - 14 }, { duration: 500, queue: false });
            $("#result ul").animate({ "margin-top": "100px" }, { duration: 500, queue: false });
            $(".product_cart #pic").animate({ "width": "200px", "height": "250px" }, { duration: 500, queue: false });
            if ($(window).width() >= 768 && $(window).width() < 1024) {
                $(".product_cart").animate({ "width": "330" }, { duration: 500, queue: false });
                $(".product_cart").animate({ "height": "458" }, { duration: 500, queue: false });
                $(".product_cart #pic").animate({ "margin-left": "13%" }, { duration: 500, queue: false });
                $(".nav-wrapper h3").css({ "font-size": "24px" });
                $("#title p").css({ "font-size": "20px", "text-align": "center" });
                $("#brand label").css({ "font-size": "16px" });
                $("#price label").css({ "font-size": "16px" });
            }
            if ($(window).width() >= 1024) {
                $(".product_cart").animate({ "width": "390" }, { duration: 500, queue: false });
                $(".product_cart").animate({ "height": "458" }, { duration: 500, queue: false });
                $("#title p").css({ "font-size": "24px", "text-align": "center" });
                $("#brand label").css({ "font-size": "19px" });
                $("#price label").css({ "font-size": "19px" });

            }
            $("#result ul li").css({ "display": "inline-block" });
            //scrolling to selected li
            setTimeout(() => this.scrollToSeleced(), 700);
        });
        //mousedown+mousemove event
        //$("#product_panel").mousedown(function (e) {
        //    $(this).mousemove(function (e) {
        //        e.stopPropagation();
        //        //console.log("OK Moved!");
        //    });
        //}).mouseup(function () {
        //    $(this).unbind('mousemove');
        //}).mouseout(function () {
        //    $(this).unbind('mousemove');
        //    });

        //prevent to scroll parent when we are scrolling in product detail panel
        //for descktop
        $('#container').on('mousewheel', (e, args) => {
            //console.log($(e.target).offsetParent().context.offsetParent);
            if ($(e.target).offsetParent().context.offsetParent !== null) {
                //We are not on container div
                if ($(e.target).offsetParent().context.offsetParent.id !== "container") {
                    //We are on children of product_panel 
                    if ($(e.target).offsetParent().context.offsetParent.offsetParent !== null) {
                        if ($(e.target).offsetParent().context.offsetParent.id === "product_panel" ||
                            $(e.target).offsetParent().context.offsetParent.offsetParent.id === "product_panel" ||
                            $(e.target).offsetParent().context.offsetParent.offsetParent.id === "btn_add") {
                            e.preventDefault();
                        }
                    } else {
                        e.preventDefault();
                    }
                }
            } else {//We are on product_panel div
                e.preventDefault();
            }
        });
        //for mobile 
        $('#container').on('touchmove', (e, args) => {
            //console.log($(e.target).offsetParent().context.offsetParent);
            if ($(e.target).offsetParent().context.offsetParent !== null) {
                //We are not on container div
                if ($(e.target).offsetParent().context.offsetParent.id !== "container") {
                    //We are on children of product_panel 
                    if ($(e.target).offsetParent().context.offsetParent.offsetParent !== null) {
                        if ($(e.target).offsetParent().context.offsetParent.id === "product_panel" ||
                            $(e.target).offsetParent().context.offsetParent.offsetParent.id === "product_panel" ||
                            $(e.target).offsetParent().context.offsetParent.offsetParent.id === "btn_add") {
                            e.preventDefault();
                        }
                    } else {
                        e.preventDefault();
                    }
                }
            } else {//We are on product_panel div
                e.preventDefault();
            }
        });
 
        //passing to fitting room
        $("#passer label").on('click touch', (e, args) => {
            if (this.CartService.orderNumber > 0) {
                //$('#btn_filter').css({ "display": "none" });
                $("#btn_add").css({ "display": "none" });
                $('.cart_list').hide("slide", { direction: "up" }, { duration: 700, queue: false });
                $("#product_panel").animate({ "right": '-=' + (w + 50) }, { duration: 700, queue: false });
                $('#ul_wrapper').toggle("slide", { duration: 700, queue: false });
                $('nav').hide("slide", { direction: "up" }, { duration: 700, queue: false });
                //$('#btn_filter').css({ "display": "none" });
                $("#content_essayage").fadeIn("3000");
            }
        });
        // retour Btn
        $(".return").on("click touch", (e, args) => {
            //location.reload();
            //______________________________________________
            $(".nav-wrapper h3").animate({ "margin-left": "35px", "font-size": "24px" }, { duration: 500, queue: false });
            $("#ul_wrapper").css("margin-left", x - 14);
            $("#result ul").css("margin-top", "100px");
            $("#product_panel").css('right', - $("#product_panel").width() - 50);
            $(".product_cart #pic").animate({ "width": "200px", "height": "250px" }, { duration: 500, queue: false });
            if ($(window).width() >= 768 && $(window).width() < 1024) {
                $(".product_cart").css({ "width": "330" });
                $(".product_cart").css({ "height": "458" });
                $(".product_cart #pic").animate({ "margin-left": "13%" }, { duration: 500, queue: false });
                $(".nav-wrapper h3").css({ "font-size": "24px" });
                $("#title p").css({ "font-size": "20px", "text-align": "center" });
                $("#brand label").css({ "font-size": "16px" });
                $("#price label").css({ "font-size": "16px" });
            }
            if ($(window).width() >= 1024) {
                $(".product_cart").css({ "width": "390" });
                $(".product_cart").css({ "height": "458" });
                $("#title p").css({ "font-size": "24px", "text-align": "center" });
                $("#brand label").css({ "font-size": "19px" });
                $("#price label").css({ "font-size": "19px" });

            }
            $("#result ul li").css({ "display": "inline-block" });
            //______________________________________________
            $('#ul_wrapper').css({ "display": "block" });
            $('nav').show("slide", { direction: "up" }, 700);
            //$('#btn_filter').css({ "display": "block" });
            $("#content_essayage").fadeOut("3000");
        });
    }

}
*/
