import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../store';
import { ADDITEM, DELETEITEM, UPDATEITEM } from '../actions';
import { tassign } from 'tassign'; // instead of Object.assign()

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  @select('items') itemsList;
  itemName: string;
  updatedItem;
  id: number;
  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.id = 0;
  }
  addItem() {
    if (!this.itemName) { return; }
    this.id++;
    const item = { name: this.itemName, id: this.id };
    this.ngRedux.dispatch({ type: ADDITEM, param: item });
    this.itemName = '';
  }
  deleteItem(itemId) {
    this.ngRedux.dispatch({ type: DELETEITEM, param: itemId });
  }
  editItem(item) {
    this.itemName = item.name;
    this.updatedItem = tassign(this.updatedItem, item);
    // console.log(this.updatedItem);
  }
  updateItem() {
    this.updatedItem = { name: this.itemName, id: this.updatedItem.id };
    this.ngRedux.dispatch({ type: UPDATEITEM, param: this.updatedItem });
  }
}
