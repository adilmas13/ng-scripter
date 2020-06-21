# NgScripter - One More Angular Script Loader

`ng-scripter` is a simple script loader that helps in loading external JS scripts on demand. 
This utility will help in decreasing the initial page load time since it gives the ability to load any JS script dynamically when required.

## Installation
NPM:
```
npm i ng-script-loader
```
Yarn:
```
yarn add ng-script-loader
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

## Other notable functions
1. **isScriptLoaded** : Checks if a script is loaded or not. Returns true or false 

### Advantages over other script loaders
1. Avoids loading the same script multiple times
2. Ability to add initial delay before loading a script
3. Shared Observables used, so if a script is inProgress of loading and at that time another request to load that script comes in then the same instance of load is shared.
4. Additional function to check if a script is loaded