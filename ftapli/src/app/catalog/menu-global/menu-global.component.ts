import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {MatDialog} from '@angular/material';


@Component({
  selector: 'app-menu-global',
  templateUrl: './menu-global.component.html',
  styleUrls: ['./menu-global.component.css']
})
export class MenuGlobalComponent implements OnInit {

  @Output() logout = new EventEmitter<void>()

  constructor(private dialog: MatDialog) { }

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
  <h1 mat-dialog-title class="stfk_title">Assistance</h1>
  <mat-dialog-content translate>Someone is coming to assist you.</mat-dialog-content>
  <mat-dialog-actions>
    <button style="margin:15px auto;" class="stefanka-button-accent" mat-button mat-dialog-close >{{'Close' |translate}}</button>
  </mat-dialog-actions>
  </div>
  		`

})
export class AssistanceDialog {}
