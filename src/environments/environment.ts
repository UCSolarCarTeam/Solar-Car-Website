// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  useEmulators: true,
  firebaseConfig: {
    apiKey: import.meta.env.NG_APP_FIREBASE_API_KEY, 
    authDomain: 'solarcardatabase.firebaseapp.com',
    databaseURL: 'https://solarcardatabase.firebaseio.com',
    projectId: import.meta.env.NG_APP_PROJECT_ID,
    storageBucket: 'solarcardatabase.appspot.com',
    messagingSenderId: import.meta.env.NG_APP_MESSAGING_SENDER_ID,
    appId: import.meta.env.NG_APP_APP_ID,
    measurementId: import.meta.env.NG_APP_MEASUREMENT_ID
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
