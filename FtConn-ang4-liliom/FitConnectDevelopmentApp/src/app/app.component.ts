import { Component } from '@angular/core';
//import { MetaformaService } from "../../../FitConnectModule/src/Metaforma.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  /*constructor(private metaformaService: MetaformaService){
    metaformaService.measurementsAdded.subscribe(mes => {
      alert(mes);
      this.title = JSON.stringify(mes)
    });
  }*/

  constructor(){
  }
  
}
