// // // Import the functions you need from the SDKs you need
// // import { initializeApp } from "firebase/app";
// // // import { getAnalytics } from "firebase/analytics";
// // import { initializeAuth } from "firebase/auth";
// // import { getReactNativePersistence } from "firebase/auth";
// // import AsyncStorage from "@react-native-async-storage/async-storage";
// // import { getFirestore, collection } from "firebase/firestore";
// // import {getAnalytics} from "firebase/analytics";
// // // TODO: Add SDKs for Firebase products that you want to use
// // // https://firebase.google.com/docs/web/setup#available-libraries

// // // Your web app's Firebase configuration
// // // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// // const firebaseConfig = {
// //   apiKey: "AIzaSyBZt0hLCn2PHG3cY1WsjUpUzpftmfX6GpQ",
// //   authDomain: "fir-chat-4d87a.firebaseapp.com",
// //   projectId: "fir-chat-4d87a",
// //   storageBucket: "fir-chat-4d87a.firebasestorage.app",
// //   messagingSenderId: "169963652608",
// //   appId: "1:169963652608:web:6bae2d9c2a32f491607ae5",
// //   measurementId: "G-96NZCQFN7J"
// // };

// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);

// // export const auth = initializeAuth(app,{
// //     persistence:getReactNativePersistence(AsyncStorage)
// // });

// // export const db = getFirestore(app);
// // export const userRef = collection(db, 'users')
// // export const roomRef = collection(db, 'rooms')

// import { initializeApp } from 'firebase/app';
// import {
//   getAuth,
//   initializeAuth,
//   getReactNativePersistence
// } from 'firebase/auth';
// import { getFirestore, collection } from 'firebase/firestore';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getAnalytics, isSupported } from 'firebase/analytics';

// import { Platform } from 'react-native';

// // Your Firebase config
// const firebaseConfig = {
//   apiKey: 'AIzaSyBZt0hLCn2PHG3cY1WsjUpUzpftmfX6GpQ',
//   authDomain: 'fir-chat-4d87a.firebaseapp.com',
//   projectId: 'fir-chat-4d87a',
//   storageBucket: 'fir-chat-4d87a.appspot.com',
//   messagingSenderId: '169963652608',
//   appId: '1:169963652608:web:6bae2d9c2a32f491607ae5',
//   measurementId: 'G-96NZCQFN7J',
// };

// // Initialize app
// const app = initializeApp(firebaseConfig);

// // Platform-specific auth initialization
// let auth;

// if (Platform.OS === 'web') {
//   auth = getAuth(app);
// } else {
//   auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(AsyncStorage),
//   });
// }

// // Optional: Analytics only on supported web environments
// let analytics;
// if (Platform.OS === 'web') {
//   isSupported().then((supported) => {
//     if (supported) {
//       analytics = getAnalytics(app);
//     } else {
//       console.warn('Analytics not supported in this environment');
//     }
//   });
// }

// // Firestore
// const db = getFirestore(app);
// const userRef = collection(db, 'users');
// const roomRef = collection(db, 'rooms');

// export { app, auth, db, userRef, roomRef };
// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: 'YOUR_API_KEY',
//   authDomain: 'YOUR_AUTH_DOMAIN',
//   projectId: 'YOUR_PROJECT_ID',
//   storageBucket: 'YOUR_STORAGE_BUCKET',
//   messagingSenderId: 'YOUR_MSG_ID',
//   appId: 'YOUR_APP_ID',
// };
const firebaseConfig = {
  apiKey: 'AIzaSyBZt0hLCn2PHG3cY1WsjUpUzpftmfX6GpQ',
  authDomain: 'fir-chat-4d87a.firebaseapp.com',
  projectId: 'fir-chat-4d87a',
  storageBucket: 'fir-chat-4d87a.appspot.com',
  messagingSenderId: '169963652608',
  appId: '1:169963652608:web:6bae2d9c2a32f491607ae5',
  measurementId: 'G-96NZCQFN7J',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
