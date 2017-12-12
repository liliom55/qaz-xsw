import { Component, DoCheck } from '@angular/core';
import { Map, List } from 'immutable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = 'Hello World';
  movies; //immutable

  constructor() {
    let movies_temp = [];
    for (var i = 0; i < 10000; i++) {
      //// bad practice
      ////(this.movies is used directly in template so slow performance happens)
      // this.movies.push({
      //   title: 'm ' + i,
      //   prop1: 1,
      //   prop2: 1,
      //   prop3: 1,
      //   prop4: 1,
      //   prop5: 1,
      //   prop6: 1,
      //   prop7: 1,
      //   prop8: 1,
      //   prop9: 1,
      //   prop10: 1,
      // });
      //// god practice :
      movies_temp.push({
        title: 'm ' + i,
        prop1: 1,
        prop2: 1,
        prop3: 1,
        prop4: 1,
        prop5: 1,
        prop6: 1,
        prop7: 1,
        prop8: 1,
        prop9: 1,
        prop10: 1,
      });
    }
    this.movies = List(movies_temp); //
  }

  changeTitle() {
    this.title = 'UPDATED TITLE';
  }

  ngDoCheck() {
    // console.log("AppComponent-DoCheck");
  }

  onClick() {
    var movie = this.movies[0];
    this.movies[0] = movie.set('title', 'UPDATED');
  }
}
