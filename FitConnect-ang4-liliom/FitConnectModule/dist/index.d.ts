import { ModuleWithProviders } from '@angular/core';
import { Http } from '@angular/http';
import { TranslateStaticLoader } from 'ng2-translate';
import 'rxjs/Rx';
export * from './FitMediator/FitMediator.component';
export * from './FitDialog/FitDialog.component';
export * from './Metaforma.service';
export declare function createTranslateLoader(http: Http): TranslateStaticLoader;
export declare class FitConnectModule {
    static forRoot(): ModuleWithProviders;
}
