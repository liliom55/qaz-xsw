import { Component, Input }   from '@angular/core';
import { HomeViews }    from '../home.structure';


@Component({
    selector: 'pre-filter',
    templateUrl: './pre-filter.component.html',
    styleUrls: ['../home.component.css'],
})

export class PreFilterComponent {
    constructor() { }
     @Input() homeViews: HomeViews;
     @Input() autoNextStep;
     isError_match: boolean;

}