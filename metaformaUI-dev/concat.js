var concat = require('concat')
concat([
    './dist/inline.bundle.js',
    './dist/polyfills.bundle.js',
    './dist/scripts.bundle.js',
    './dist/styles.bundle.js',
    './dist/vendor.bundle.js',
    './dist/main.bundle.js'
], './dist/app.bundle.js');
