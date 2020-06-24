import { Component } from '@angular/core';
import { Script, ScriptLoaderService } from 'ng-scripter';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private scriptLoaderService: ScriptLoaderService) {
  }

  script: Script = {
    id: 'faker-id',
    src: 'https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js',
    async: true,
    defer: false,
    crossOrigin: 'anonymous'
  };

  loadScript = () => {
    this.scriptLoaderService.loadScript(this.script).subscribe(
      (data: Script) => alert(`Script Loaded \n ${JSON.stringify(data)}`),
      (err) => alert(`Script failed`)
    );
  };

  checkIfScriptIsLoadedViaSrc = () => {
    alert(`Script load returned => ${this.scriptLoaderService.isScriptLoadedViaSrc(this.script.src)}`);
  };

  checkIfScriptIsLoadedViaId = () => {
    alert(`Script load returned => ${this.scriptLoaderService.isScriptLoadedViaId(this.script.id)}`);
  };

}
