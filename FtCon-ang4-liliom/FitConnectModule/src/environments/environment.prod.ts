import { MetaformaService } from "./../Metaforma.service";

export const environment = {
  production: true,
  store: MetaformaService,
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
