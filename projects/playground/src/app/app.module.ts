import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScriptLoaderModule } from 'ng-scripter';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ScriptLoaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
