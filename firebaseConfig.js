// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfH9mQo7JpdFZZGorWAzLxfN-GWpTK_KE",
  authDomain: "chat-app-react-native-b95fd.firebaseapp.com",
  projectId: "chat-app-react-native-b95fd",
  storageBucket: "chat-app-react-native-b95fd.appspot.com",
  messagingSenderId: "391152851099",
  appId: "1:391152851099:web:777ddd22ff9dd0ab5d4e3e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})


export const db = getFirestore(app)

export const usersRef = collection(db, 'users')
export const roomsRef = collection(db, 'rooms')