import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
//import { ProductModel } from '../productModel';
import { AddToCartService } from '../add-to-cart.service';
import { CartListComponent } from '../cart-list/cart-list.component';


declare var $: any; // for jquery
@Component({
    selector: 'product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css'],
    inputs: ['prdId','prdPicUrl', 'prdName', 'PrdBrand', 'prdQuant', 'prdPrice', 'prdDesc', 'prdSize', 'prdFeatures', 'prdColor','prdSku','prdCut','prdFabric','prdSleeve','prdVersionId']

})
export class ProductDetailComponent implements AfterViewInit {
    //filter color
    //@ViewChild('black2') black2: ElementRef;
    //@ViewChild('lightblue2') lightblue2: ElementRef;
    //@ViewChild('purple2') purple2: ElementRef;
    //@ViewChild('redpurple2') redpurple2: ElementRef;
    //@ViewChild('greenblue2') greenblue2: ElementRef;
    //@ViewChild('red2') red2: ElementRef;
    //@ViewChild('beige2') beige2: ElementRef;
    //@ViewChild('pink2') pink2: ElementRef;
    //@ViewChild('blue2') blue2: ElementRef;

    @ViewChild('back_btn') back_btn: ElementRef;
    
    

    @ViewChild('cart') cart: ElementRef;
    @ViewChild('btnAdd') btnAdd: ElementRef;
    
    //input variable declaration
    private prdId = "";
    private prdPicUrl = "";
    private prdName = "";
    private PrdBrand = "";
    private prdQuant = 0;
    private prdPrice = "";
    private prdDesc = "";
    private prdSize = "";
    private prdFeatures = [];
    private prdColor = [];
    private prdCartList = [];
    private prdSku = "";
    private prdCut = "";
    private prdFabric = "";
    private prdSleeve = "";
    private prdVersionId = "";

    private color = "";
    

    //color_prd = ["black", "lightblue", "purple", "redpurple", "greenblue", "red", "beige", "pink", "blue"];
    //private color_selected = "";
    //private prevSelElement = this.prdColor;
    constructor(private addTocartService: AddToCartService) {
        //this.color_selected = this.prdColor;
        this.prdCartList = addTocartService.listCartProduct;
        
    }

    //checks if the the color is exist in array or not : for showing or hiding the colors
    //check_color2(color) {
    //    return this.color_prd.indexOf(color) > -1;
    //}

    onClickColor(idx) {
        this.prdPicUrl = this.prdColor[idx].large_image;

    }
    addToCart() {
        this.addTocartService.addToCart(this.prdId, this.prdSku, this.prdName, this.prdPrice, this.prdColor, this.prdPicUrl, this.prdPicUrl, this.PrdBrand, this.prdCut, this.prdSize, this.prdFabric, this.prdFeatures, this.prdSleeve, this.prdVersionId);

    }
    openDropdown3() {
        $('#dropdown3').toggle("slide", { direction: "up" }, 300);

    }
    
    ngAfterViewInit() {
        
        //open cart panel
        $(this.cart.nativeElement).on('click touch', (e, args) => {
            e.stopPropagation();
            //if (this.addTocartService.listCartProduct.length > 0) {
                $('.cart_list').show("slide", { direction: "up" }, 700);
            //}

        });
        
        //// for filtering color
        //var first_click = true;
        ////select and deselect colors
        //if (this.check_color2("black")) {
        //    $(this.black2.nativeElement).on('click', (e, args) => {
        //        if (first_click) {
        //            set_invisible();
        //        }
        //        $(this.prevSelElement).css('display', 'none');
        //        this.prevSelElement = ".black2 div";
        //        this.color_selected = "black";
        //        $(".black2 div").css('display', 'block');



        //    });
        //}
        //if (this.check_color2("lightblue")) {
        //    $(this.lightblue2.nativeElement).on('click', (e, args) => {
        //        if (first_click) {
        //            set_invisible();
        //        }
        //        $(this.prevSelElement).css('display', 'none');
        //        this.prevSelElement = ".lightblue2 div";
        //        this.color_selected = "lightblue";
        //        $(".lightblue2 div").css('display', 'block');



        //    });
        //}
        //if (this.check_color2("purple")) {
        //    $(this.purple2.nativeElement).on('click', (e, args) => {
        //        if (first_click) {
        //            set_invisible();
        //        }
        //        $(this.prevSelElement).css('display', 'none');
        //        this.prevSelElement = ".purple2 div";
        //        this.color_selected = "purple";
        //        $(".purple2 div").css('display', 'block');
        //    });
        //}
        //if (this.check_color2("redpurple")) {
        //    $(this.redpurple2.nativeElement).on('click', (e, args) => {
        //        if (first_click) {
        //            set_invisible();
        //        }
        //        $(this.prevSelElement).css('display', 'none');
        //        this.prevSelElement = ".redpurple2 div";
        //        this.color_selected = "redpurple";
        //        $(".redpurple2 div").css('display', 'block');
        //    });
        //}
        //if (this.check_color2("greenblue")) {
        //    $(this.greenblue2.nativeElement).on('click', (e, args) => {
        //        if (first_click) {
        //            set_invisible();
        //        }
        //        $(this.prevSelElement).css('display', 'none');
        //        this.prevSelElement = ".greenblue2 div";
        //        this.color_selected = "greenblue";
        //        $(".greenblue2 div").css('display', 'block');
        //    });
        //}
        //if (this.check_color2("red")) {
        //    $(this.red2.nativeElement).on('click', (e, args) => {
        //        if (first_click) {
        //            set_invisible();
        //        }
        //        $(this.prevSelElement).css('display', 'none');
        //        this.prevSelElement = ".red2 div";
        //        this.color_selected = "red";
        //        $(".red2 div").css('display', 'block');
        //    });
        //}
        //if (this.check_color2("beige")) {
        //    $(this.beige2.nativeElement).on('click', (e, args) => {
        //        if (first_click) {
        //            set_invisible();
        //        }
        //        $(this.prevSelElement).css('display', 'none');
        //        this.prevSelElement = ".beige2 div";
        //        this.color_selected = "beige";
        //        $(".beige2 div").css('display', 'block');
        //    });
        //}
        //if (this.check_color2("pink")) {
        //    $(this.pink2.nativeElement).on('click', (e, args) => {
        //        if (first_click) {
        //            set_invisible();
        //        }
        //        $(this.prevSelElement).css('display', 'none');
        //        this.prevSelElement = ".pink2 div";
        //        this.color_selected = "pink";
        //        $(".pink2 div").css('display', 'block');
        //    });
        //}
        //if (this.check_color2("blue")) {
        //    $(this.blue2.nativeElement).on('click', (e, args) => {
        //        if (first_click) {
        //            set_invisible();
        //        }
        //        $(this.prevSelElement).css('display', 'none');
        //        this.prevSelElement = ".blue2 div";
        //        this.color_selected = "blue";
        //        $(".blue2 div").css('display', 'block');
        //    });
        //}
    }
}
