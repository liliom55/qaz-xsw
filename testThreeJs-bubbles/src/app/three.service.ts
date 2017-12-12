import { Injectable } from '@angular/core';
import * as THREE from 'three';
// import '../assets/js/FresnelShader.js';
// import { Detector } from 'detector';
declare const require: any;
@Injectable()
export class ThreeService {
  container;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  mesh: THREE.Mesh;
  // zmesh;
  lightMesh;
  geometry;
  spheres = [];
  directionalLight;
  pointLight;
  mouseX = 0; mouseY = 0;
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  THREESHADER;
  constructor() {
  }

  // checkDetector() {

  //   if (!Detector.webgl) { Detector.addGetWebGLMessage(); }
  // }

  init() {
    this.container = document.createElement('div');
    document.body.appendChild(this.container);

    // Camera
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 5000);
    this.camera.position.z = 3200;

    // texture cube

    const path = '../assets/texture/cube/';
    const format = '.jpg';
    const urls = [
      path + 'posx' + format, path + 'negx' + format,
      path + 'posy' + format, path + 'negy' + format,
      path + 'posz' + format, path + 'negz' + format
    ];

    const textureCube = new THREE.CubeTextureLoader().load(urls);

    this.scene = new THREE.Scene();
    this.scene.background = textureCube;

    // sphares
    this.geometry = new THREE.SphereGeometry(100, 32, 16);
    // this.THREESHADER = require('../assets/js/FresnelShader.js');
    const shader = THREE.ShaderLib['cube'];  // this.THREESHADER.THREE.FresnelShader;
    const uniforms = THREE.UniformsUtils.clone(shader.uniforms);
    // uniforms['tCube'].value = textureCube;
    const material = new THREE.ShaderMaterial({
      fragmentShader: shader.fragmentShader,
      vertexShader: shader.vertexShader,
      uniforms: shader.uniforms,
      side: THREE.BackSide
    });



    for (let i = 0; i < 500; i++) {
      this.mesh = new THREE.Mesh(this.geometry, material);
      this.mesh.position.x = Math.random() * 10000 - 5000;
      this.mesh.position.y = Math.random() * 10000 - 5000;
      this.mesh.position.z = Math.random() * 10000 - 5000;
      this.mesh.scale.x = this.mesh.scale.y = this.mesh.scale.z = Math.random() * 3 + 1;
      this.scene.add(this.mesh);
      this.spheres.push(this.mesh);
    }



    //
    this.scene.matrixAutoUpdate = false;

    this.renderer = new THREE.WebGLRenderer({ antialias: false });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);

  }
  onWindowResize() {
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  onDoumentMouseMove(event) {
    this.mouseX = (event.clientX - this.windowHalfX) * 10;
    this.mouseY = (event.clientY - this.windowHalfY) * 10;
  }

  animate() {
    window.requestAnimationFrame(_ => this.animate());

    this.render();
  }
  render() {
    this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05;
    this.camera.position.y += (this.mouseY - this.camera.position.y) * 0.05;
    this.camera.lookAt(this.scene.position);
    const timer = 0.0001 * Date.now();
    for (let i = 0, il = this.spheres.length; i < il; i++) {
      const sphere = this.spheres[i];
      sphere.position.x = 5000 * Math.cos(timer + i);
      sphere.position.y = 5000 * Math.sin(timer + i * 1.1);
    }

    this.renderer.render(this.scene, this.camera);
  }
}
