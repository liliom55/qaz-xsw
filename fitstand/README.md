# FitApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

## Setup Instruction

### Assets Placement:
- Logo : assets/images/brand-logo.png
- To set the branding theme place the SASS map into branding-palette.scss ([Example of palette](https://github.com/stefanka-lingerie/fitstand/wiki/Branding-Palette))
- Switch between FitStand and FitRoom, change the questions and other parameters in config.X.json ([Example of config](https://github.com/stefanka-lingerie/fitstand/wiki/Example-Configuration-Files))
- env.json contains the environment (delvelopment or production) : {"env": "development" } / {"env": "production"}
```
src    
│
└───app
│   │
│   └───config
│       │   
│       │   branding-palette.scss
│       │   config.development.json
│       │   config.production.json
│       │   env.json
│   
└───assets
    │
    └───images
        │   
        │   brand-logo.png

```


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
