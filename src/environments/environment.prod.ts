export const environment = {
  production: true,
  useEmulators: false,
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
