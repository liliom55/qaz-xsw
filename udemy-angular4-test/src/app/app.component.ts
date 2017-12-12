import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  contactMethods = [
    { id: 1, name: 'Email' },
    { id: 2, name: 'Email' }
  ];
}
