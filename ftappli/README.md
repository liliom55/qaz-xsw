# FitApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

## Setup Instruction

### Assets Placement:
- Logo : assets/images/brand-logo.png
- To set the branding theme place the SASS map into assets/css/branding-palette.scss ([Example of palette](https://github.com/stefanka-lingerie/fitstand/wiki/Branding-Palette))
- Switch between FitStand and FitRoom, change the questions and other parameters in environment.ts (for development) or environment.prod.ts (for production) ([Example of config](https://github.com/stefanka-lingerie/fitstand/wiki/Example-Configuration-Files)). Using ng serve/build with the --prod or --env=prod flag will swith to environment.prod.ts.
```
src    
│
└───environment
│   │
│   │   environment.ts
│   │   environment.prod.ts
│   
└───assets
    │
    └───images
    |    │   
    |    │   brand-logo.png
    |      
    |___ css
         |
         │   branding-palette.scss


```


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Test FitRoom with RabbitMQ

1. Port Forward 15672 on dev.stefanka.tech
2. Connect the port forwarded
3. Login: guest / guest
4. Exhanges -> exchange that you want to test (now only pool_001 exists)
5. Messages to send (with routing keys)

        5.1. When FitRoom waits for connection : SCAN_STARTED | routing key : viewer.status
        5.2. When scan is supposed to be finished (30 seconds later) : SCAN_STOP_1490297895.55035 | routing key : viewer.results
6. You can see the logs of the messages at dev.stefanka.tech/testmq
