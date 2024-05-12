import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  Injectable,
  Injector,
  InjectionToken,
  NgModule,
  ErrorHandler,
  Inject
} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule, SETTINGS as FIRESTORE_SETTINGS } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule, SETTINGS as FIREAUTH_SETTINGS } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';

import Rollbar from 'rollbar'; 


const rollbarConfig = {
  accessToken: 'd37728bf9a104420a3712a57d61c6c7d',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: "angular-solar-car-site-prod",
    client: {
      javascript: {
        source_map_enabled: true, // false by default
        code_version: "1.0.0",
        guess_uncaught_frames: true
      }
    }
  }
};

@Injectable()
export class RollbarErrorHandler implements ErrorHandler {
  constructor(@Inject(RollbarService) private rollbar: Rollbar) {}

  handleError(err:any) : void {
    this.rollbar.error(err.originalError || err);
  }
}

export function rollbarFactory() {
    return new Rollbar(rollbarConfig);
}

export const RollbarService = new InjectionToken<Rollbar>('rollbar');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [
    { provide: FIRESTORE_SETTINGS, useValue: environment.useEmulators ? { host: 'localhost:8080', ssl: false } : undefined },
    { provide: FIREAUTH_SETTINGS, useValue: environment.useEmulators ? { host: 'localhost:9099', ssl: false } : undefined },
    { provide: ErrorHandler, useClass: RollbarErrorHandler },
    { provide: RollbarService, useFactory: rollbarFactory }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
