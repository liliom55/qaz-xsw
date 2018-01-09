import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ArrayformService } from './arrayform.service';
@Component({
  selector: 'app-array-form',
  templateUrl: './array-form.component.html',
  styleUrls: ['./array-form.component.css']
})
export class ArrayFormComponent implements OnInit {
  form: FormGroup;
  constructor(public formService: ArrayformService) { }

  ngOnInit() {
    this.form = this.formService.initialForm();
  }
  addTopic(topic: HTMLInputElement) {
    console.log(topic);
    this.formService.topics.push(new FormControl(topic.value));
    topic.value = '';
  }
  removeTopic(topic: FormControl) {
    const index = this.formService.topics.controls.indexOf(topic);
    this.formService.topics.removeAt(index);
  }
}
