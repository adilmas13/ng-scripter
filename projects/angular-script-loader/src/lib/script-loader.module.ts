import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScriptLoaderService } from './script-loader.service';


@NgModule({
  imports: [CommonModule],
  providers: [ScriptLoaderService]
})
export class ScriptLoaderModule {
}
