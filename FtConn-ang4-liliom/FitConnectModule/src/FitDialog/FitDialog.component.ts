
import { fitEnvironment } from "./../environments/fitEnvironment";
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FitMediatorComponent } from './../FitMediator/FitMediator.component';
import { MetaformaService } from './../Metaforma.service';
import { StoreService } from "./../StoreService.interface";
import { MdIconRegistry, MdDialogRef } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { TranslateService } from 'ng2-translate';
import { UnitConversionService } from './unit-conversion.service';

declare var math: any;
var myEnvironment = fitEnvironment;

@Component({
  selector: 'fit-dialog',
  templateUrl: './' + myEnvironment.store.html,
  styleUrls: ['./' + myEnvironment.store.css],
  encapsulation: ViewEncapsulation.None,
  providers: [UnitConversionService, { provide: StoreService, useClass: myEnvironment.store }]
})
export class FitDialogComponent implements OnInit {
  selectedTab: number;
  sex: string;
  preferencesForm: FormGroup;
  basicInfosForm: FormGroup;
  bodyShape: any = {};
  measurementsForm: FormGroup;
  logoUrl: string;
  public myModel = '';

  constructor(public dialogRef: MdDialogRef<FitDialogComponent>,
    private store: StoreService, private mediator: FitMediatorComponent,
    private iconRegistry: MdIconRegistry, private sanitizer: DomSanitizer,
    private translate: TranslateService, private UnitConversionService: UnitConversionService) {

    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('en');
    this.measurementsForm = this.toFormGroup(this.store.measurements);
    this.preferencesForm = this.toFormGroup(this.store.preferences);
    this.basicInfosForm = this.toFormGroup(this.store.profile);
    this.store.profile.forEach(basicInfo => {
      this.iconRegistry.addSvgIcon(
        basicInfo.svgIcon,
        this.sanitizer.bypassSecurityTrustResourceUrl(basicInfo.imgUrl));
    });
    this.selectedTab = 0;
  }

  ngOnInit() {
    this.logoUrl = myEnvironment.store.logo;
  }

  submitMeasurements() {
    let measurements = this.store.measurements.concat(this.store.profile);
    let bodySpecs: Map<string, any> = new Map<string, any>();
    bodySpecs['sex'] = this.sex;
    bodySpecs['measurements'] = measurements;
    bodySpecs['shapes'] = this.bodyShape.shapes;
    bodySpecs['preferences'] = this.store.preferences;
    this.store.submitMeasurements(bodySpecs);
    this.dialogRef.close('Hey! rapelle toi que tu peux venir changer tes mesure n\'importe quand ici!');
  }

  notify(msg) {
    this.mediator.notify(msg);
  }

  setSex(sex) {
    this.sex = sex;
    this.goNext();
  }

  goNext() {
    this.selectedTab = this.selectedTab + 1;
    let colorBorder = this.store.steps[this.selectedTab].borderColor;
    document.getElementsByTagName('fit-dialog')[0].parentElement.style.borderColor = colorBorder;
    if(this.selectedTab===3){
      setTimeout(()=>this.goNext(),3000);
    }
  }

  goBack() {
    this.selectedTab = this.selectedTab - 1;
    let colorBorder = this.store.steps[this.selectedTab].borderColor;
    document.getElementsByTagName('fit-dialog')[0].parentElement.style.borderColor = colorBorder;
  }
  closeDialogBox() {
    this.dialogRef.close('');
  }

  goTo(index) {
    this.selectedTab = index;
  }

  private toFormGroup(array: Array<any>) {
    let group: any = {};

    array.forEach(element => {
      group[element.name] = element.required ? new FormControl(element.value || '', Validators.required)
        : new FormControl(element.value || '');
    });
    return new FormGroup(group);
  }

  getInputPlacerholder(form, bodySpec) {
    let formControl = form.controls[bodySpec.name];
    if (formControl && formControl.errors) {
      if (formControl.errors.min) return 'Minimum de ' + bodySpec.min;
      if (formControl.errors.max) return 'Maximum de ' + bodySpec.max;
    }
    return bodySpec.name;
  }

  // Boolean check to switch between the 2 formats of unit display
  changeUnits() {
    this.UnitConversionService.changeUnits();
  }

  isMetric() {
    return this.UnitConversionService.metricUnit;
  }

  // Converts the measurements from inches to cm and returns it to the value of the
  // measurement without changing the model
  setValue(value, unit) {
    return this.UnitConversionService.setValue(value, unit);
  }

  // Getter to display in the input field the value following a certain mask
  getInImperial(value, unit) {
    return this.UnitConversionService.getInImperial(value, unit);
  }


  changeLanguage() {
    if (this.translate.currentLang === this.translate.getLangs()[0]) {
      this.translate.use(this.translate.getLangs()[1]);
    } else {
      this.translate.use(this.translate.getLangs()[0]);
    }
  }

  // Gets the language not currently in used to display as an option to the user
  getOtherLanguage() {
    if (this.translate.currentLang === this.translate.getLangs()[0]) {
      return this.translate.getLangs()[1];
    } else {
      return this.translate.getLangs()[0];
    }
  }

}
