/// <reference path="../app-bar/app-bar.component.ts" />
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppBarComponent } from '../app-bar/app-bar.component';
import { RoomItemComponent } from '../room-item/room-item.component';
import { MesageBoxComponent } from '../mesage-box/mesage-box.component';
import { RoomDetailComponent } from '../room-detail/room-detail.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductsCaptureService } from '../products-capture.service';
import {TranslateService} from 'ng2-translate';


declare var $: any; // for jquery
@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
    //app_bar
    private title_home = "Cabines";
    private icon_home = "menu";
    
    //Room_Item
    private room_status = "";
    private room_index = 0;
    private room_list = [
        { name: "Cabine A", cabin_status: "Libre", ico_status: "done", seller_name: "-", alert_msg: false },
        { name: "Cabine B", cabin_status: "En Cours", ico_status: "sync", seller_name: "Aucun Vendeur", alert_msg: true },
        { name: "Cabine C", cabin_status: "En Cours", ico_status: "sync", seller_name: "Touchez pour liberer", alert_msg: true },
        { name: "Cabine D", cabin_status: "En Cours", ico_status: "done", seller_name: "Touchez pour liberer", alert_msg: true },
        { name: "Cabine E", cabin_status: "En Cours", ico_status: "sync", seller_name: "Seller : John Smith", alert_msg: false },
        { name: "Cabine F", cabin_status: "En Cours", ico_status: "sync", seller_name: "Aucun Vendeur", alert_msg: true },
        { name: "Cabine G", cabin_status: "En Cours", ico_status: "sync", seller_name: "Aucun Vendeur", alert_msg: true },
        
        

        

        


    ];
    private roomSelected_list = [];

    //room detail
    private clientName_ = "John Smith";
    private roomStatus_ = "Choix en cours";
    private sugg_prd_ = 8;
    private sel_prd_ = 3;

    //message box
    message_body_ = "Prendre en charge cette cabine";
    captionBtn_ = "Prendre en charge";

    //product
    private prd_sel_list_ = [];
    private prd_sugg_list_ = [];
    //product details
    private id_prd_ = "";
    private sku_prd_ = "";
    private name_prd_ = "";
    private price_prd_ = "";
    private color_prd_ = [];
    private large_picture_prd_ = "";
    private small_picture_prd_ = "";
    private brand_prd_ = "";
    private cut_prd_ = "";
    private size_prd_ = "";
    private fabric_prd_ = ""
    private feature_prd_ = [];
    private sleeve_prd_ = "";
    private versionId_prd_ = "";
    //-----------------------------------------------------
    private currentRoom = "";
    private currentLang = "en";
    //----------------------------------------

    constructor(private productCapture: ProductsCaptureService, private translate: TranslateService) {
        this.prd_sugg_list_ = this.productCapture.suggestedProduct();
        this.prd_sel_list_ = this.productCapture.selectedProduct();

        //translating
        translate.addLangs(["en", "fr"]);
        translate.setDefaultLang('en');
        //let browserLang = translate.getBrowserLang();
        //translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
        
        translate.use('en');
        this.currentLang = "en";


    }

    ngOnInit() {
    }
    // room items click--------------------------------------------------------
    private onClickRoom(index, e) {
        //console.log($(e.currentTarget).index());
        this.room_index = index;
        //e.currentTarget = room-item
        //console.log($(e.currentTarget).parent("li").index());  // gets the index of selected element
        //console.log($(e.currentTarget).find("#sellerName_div label").text()); // gets the content of sellerName_div

        //if the seller's name title is "Touchez pour liberer"
        if (
            $(e.currentTarget).find("#sellerName_div label").text() == "Touchez pour liberer" 
            || $(e.currentTarget).find("#sellerName_div label").text() == "Press to free" 
        ) {
            $(e.currentTarget).find("#status_div").animate({ height: '-=32px' }, 300);
            $(e.currentTarget).find("#status_div").animate({ height: '+=32px' }, 300);
            
            setTimeout(this.selectRoom(index), 300);
        }

        //if the seller's name title is "Aucun vendeur"
        if ($(e.currentTarget).find("#sellerName_div label").text() == "Aucun Vendeur"
            || $(e.currentTarget).find("#sellerName_div label").text() == "No Seller") {
            $("#grayCover").fadeIn("slow");
            $("mesage-box").fadeIn("slow");
        }
        //if the seller's name title is some one 
        if (($(e.currentTarget).find("#sellerName_div label").text() != "Aucun Vendeur" && 
            $(e.currentTarget).find("#sellerName_div label").text() != "No Seller")
            &&
            ($(e.currentTarget).find("#sellerName_div label").text() != "Touchez pour liberer" &&
            $(e.currentTarget).find("#sellerName_div label").text() != "Press to free")
            &&
            ($(e.currentTarget).find("#sellerName_div label").text() != "S�lection Termin�e" &&
                $(e.currentTarget).find("#sellerName_div label").text() != "Selection Finished"
            )
            && $(e.currentTarget).find("#sellerName_div label").text() != "-") {
            this.title_home = $(e.currentTarget).find("#cabinName_div label").text();
            this.currentRoom = $(e.currentTarget).find("#cabinName_div label").text();
            this.icon_home = "clear";

            //changing the behavior of menu button in app-bar when the menu icon is "X"
            if ($(window).width() < 991) {
                $('.button-collapse').sideNav('destroy');
            } else {
                //showing X button for large screen
                $("#back_btn").css("display", "block");
            }

            $("#room_selected").css("display", "none");
            $("#roomItem").fadeOut("fast", function () {
                $(".collapsible_body").css("display", "none"); // closes all accardeon menu in room detail
                $("room-detail").fadeIn("slow");
            });
        }
    }

    private selectRoom(index) {
        //alert(index);
        if (this.room_list[index].seller_name == "Touchez pour liberer" ||
            this.room_list[index].seller_name == "Press to free") {
            this.room_list[index].cabin_status = "Libre";
            this.room_list[index].ico_status = "done";
            this.room_list[index].seller_name = "-";
            this.room_list[index].alert_msg = false;

        }

    }
   

    private chargingRoom(index) {


    }
    ngAfterViewInit() {
         //puts a div in the center of screen
        function setPosition(div_name) {
            //Dimention
            //var w = $(window).width() * (3 / 5);
            //var h = $(window).height() * (3 / 5);
            //$(div_name).css('width', w);
            //$(div_name).css('height', h);

            //Position
            var x = ($(window).width() - $(div_name).width()) / 2;
            var y = ($(window).height() - $(div_name).height()) / 2;

            $(div_name).css('left', x);
            $(div_name).css('top', y - 50);
            $("#home_container").css({ "position":"fixed","top": "0", "right": "0", "bottom": "0", "left": "0" })

        }

        // Rotating the screen
        $(window).on("orientationchange", function (event) {
            location.reload();
        });

        //Resizing the screen
        $(window).resize(function () {
            location.reload();
        });

        setPosition("mesage-box");// #content_login div
        fixedSileNav(); // for large screen mode
        //  make fixe the side nav in resolution larger than 991px 
        function fixedSileNav() {
            $("#grayCover").css("display", "none");
            $("#back_btn").css("display", "none"); // set the X button by default hidden
            if ($(window).width() >= 991) {
                $('.button-collapse').sideNav('show');
                $("#slide-out").addClass('fixed');
                $("#home_container").css("padding-left", $("#slide-out").width());
                $("#grayCover").css("display", "none");
                $(".button-collapse").css("display", "none");
                


            } else {
                $('.button-collapse').sideNav('hide');
                $("#slide-out").removeClass('fixed');
                $("#home_container").css("padding-left", "0");
                //$("#grayCover").css("display", "block");
                $(".button-collapse").css("display", "block");
                
            }
        }
        // gray panel for message box
        $("#grayCover").add("#cancel_btn").on('click', (e, args) => {
            $("#grayCover").fadeOut("fast");
            $("mesage-box").fadeOut("fast");
        });
        //gray panel for side nav bar
        $("#grayCover_nav").add("#cancel_btn").on('click', (e, args) => {
            $("#grayCover_nav").fadeOut("fast");
            if ($(window).width() < 991) {
                $('.button-collapse').sideNav('hide');
            }
        });


        // button event in message box 
        $("#doSomeThing_btn").on('click', (e, args) => {

            $("#grayCover").fadeOut("fast");
            $("mesage-box").fadeOut("fast");

            this.roomSelected_list.push({ name: this.room_list[this.room_index].name, cabin_status: "En Cours", ico_status: "sync", seller_name: "Seller : Thomas Jackson", alert_msg: false });
            this.room_list.splice(this.room_index, 1);
        });
        // side nav events for working well side nav of materialize in materialize.min.css file 
        // #sidenav-overlay {display:none} & .drag-target {diplay:none} and adding code below
        $(".side-nav").on('click', (e, args) => {
            if ($(window).width() < 991) {
                $('.button-collapse').sideNav('hide');
                $("#grayCover_nav").fadeOut("fast");
            }
        });

        // menu icon in app-bar/nav-bar 
        $("#nav_bar i").on('click', (e, args) => {
            
            if ($(window).width() < 991) {
                //if the menu icon is "X" back to the main view
                if ($(e.currentTarget).text() == "clear") {
                    //if we are in cabine view
                    if ($("#title label").text().indexOf('Cabine') > -1 ||
                        $("#title label").text().indexOf('Fitting Room') > -1) {

                        this.title_home = "Cabines";
                        this.icon_home = "menu";
                        $("room-detail").fadeOut("fast", function () {
                            $("#roomItem").fadeIn("slow");
                            $("#room_selected").fadeIn("slow");
                        });
                    } else {
                        //if we are in product view
                        this.title_home = this.currentRoom;
                        this.icon_home = "clear";
                        $("product-detail").fadeOut("fast", function () {
                            $("room-detail").fadeIn("slow");
                            //$("#room_selected").fadeIn("slow");
                        });
                    }

                } else
                {
                    //enable again to showing sideNav
                    $(".button-collapse").sideNav({
                        menuWidth: 300, // Default is 300
                        edge: 'left', // Choose the horizontal origin
                        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
                        draggable: true // Choose whether you can drag to open on touch screens
                    });
                    $('.button-collapse').sideNav('show');
                    $("#grayCover_nav").fadeIn("slow");
                }
            }
        });
        // X button in app-bar/nav-bar for large screen mode
        $("#back_btn").on('click', (e, args) => {
            if ($("#title label").text().indexOf('Cabine') > -1 ||
                $("#title label").text().indexOf('Fitting Room') > -1) {
                this.title_home = "Cabines";
                this.icon_home = "menu";
                $("room-detail").fadeOut("fast", function () {
                    $("#back_btn").css("display","none")
                    $("#roomItem").fadeIn("slow");
                    $("#room_selected").fadeIn("slow");
                });
            } else {
                //if we are in product view
                this.title_home = this.currentRoom;
                this.icon_home = "clear";
                $("product-detail").fadeOut("fast", function () {
                    $("room-detail").fadeIn("slow");
                    //$("#room_selected").fadeIn("slow");
                });
            }
        });

        //product item / showing product detail
        $("product-item").on('click', (e, args) => {
            //console.log($(e.currentTarget).parent("li").index());
            //console.log($(e.currentTarget).closest("ul").attr("id")); //get the id of the parent's parent
            var index_prd = $(e.currentTarget).parent("li").index();
            $("product-item").css("background-color", "white");
            $(e.currentTarget).css("background-color", "#DFDDDD");
            var currentType = [];
            if ($(e.currentTarget).closest("ul").attr("id") == "suggPrd_ul") {
                currentType = this.prd_sugg_list_;
            }
            if ($(e.currentTarget).closest("ul").attr("id") == "selPed_ul") {
                currentType = this.prd_sel_list_;
            }
            this.id_prd_ = currentType[index_prd].id;
            this.sku_prd_ = currentType[index_prd].sku;
            this.name_prd_ = currentType[index_prd].name;
            this.price_prd_ = currentType[index_prd].price;
            this.color_prd_ = currentType[index_prd].color;
            this.large_picture_prd_ = currentType[index_prd].large_picture;
            this.small_picture_prd_ = currentType[index_prd].small_picture;
            this.brand_prd_ = currentType[index_prd].brand;
            this.cut_prd_ = currentType[index_prd].cut;
            this.size_prd_ = currentType[index_prd].size;
            this.fabric_prd_ = currentType[index_prd].fabric;
            this.feature_prd_ = currentType[index_prd].feature;
            this.sleeve_prd_ = currentType[index_prd].sleeve;
            this.versionId_prd_ = currentType[index_prd].versionId;


            this.title_home = this.name_prd_;
            this.icon_home = "clear";

            //changing the behavior of menu button in app-bar when the menu icon is "X"
            if ($(window).width() < 991) {
                $('.button-collapse').sideNav('destroy');
            }

            //$("#room_selected").css("display", "none");
            $("room-detail").fadeOut("fast", function () {
                $("#home_container").scrollTop(0);
                $("product-detail").fadeIn("slow");
            });
        });
        //--------------------------------------
        
        //$('#body_container').on('touchmove', function (e) {
        //    //alert(this.scrollTop);
        //    //e.stopPropagation();
        //    if ((this.scrollTop !=  0)) {
        //        e.stopPropagation();
        //    }
        //    //e.preventDefault();
        // });
        
        //$(document).on('touchmove', function (e) {
             
        //    //alert($('#body_container').scrollTop());
        //    if (($('#body_container').scrollTop() != 0)) {
        //        e.stopPropagation();
        //    } else {
        //        e.preventDefault();
        //    }
        //});
        // Initialize collapse button / showing sideNav
        $(".button-collapse").sideNav({
            menuWidth: 300, // Default is 300
            edge: 'left', // Choose the horizontal origin
            closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
            draggable: true // Choose whether you can drag to open on touch screens
        });
        
    }
}
