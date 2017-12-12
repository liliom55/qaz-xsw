import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DatabaseFireService {

  constructor(private af: AngularFire) { }
  // you have to change the rules in firebase console in firebase.google.com to can read from database
  getAllCuisines() {
    // // not sorted
    // return this.af.database.list('/cuisines');
    // // Sorting by key:
    // return this.af.database.list('/cuisines',{
    //   query: {
    //     orderByKey: true
    //   }
    // });
    // // Sorting by value:
    // return this.af.database.list('/cuisines', {
    //   query: {
    //     orderByValue: true
    //   }
    // });

    // // Filtering:
    // // first you have to add code below to rule of firebase
    // // "cuisines" :{
    // //    ".indexOn":".value"
    // //  }
    return this.af.database.list('/cuisines', {
      query: {
        orderByValue: true,
        equalTo: 'Italian'
      }
    });

  }
  getResturanObject() {
    // // retrieving an object (instead of a list) from firebase:
    return this.af.database.object('/restaurants/1');
  }
  getAllRestaurants() {

    // // not sorted (retrieving a list)
    // return this.af.database.list('/restaurants');
    // // Sorting:
    // // sorted by child:
    // return this.af.database.list('/restaurants', {
    //   query: {
    //     orderByChild: 'name'
    //   }
    // });

    // // sorted by grandchild:
    // return this.af.database.list('/restaurants', {
    //   query: {
    //     orderByChild: 'address/city'
    //   }
    // });
    // // Filtering:https://www.udemy.com/angular2-advanced/learn/v4/t/lecture/6046690?start=0
    // // startAt:3 -> means greater than or equal to 3
    // // startAt:3,endAt:4 -> means between 3 and 4
    // // limitToFirst: 50 -> means only first 50 object
    // // limitToLast: 50 -> means only last 50 object
    return this.af.database.list('/restaurants', {
      query: {
        orderByChild: 'rating',
        equalTo: 5,
        limitToFirst: 50
      }
    });




  }
  // joining cuisine node in resturants object with cuisines object.
  setCuisineType() {
    return this.getAllRestaurants()
      .map(restaurants => {
        // restaurants is an array in this map not observable
        // map method which implemented in array type not observable
        restaurants.map(restaurant => {
          // create a new node (cusineType) for each restaurant at run time
          restaurant.cusineType = this.af.database.object('/cuisines/' + restaurant.cuisine);
        });
        return restaurants;
      });
  }
  setFeature() {
    return this.getAllRestaurants()
      .map(restaurants => {
        // map method which implemented in array type not observable
        restaurants.map(restaurant => {
          restaurant.featureType = [];
          for (let f in restaurant.features) {
            restaurant.featureType.push(this.af.database.object('/features/' + f));
          }
        });
        console.log(restaurants);
        return restaurants;
      });
  }

  // checking existed object
  getExistObj() {
    return this.af.database.object('/restaurants/1/features/1');
  }

  // Multiple updates:https://www.udemy.com/angular2-advanced/learn/v4/t/lecture/6046698?start=0
  updateObj() {
    this.af.database.list('/restaurants').push({ name: '' }).then(x => {
      console.log(x.key);
      let restaurant = { name: 'my new restaurant' };
      let update = {};
      // adding object
      update['restaurants/' + x.key] = restaurant;
      update['restaurants-by-city/camberwell/' + x.key] = restaurant;
      // // removing object
      // update['restaurants/' + x.key] = null;
      // update['restaurants-by-city/camberwell/' + x.key] = null;
      this.af.database.object('/').update(update);
    });
  }
}
