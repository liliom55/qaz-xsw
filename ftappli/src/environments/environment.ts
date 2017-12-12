// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    app: "fitStand",
    retailer: "lilianne",
    host: "localhost",
    apiUrl: "//fitadmin.ces.stefanka.tech/api",
    authorization: "Basic cGFuZHc6cGFuZHdhZG1pbg==",
    gender: "F",
    garmentType: "Bra",
    email: {
        enabled: true,
        emailContext: "sxsw"
    },
    defaultMeasurementSystem: "imperial",
    measurements: [
    {
        key: "breast_band_size",
        label: "Bust",
        required: true,
        params: {
        type: "textbox",
            metric: {
                order: 1
            },
            imperial: "same"
        },
        unit: {
            metric: "cm",
            imperial: "in"
        }
    },
    {
        key: "under-breast_band_size",
        label: "Underbust",
        required: true,
        params: {
        type: "textbox",
        metric: {
                order: 2
            },
            imperial: "same"
        },
        unit: {
            metric: "cm",
            imperial: "in"
        }
    }
    ],
    productMetadatas : ["collection", "fabric"],
    productSizeDescription: false
};
