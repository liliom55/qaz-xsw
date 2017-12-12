import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../store';
import { DELETEALLITEM } from '../actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @select('items') itemsList;
  @select('lastUpdate') lastUpdate;
  constructor(private ngRedux: NgRedux<IAppState>) {
  }

  ngOnInit() {
  }
  DeleteAll() {
    this.ngRedux.dispatch({ type: DELETEALLITEM });
  }
}
