// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyCVb_FX31Cu9unKujZyXH6lgjRFcjLel7E",
    authDomain: "medidatehub-ed249.firebaseapp.com",
    projectId: "medidatehub-ed249",
    storageBucket: "medidatehub-ed249.appspot.com",
    messagingSenderId: "782597452862",
    appId: "1:782597452862:web:a8484de87ebcf7c3b70d6f"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
