
import { fitEnvironment } from "./../environments/fitEnvironment";
import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FitMediatorComponent } from './../FitMediator/FitMediator.component';
import { StoreService } from "./store.service";
import { MdIconRegistry, MdDialogRef } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { TranslateService } from 'ng2-translate';
import { UnitConversionService } from './../shared/unit-conversion.service';

//This is the only way to use resource files dependency injection (expect for using template):
//encapsulating the fitEnvironment in another variable prevents it from being undefined unside @component
//using "" + the variable prevents Error: Cannot find module "." at webpackMissingModule 
var tmp = fitEnvironment;
@Component({
  selector: 'fit-dialog',
  templateUrl: "" + tmp.store.htmls.fitDialog,
  styleUrls: ["" + tmp.store.styles.fitDialog],
  encapsulation: ViewEncapsulation.None,
  providers: [UnitConversionService, { provide: StoreService, useClass: fitEnvironment.store }]
})
export class FitDialogComponent implements OnInit {
  selectedTab: number;
  accountForm: FormGroup;
  preferencesForm: FormGroup;
  profileForm: FormGroup;
  bodyShape: any = {};
  measurementsForm: FormGroup;

  constructor(
    public dialogRef: MdDialogRef<FitDialogComponent>,
    private store: StoreService,
    private mediator: FitMediatorComponent,
    private iconRegistry: MdIconRegistry,
    private sanitizer: DomSanitizer,
    private translate: TranslateService,
    private unitConversionService: UnitConversionService,
    private changeDetectorRef: ChangeDetectorRef) {

    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('fr');
    this.accountForm = this.toFormGroup(this.store.account);
    this.measurementsForm = this.toFormGroup(this.store.measurements);
    this.preferencesForm = this.toFormGroup(this.store.preferences);
    this.profileForm = this.toFormGroup(this.store.profile);
    this.store.profile.forEach(basicInfo => {
      this.iconRegistry.addSvgIcon(
        basicInfo.svgIcon,
        this.sanitizer.bypassSecurityTrustResourceUrl(basicInfo.imgUrl));
    });
    this.selectedTab = 0;
  }

  ngOnInit() {
  }

  addClient(email) {
    this.store.addClient(email).then(() => this.goNext());
  }

  submitMeasurements(clientCapture) {
    this.store.submitMeasurements(clientCapture).then(() => this.goNext());
    /*let measurements = this.store.measurements.concat(this.store.profile);
    let bodySpecs: Map<string, any> = new Map<string, any>();
    bodySpecs['sex'] = this.sex;
    bodySpecs['measurements'] = measurements;
    bodySpecs['shapes'] = this.bodyShape.shapes;
    bodySpecs['preferences'] = this.store.preferences;
    this.store.submitMeasurements(bodySpecs);
    this.dialogRef.close('Hey! rapelle toi que tu peux venir changer tes mesure n\'importe quand ici!');*/
  }

  notify(msg) {
    this.mediator.notify(msg);
  }

  goTo(tabName) {
    this.selectedTab = this.store.steps[tabName].index;
  }

  goNext() {
    this.selectedTab = this.selectedTab + 1;
  }

  exit() {
    location.reload();
  }

  goBack() {
    this.selectedTab = this.selectedTab - 1;
  }
  closeDialogBox() {
    this.dialogRef.close('');
  }

  private toFormGroup(array: Array<any>) {
    let group: any = {};

    array.forEach(element => {
      group[element.name] = element.required ? new FormControl(element.value || '', Validators.required)
        : new FormControl(element.value || '');
    });
    return new FormGroup(group);
  }



  // Boolean check to switch between the 2 formats of unit display
  changeUnits() {
    this.unitConversionService.changeUnits();
  }

  isMetric() {
    return this.unitConversionService.metricUnit;
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
