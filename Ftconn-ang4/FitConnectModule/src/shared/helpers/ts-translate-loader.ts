import { TranslateLoader } from "ng2-translate";
import { Observable } from "rxjs/Observable";
import { en } from "./../../environments/en.lang";
import { fr } from "./../../environments/fr.lang";

export class TsTranslateLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
        let translation = null;
        if (lang == 'en')
            translation = en;
        else if (lang == 'fr')
            translation = fr;
        return Observable.of(translation);
    }
}