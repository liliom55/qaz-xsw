import { Component, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { ThreeService } from '../three.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private _service: ThreeService) { }

  ngOnInit() {
    this._service.init();
    this._service.animate();
  }
  ngAfterViewInit() {
  }
  @HostListener('window:mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    this._service.onDoumentMouseMove(event);
  }
  @HostListener('window:resize', ['$event'])
  onresize() {
    this._service.onWindowResize();
  }
}
