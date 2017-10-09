var specs = Object.keys(window.__karma__.files)
    .filter(path => /.*\.spec\.(ts|js)$/.test(path));

__karma__.loaded = function() {};

System.config({
    baseURL: 'base'
});

System.import('development/system.config.testing.js')
    .then(() => {
        return Promise.all([
            System.import('@angular/core/testing'),
            System.import('@angular/platform-browser-dynamic/testing')
        ])
    })
    .then(providers => {
        var core = providers[0]
        var browser = providers[1];

        core.TestBed.initTestEnvironment(
            browser.BrowserDynamicTestingModule,
            browser.platformBrowserDynamicTesting()
        )
    })
    .then(() => {
        console.log(specs);
        return Promise.all(
            specs.map(name => System.import(`${name}`))
        )
    })
    .then(__karma__.start, __karma__.error);