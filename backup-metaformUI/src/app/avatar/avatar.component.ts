import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Product } from '../shared/product-model';
import { ProductSelectionService } from '../product-detail/product-selection.service';
import { MeasurementFormService } from '../measurement-form/measurement-form.service';
import { Measurement, FormMeasure } from '../shared/measure-model';

import {
  PerspectiveCamera, Scene, Color, WebGLRenderer, Loader, Fog, AmbientLight, DirectionalLight,
  HemisphereLight
} from 'three';
import { MTLLoader } from '../../three/MTLLoader';
import { OBJLoader } from '../../three/OBJLoader';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit, AfterViewInit {

  measurements: FormMeasure;
  selectedProducts: Product[] = [];
  threshold: Object = { neck: 15, chest: 40.50, waist: 40, hip: 40 };
  size: string;

  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  container: HTMLElement;
  controls;

  avatar;

  pathToAvatars: string = '../../assets/avatars/';

  mouseX: number = 0;
  mouseY: number = 0;


  constructor(private productSelection: ProductSelectionService, private measurementFormService: MeasurementFormService) { }

  ngOnInit() {
    this.productSelection.productSelection$.subscribe(product => this.updateAvatar(JSON.parse(product) as Product));
    this.measurementFormService.measurement$.subscribe(measurements => this.match(JSON.parse(measurements) as FormMeasure));
    this.setScene();
  }


  ngAfterViewInit() {
    this.container = document.getElementById("avatar-container");
    this.setCamera();
    this.setRenderer();
    this.container.appendChild(this.renderer.domElement);
    this.loadAvatar('base');
    this.animate();
  }
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    switch (event.keyCode) {
      case 37:
        this.move('left');
        break;
      case 39:
        this.move('right');
        break;
      case 38:
        this.zoom('in');
        break;
      case 40:
        this.zoom('out');
        break;
    }
  }

  setCamera() {
    this.camera = new PerspectiveCamera(55, (this.container.offsetWidth) / (this.container.offsetHeight), 0.1, 1000);
    //this.camera = new PerspectiveCamera( 45, (window.innerWidth * 0.6) / (window.innerHeight * 0.7), 1, 2000 );
    this.camera.position.z = 50;
  }

  setScene() {

    this.scene = new Scene();
    this.scene.background = new Color('#e1e1e1');
    this.scene.fog = new Fog(0xffffff, 1, 5000);
    this.scene.fog.color.setHSL(0.6, 0, 1);

    let ambient = new AmbientLight(0x444444);
    this.scene.add(ambient);

    let directionalLight = new DirectionalLight(0xffeedd);
    directionalLight.position.set(0, 1, 1).normalize();
    this.scene.add(directionalLight);

  }

  setLight() {
    let hemiLight = new HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 500, 0);
  }

  setRenderer() {
    this.renderer = new WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    //this.renderer.setSize( window.innerWidth * 0.60, window.innerHeight * 0.80 );
    this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
  }

  updateAvatar(product: Product) {
    this.selectedProducts.push(product);
    this.loadAvatar(this.size);

  }

  loadAvatar(avatarName: string) {
    console.log(this.size);
    var onProgress = function (xhr?) {
    };
    //Loader.Handlers.add( /\.dds$/i, new DDSLoader() );
    let mtlLoader = new MTLLoader();
    mtlLoader.setPath(this.pathToAvatars);
    mtlLoader.load(`${avatarName}.mtl`, materials => {
      materials.preload();
      let objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.setPath(this.pathToAvatars);

      objLoader.load(`${avatarName}.obj`, avatar => {
        if (this.avatar) this.scene.remove(this.avatar);
        this.avatar = avatar;
        console.log(avatar);
        this.avatar.position.y = -95;
        this.avatar.position.z = -170;
        this.scene.add(this.avatar);
        this.animate();
      }, onProgress, (xhr) => console.log(xhr))

    },
      onProgress(),
      (xhr) => console.log(`Error: ${xhr}`));

  }

  match(measurements: FormMeasure) {
    this.measurements = measurements;
    for (let measurement in measurements) {
      if (this.threshold.hasOwnProperty(measurement)) {
        if (measurements[measurement] > this.threshold[measurement]) {
          console.log(measurement);
          this.size = 'large';
          return;
        }
      }
    }
    this.size = 'medium';
  }

  animate() {
    //window.requestAnimationFrame( this.animate );
    this.render();
  }

  render() {
    //this.camera.position.x += ( this.mouseX - this.camera.position.x ) * .05;
    //this.camera.position.y += ( - this.mouseY - this.camera.position.y ) * .05;
    //this.camera.lookAt( this.scene.position );
    window.requestAnimationFrame(_ => this.animate());
    this.renderer.render(this.scene, this.camera);
  }
  preValZoom = 0;
  preValRotate = 0;
  currentZoomVal = 1;
  currentRotateVal = 0.4;
  zoomrange(val) {
    this.currentZoomVal = val;
    if (this.currentZoomVal > this.preValZoom) {
      this.zoom('in');
    } else {
      this.zoom('out');
    }
    this.preValZoom = this.currentZoomVal;
  }
  zoom(movement) {
    switch (movement) {
      case 'in':
        if (this.currentZoomVal < 9) {
          this.currentZoomVal += 0.1;
          this.camera.zoom = this.currentZoomVal;
          console.log('camera', this.camera.zoom);
          console.log('currentZoomVal', this.currentZoomVal);
          this.camera.updateProjectionMatrix();
          this.render();
        }
        break;
      case 'out':
        if (this.currentZoomVal > 1) {
          this.currentZoomVal -= 0.1;
          this.camera.zoom = this.currentZoomVal;
          console.log('camera', this.camera.zoom);
          console.log('currentZoomVal', this.currentZoomVal);
          this.camera.updateProjectionMatrix();
          this.render();
        }
        break;
    }
  }
  rotaterange(val) {
    this.currentRotateVal = val;
    if (this.currentRotateVal > this.preValRotate) {
      this.move('right');
    } else {
      this.move('left');
    }
    this.preValRotate = this.currentRotateVal;
  }
  move(movement) {
    var r = 0.4;
    var t = 5;
    switch (movement) {
      case 'right':
        this.currentRotateVal += 0.4;
        this.avatar.rotateY(r);
        break;
      case 'left':
        this.currentRotateVal -= 0.4;
        this.avatar.rotateY(-r);
        break;
      case 'up':
        this.avatar.translateY(-t);
        break;
      case 'down':
        this.avatar.translateY(t);
        break;
    }
    this.render();

  }



}
