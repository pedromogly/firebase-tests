//instalar firebase 'npm i firebase'
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCcNfgmp-ytzsYPIIFgI5qCUiJRZZZZ4bo",
    authDomain: "reactproject-9049d.firebaseapp.com",
    projectId: "reactproject-9049d",
    storageBucket: "reactproject-9049d.appspot.com",
    messagingSenderId: "171521154059",
    appId: "1:171521154059:web:5a02a0b27ba954e43c7b0e",
    measurementId: "G-39RDGQVRL1"
  };

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export {db};

