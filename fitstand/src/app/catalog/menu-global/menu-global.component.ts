import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {MdDialog} from '@angular/material';


@Component({
  selector: 'app-menu-global',
  templateUrl: './menu-global.component.html',
  styleUrls: ['./menu-global.component.css']
})
export class MenuGlobalComponent implements OnInit {

  @Output() logout = new EventEmitter<void>()

  constructor(private dialog: MdDialog) { }

  ngOnInit() {
  }

  callAssistance() {
    this.dialog.open(AssistanceDialog);
  }

}

@Component({
  selector: 'assistance-dialog',
  template: `
  <div style="text-align:center">
  <h1 md-dialog-title class="stfk_title">Assistance</h1>
  <md-dialog-content>Someone is coming to assist you.</md-dialog-content>
  <md-dialog-actions>	
    <button style="margin:15px auto;" class="stefanka-button-accent" md-button md-dialog-close>Close</button>
  </md-dialog-actions>
  </div>
  		`
  
})
export class AssistanceDialog {}
