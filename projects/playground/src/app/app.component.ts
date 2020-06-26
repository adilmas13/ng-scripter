import { Component, OnDestroy, OnInit } from '@angular/core';
import { Script, ScriptLoaderService } from 'ng-scripter';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private watcherSubscription: Subscription;

  constructor(private scriptLoaderService: ScriptLoaderService) {
  }

  script1: Script = {
    id: 'faker-id',
    src: 'https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js',
    async: true,
    defer: false,
    crossOrigin: 'anonymous'
  };

  script2: Script = {
    id: 'random-color-js-id',
    src: 'https://cdnjs.cloudflare.com/ajax/libs/random-js/1.0.8/random.min.js',
    async: true,
    defer: false,
    crossOrigin: 'anonymous'
  };

  loadScript1 = () => {
    this.scriptLoaderService.loadScript(this.script1).subscribe(
      (data: Script) => alert(`Script1 Loaded \n ${JSON.stringify(data)}`),
      (err) => alert(`Script1 failed`)
    );
  };

  loadScript2 = () => {
    this.scriptLoaderService.loadScript(this.script2).subscribe(
      (data: Script) => alert(`Script2 Loaded \n ${JSON.stringify(data)}`),
      (err) => alert(`Script2 failed`)
    );
  };


  checkIfScriptIsLoadedViaSrc = () => {
    alert(`Script load returned => ${this.scriptLoaderService.isScriptLoadedViaSrc(this.script1.src)}`);
  };

  checkIfScriptIsLoadedViaId = () => {
    alert(`Script load returned => ${this.scriptLoaderService.isScriptLoadedViaId(this.script2.id)}`);
  };

  ngOnInit(): void {
    this.watcherSubscription = this.scriptLoaderService.watch().subscribe(
      script => {
        console.log('Watcher => ', script);
      }
    );
    this.scriptLoaderService.watchOnce().subscribe(
      script => {
        console.log('Watcher Once => ', script);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.watcherSubscription) {
      this.watcherSubscription.unsubscribe();
    }
  }
}
