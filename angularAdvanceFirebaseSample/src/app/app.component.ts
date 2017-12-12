import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatabaseFireService } from './database-fire.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  cuisines: Observable<any[]>;
  restaurants: Observable<any[]>;
  resturan;
  exist;
  constructor(private service: DatabaseFireService) {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    // instead of using subscribe :
    // this.service.getAllCuisines().subscribe(x => this.cuisines = x);
    // we used async pipe in template so we don't need to unsubscribe
    // the cuisines and restaurants observable
    this.cuisines = this.service.getAllCuisines();
    this.restaurants = this.service.getAllRestaurants();
    // get restaurents as an object
    // this.service.getResturanObject().subscribe(obj => {
    //   this.resturan = obj;
    //   console.log('resturan', this.resturan);
    // });
    this.resturan = this.service.getResturanObject();


    // this.restaurants = this.service.setCuisineType();
    // this.restaurants = this.service.setFeature();
    this.exist = this.service.getExistObj();
    // take(1): means take observable only once
    this.exist.take(1).subscribe(x => {
      if (x && x.$value) {
        console.log('EXISTED OBJ', x);
        console.log('EXISTS');
      } else {
        console.log('NOT EXIST');
      }
    });
    this.service.updateObj();
  }

}
