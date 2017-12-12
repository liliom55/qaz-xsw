import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mesage-box',
  templateUrl: './mesage-box.component.html',
  styleUrls: ['./mesage-box.component.css'],
  inputs: ['message_body','captionBtn']
})
export class MesageBoxComponent implements OnInit {
    message_body = "";
    captionBtn = "";
  constructor() { }

  ngOnInit() {
  }

}
