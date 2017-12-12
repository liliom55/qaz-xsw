import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProductItemComponent } from '../product-item/product-item.component';

declare var $: any; // for jquery
@Component({
  selector: 'room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css'],
  inputs:["clientName","roomStatus","sugg_prd","sel_prd","prd_sel_list","prd_sugg_list"]
})
export class RoomDetailComponent implements AfterViewInit {
    private clientName = "";
    private roomStatus = "";
    private sugg_prd = "";
    private sel_prd = "";
    private prd_sel_list = [];
    private prd_sugg_list = [];
    
  constructor() { }

  ngOnInit() {
      
  }
  onClickPrd(index) {

  }
  ngAfterViewInit() {
      
          $('.collapsible_header').on('click', (e, args) => {
              if ($(e.currentTarget).parent().find("i").text() == "arrow_drop_down") {
                  $(e.currentTarget).parent().find("i").text("arrow_drop_up");
              } else {
                  $(e.currentTarget).parent().find("i").text("arrow_drop_down");
                  $("product-item").css("background-color", "white");
              }
              $(e.currentTarget).parent().find(".collapsible_body").slideToggle('slow');
      });


  }//ngAfterViewInit
}
