import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var $: any; // for jquery
@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css'],
  inputs: ['title','icon']
})
export class AppBarComponent implements AfterViewInit {
    private title = "";
    private icon = "";
    constructor() {}

  ngOnInit() {
      //alert("ngOnInit");
  }

  ngAfterViewInit() {
      //alert("ngAfterViewInit");
  }
}
