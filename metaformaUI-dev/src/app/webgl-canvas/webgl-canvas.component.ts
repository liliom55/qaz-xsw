import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { WebglService } from "../shared/webgl.service";
import { AvatarService } from "app/shared/avatar.service";

@Component({
  selector: 'app-webgl-canvas',
  templateUrl: './webgl-canvas.component.html',
  styleUrls: ['./webgl-canvas.component.scss']
})
export class WebglCanvasComponent implements OnInit {

  private initialized: boolean;
  constructor(
    private avatar: AvatarService,
    private ref:ChangeDetectorRef) {
      this.initialized = false;
     }

  ngOnInit() {
    //avatar initialization must be in ngOnInit for internet explorer to work
    this.avatar.initialize().subscribe(()=> {
      this.initialized = true;
      this.ref.detectChanges();
    });
  }

  zoomIn() {
    //this.webglService.zoomIn();
  }

  zoomOut() {
    //this.webglService.zoomOut();
  }

  rotateRight() {
    //this.webglService.rotateRight();
  }

  rotateLeft() {
    //this.webglService.rotateLeft();
  }
}
