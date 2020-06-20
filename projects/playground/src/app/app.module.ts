import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScriptLoaderModule } from 'angular-script-loader';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ScriptLoaderModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
