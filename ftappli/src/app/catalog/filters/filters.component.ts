import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  
  public minPriceRange;
  public maxPriceRange;
  public minPriceVal;
  public maxPriceVal;

  constructor() { }

  ngOnInit() {
  }

  checkColor(color: string){
    return false;
  }

}
