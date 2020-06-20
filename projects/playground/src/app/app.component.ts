import { Component } from '@angular/core';
import { Script, ScriptLoaderService } from 'angular-script-loader';


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
    //  const script = new Script('faker-js', 'https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js', true, true);
    this.scriptLoaderService.loadScript(script).subscribe(
      (data: Script) => console.log('Script Loaded ', data),
      (err) => console.log('Script failed ', err)
    );
  };

}
