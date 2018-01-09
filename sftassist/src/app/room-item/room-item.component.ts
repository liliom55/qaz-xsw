import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.css'],
  inputs: ['cabin_status', 'ico_status', 'cabin_name_first', 'cabin_name_second', 'seller_name','alert_msg']
})
export class RoomItemComponent implements OnInit {
    private cabin_status = ""; //libre , Termine
    private ico_status = "";  //done
    private cabin_name_first = "";
    private cabin_name_second = "";
    private seller_name = "";
    private alert_msg = false;
    constructor() {
    }

  ngOnInit() {
  }
  private getStyle(cabin_status) {
      if (cabin_status !== "Libre" && cabin_status !== "Free") {
          return "pointer";
      } else {
          return "default";
      }
  }
}
