import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, share } from 'rxjs/operators';
import { Script } from './models/script';

@Injectable()
export class ScriptLoaderService {

  private observables = new Map<string, Observable<any>>();
  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  loadScript = (script: Script, delayBy: number = 0) => {
    if (this.observables.has(script.id)) {
      return this.observables.get(script.id);
    } else {
      const obs = new Observable<Script>(observer => {
        if (this.isScriptLoaded(script)) {
          observer.next();
          observer.complete();
        } else {
          const element = this.renderer.createElement('script') as HTMLScriptElement;
          element.type = 'text/javascript';
          element.src = script.src;
          if (script.id) {
            element.id = script.id;
          }
          if (script.async) {
            element.async = true;
          }
          if (script.defer) {
            element.defer = true;
          }
          if (script.crossOrigin) {
            element.crossOrigin = script.crossOrigin;
          }
          element.onerror = (error) => {
            observer.error(error);
            this.removeObservable(script.id);
          };
          element.onload = () => {
            observer.next(script);
            observer.complete();
            this.removeObservable(script.id);
          };
          this.renderer.appendChild(document.head, element);
        }
      }).pipe(delay(delayBy), share());
      this.addToListOfObservables(script.id, obs);
      return obs;
    }
  };

  /* checks if the script is loaded or not via the script object*/
  isScriptLoaded = (script: Script) => document.querySelector(`script[src="${script.src}"]`) !== null;

  /* checks if the script is loaded or not via the script src*/
  isScriptLoadedViaSrc = (src: string) => document.querySelector(`script[src="${src}"]`) !== null;

  private addToListOfObservables = (id: string, observable: Observable<any>) => this.observables.set(id, observable);

  private removeObservable = (id: string) => this.observables.delete(id);
}
