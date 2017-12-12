import {MoovService} from "./../FitDialog/moov.service";

export const environment = {
  production: true,
  store: MoovService,
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