System.config({
    baseURL: 'http://localhost:34994/',
    transpiler: 'ts',
    typescriptOptions: {
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true
      },
    paths: {
        // paths serve as alias
        'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
        // our app is within the app folder
        'app': 'src',

        // angular bundles
        '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
        '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
        '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
        '@angular/common/http': 'npm:@angular/common/bundles/common-http.umd.js',
        '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
        '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
        '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
        '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
        '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        '@angular/http': 'npm:@angular/http/bundles/http.umd.js',

        // other libraries
        'rxjs': 'npm:rxjs',
        'ts': 'npm:plugin-typescript',
        'tslib': 'npm:tslib/tslib.js',
        'typescript': 'npm:typescript',
        'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js'
    },
    meta: {
        'rxjs/*': { esModule: true }
    },
    packages: {
        ts: {
            main: 'lib/plugin.js'
        },
        app: {
            main: './main',
            defaultExtension: 'ts'
        },
        rxjs: {
            defaultExtension: 'js'
        },
        typescript: {
            main: 'lib/typescript.js',
            meta: {
                'lib/typescript.js': {
                    exports: 'ts'
                }
            }
        }
    }
})