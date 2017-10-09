import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { RadialProgressBar } from './components/progressbar/radial';
import { AppComponent } from './app';

console.log(this);

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    bootstrap: [AppComponent],
    declarations: [AppComponent, RadialProgressBar]
})
class BootstrapModule { }

platformBrowserDynamic().bootstrapModule(BootstrapModule);
