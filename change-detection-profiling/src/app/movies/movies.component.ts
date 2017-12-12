import { Component, Input, DoCheck, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  // changeDetection: ChangeDetectionStrategy.Default
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesComponent implements DoCheck  {
  @Input() movies;

  ngDoCheck() {
    //// every console.log makes slow the performance of the app
    // console.log("MoviesComponent-DoCheck");
  }

}
