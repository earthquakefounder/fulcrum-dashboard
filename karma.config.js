module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],

        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter')
        ],

        client: {
            clearContext: false
        },

        files: [
            // System.js for module loading
            'node_modules/systemjs/dist/system.src.js',
      
            // Polyfills
            'node_modules/core-js/client/shim.js',
      
            // zone.js
            'node_modules/zone.js/dist/zone.js',
            'node_modules/zone.js/dist/long-stack-trace-zone.js',
            'node_modules/zone.js/dist/proxy.js',
            'node_modules/zone.js/dist/sync-test.js',
            'node_modules/zone.js/dist/jasmine-patch.js',
            'node_modules/zone.js/dist/async-test.js',
            'node_modules/zone.js/dist/fake-async-test.js',

            'karma.bootstrapper.js',
            
            { pattern: 'development/system.config.testing.js', included: false, watched: false },

            { pattern: 'node_modules/plugin-typescript/lib/plugin.js', included: false, watched: false },
            { pattern: 'node_modules/tslib/tslib.js', included: false, watched: false },
            { pattern: 'node_modules/typescript/lib/typescript.js', included: false, watched: false },

            // RxJs
            { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
            { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },

            // Paths loaded via module imports:
            // Angular itself
            { pattern: 'node_modules/@angular/**/*.js', included: false, watched: false },
            { pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: false },

            { pattern: 'src/**/*.ts', included: false, watched: true },
            { pattern: 'src/**/*.js', included: false, watched: true }
        ],

        autoWatch: true,

        // Proxied base paths for loading assets
        proxies: {
            // required for modules fetched by SystemJS
            '/base/src/node_modules/': '/base/node_modules/'
        },
  
        browsers: ['Chrome']
    })
}