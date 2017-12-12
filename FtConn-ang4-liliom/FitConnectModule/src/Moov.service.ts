import { Injectable, EventEmitter } from '@angular/core';
import { StoreService } from "./StoreService.interface";
import { fitEnvironment } from "./environments/fitEnvironment";
import { Observable } from "rxjs/Observable";

@Injectable()
export class MoovService extends StoreService {
    public static css: string = 'FitDialog.moov.scss';
    public static html: string = 'FitDialog.moov.html';
    public static logo: string = '../../assets/icons/moovlogo.png';
    public steps = [
        {title:'MOOV.STEP1.TITLE',bodys:'',borderColor:'#9D44B7',fontColor:'#CDDC39',btnsCaption:['MOOV.STEP1.BUTTON'],imgsUrl:null},
        {title:'MOOV.STEP2.TITLE',bodys:'',borderColor:'#0F1CF8',fontColor:'#0F1CF8',btnsCaption:['MOOV.STEP2.BUTTON'],imgsUrl:null},
        {title:'MOOV.STEP3.TITLE',bodys:'',borderColor:'#CDDC39',fontColor:'#9D44B7',btnsCaption:['MOOV.STEP3.BUTTON1','MOOV.STEP3.BUTTON2'],imgsUrl:null},
        {title:'MOOV.STEP4.TITLE',bodys:'',borderColor:'#70F5D1',fontColor:'#9D44B7',btnsCaption:[],imgsUrl:null},
        {title:'MOOV.STEP5.TITLE',bodys:'MOOV.STEP5.RESULT',borderColor:'#70F5D1',fontColor:'#70F5D1',btnsCaption:['MOOV.STEP5.BUTTON1','MOOV.STEP5.BUTTON2'],imgsUrl:null},
        {title:'MOOV.IMAGESHOWTAB.TITLE',bodys:['MOOV.IMAGESHOWTAB.BODY1','MOOV.IMAGESHOWTAB.BODY2'],borderColor:'#CDDC39',fontColor:'',btnsCaption:['MOOV.IMAGESHOWTAB.BUTTON'],imgsUrl:['./assets/icons/MoovActiveWear.jpg']},
        {title:'MOOV.STEP6.TITLE',bodys:'MOOV.STEP6.BODY',borderColor:'#F18630',fontColor:'#70F5D1',btnsCaption:['MOOV.STEP6.BUTTON'],imgsUrl:null},
        {title:'MOOV.STEP7.TITLE',bodys:'MOOV.STEP7.BODY',borderColor:'#F18630',fontColor:'#70F5D1',btnsCaption:['MOOV.STEP7.BUTTON'],imgsUrl:null}
    ];
    public formSteps= [
        {inputs:[
            {type:'text',label:'MOOV.STEP2.FORM.INPUT1',id:'height'},
            {type:'text',label:'MOOV.STEP2.FORM.INPUT2',id:'weight'}
        ]},
        {inputs:[
            {type:'text',label:'MOOV.STEP3.FORM.INPUT1',id:'height'},
            {type:'text',label:'MOOV.STEP3.FORM.INPUT2',id:'height'}
        ]}
    ];
    public units = [{height:['cm','po']},{weight:['kg','lb']}]
    
    public showImageOnStep3 = false;
    
    public measurementsAdded: EventEmitter<Map<string, any>>;

    public preferences = new Array<any>();
    public bodyShapes = new Array<any>();
    public profile = [
        {
            translateId: 'moov.height',
            name: fitEnvironment.SHAPE_KEY_NAMES.HEIGHT,
            value: null
        },
        {
            translateId: 'moov.weight',
            name: fitEnvironment.SHAPE_KEY_NAMES.WEIGHT,
            value: null
        }
    ];
    public measurements = [
        {
            translateId: 'moov.waist',
            name: fitEnvironment.SHAPE_KEY_NAMES.WAIST,
            value: null
        },
        {
            translateId: 'moov.hips',
            name: fitEnvironment.SHAPE_KEY_NAMES.HIP,
            value: null
        }
    ];

    constructor() {
        super();
        this.measurementsAdded = new EventEmitter();
    }

    submitMeasurements(profileSpecs: Map<string, any>) {
        this.measurementsAdded.emit(profileSpecs);
    }

}
