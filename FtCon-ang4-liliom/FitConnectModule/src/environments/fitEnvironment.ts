// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

//import { MetaformaService } from "./../Metaforma.service";
//import { MetaformaService } from "./../metaforma.service";
import {MoovService} from "./../Moov.service";
export const fitEnvironment = {
  production: false,
  store: MoovService,
  API_URL: 'https://admin.unicorp.stefanka.tech/api',
  API_AUTH: 'Basic bG9naXN0aWs6bG9naXN0aWthZG1pbg==',
  SHAPE_KEY_NAMES: {
    ECTOMORPH: 'ectomorph',
    ENDOMORPH: 'endomorph',
    ENDOMESOMORPH: 'endoMesomorph',
    WEIGHT: 'weight',
    HEIGHT: 'height',
    NECK: 'neck_size',
    CHEST: 'chest_size',
    WAIST: 'waist_width',
    HIP: 'hip_size',
    SLEEVE_LENGTH: 'sleeve_length',
    AGE: 'age'
  }
};
