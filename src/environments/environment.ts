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
    apiKey: "AIzaSyA41PNMRsZ-ks0puUUk_Om8GcTHLds5Ya4",
    authDomain: "mediadatehub.firebaseapp.com",
    projectId: "mediadatehub",
    storageBucket: "mediadatehub.appspot.com",
    messagingSenderId: "578985352008",
    appId: "1:578985352008:web:f668867e421ee96ae5f17d"
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
