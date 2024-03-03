// Assurez-vous que vos modules sont correctement importés dans votre fichier 'firebase'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyDKf7y3g4xEQSVLhzDmnan4xhzpViIpGPo",
//   authDomain: "sewanou-f49ea.firebaseapp.com",
//   projectId: "sewanou-f49ea",
//   storageBucket: "sewanou-f49ea.appspot.com",
//   messagingSenderId: "774845154980",
//   appId: "1:774845154980:web:02e138d4ed4002a1274831",
//   measurementId: "G-P4PHG3YBZD"
// };

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };
