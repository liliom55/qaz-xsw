import { Component, OnInit } from '@angular/core';
import { HomeRoutingService } from '../home-routing/home-routing.service';


@Component({
  selector: 'app-scan-instruction',
  templateUrl: './scan-instruction.component.html',
  styleUrls: ['./scan-instruction.component.css']
})
export class ScanInstructionComponent implements OnInit {

  constructor( private homeRoutingService: HomeRoutingService ) { }

  private step: number = 1;

  ngOnInit() {
  }

  next() {
    this.homeRoutingService.next(this.constructor.name);
  }

  nextStep() {
    this.step += 1;
  }

}
