<a href="https://badge.fury.io/js/ng-scripter"><img src="https://badge.fury.io/js/ng-scripter.svg" alt="npm version" height="18"></a>
# NgScripter - One More Angular Script Loader

`ng-scripter` is a simple script loader that helps in loading external JS scripts on demand. 
This utility will help in decreasing the initial page load time since it gives the ability to load any JS script dynamically when required.

## Installation
NPM:
```
npm i ng-scripter
```
Yarn:
```
yarn add ng-scripter
```

## Setup
Import ScriptLoaderModule inside the module that requires it (AppModule or any other module)
```angular2
import { ScriptLoaderModule } from 'ng-scripter';
 
@NgModule({
  ...
  imports: [
    ...
    ScriptLoaderModule
  ]
})
```
## Usage
Inject the ScriptLoaderService inside a component/service
```angular2
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private scriptLoaderService: ScriptLoaderService) {
  }

  loadScript = () => {
    const script: Script = {
      id: 'faker-id',
      src: 'https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js',
      async: true,
      defer: false,
      crossOrigin: 'anonymous'
    };
    this.scriptLoaderService.loadScript(script).subscribe(
      (data: Script) => console.log('Script Loaded ', data),
      (err) => console.log('Script failed ', err)
    );
  };

}
```

## Options
The Script model has the following attributes.

| Attribute  | Required |  Type  | Description | 
| ------------- | ------------- | ------------- | ------------- |
| id  | Yes  | string  | An Id for the script. (Preferably Unique)
| src  | Yes  | string  | The source url |
| async  | No  | boolean  | Async load or not (Default : false) |
| defer  | No  | boolean | Defer or not (Default : false) |
| crossOrigin  | No  | string  | CORS |


## Usage of watch

```angular2
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private watcherSubscription: Subscription;
  ......  
  constructor(private scriptLoaderService: ScriptLoaderService) {
  }

  ngOnInit(): void {
      // get notified every time a new script is loaded the first time  
      this.watcherSubscription = this.scriptLoaderService.watch().subscribe(
        script => {
          console.log('Watcher => ', script);
        }
      );
    }
  
    ngOnDestroy(): void {
      if (this.watcherSubscription) {
        this.watcherSubscription.unsubscribe();
      }
    }

}
```

## Other notable functions
1. **isScriptLoaded** : Checks if a script is loaded or not using the script Object. Returns true or false
1. **isScriptLoadedViaSrc** : Checks if a script is loaded or not using the script's src. Returns true or false 
1. **isScriptLoadedViaId** : Checks if a script is loaded or not using the script's id. Returns true or false 

## Advantages over other script loaders
1. Avoids loading the same script multiple times
2. Ability to add initial delay before loading a script
3. Shared Observables used, so if a script is inProgress of loading and at that time another request to load that script comes in then the same instance of load is shared.
4. Various function to check if a script is loaded
5. Ability to get notified everytime a new script is loaded
