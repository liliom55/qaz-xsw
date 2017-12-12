// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import {MoovService} from "./../FitDialog/moov.service";
import {API_CONFIG} from "./moov-store.environment";
export const fitEnvironment = {
  production: false,
  store: MoovService,
  API_CONFIG: API_CONFIG,
  app: 'fitconnect',
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
