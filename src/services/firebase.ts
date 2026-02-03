import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { getStorage, type FirebaseStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

let app: FirebaseApp
let auth: Auth
let db: Firestore
let storage: FirebaseStorage

function initFirebase() {
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'your-api-key') {
    console.warn('Firebase not configured. Using mock mode.')
    return { app: null, auth: null, db: null, storage: null }
  }
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getFirestore(app)
  storage = getStorage(app)
  return { app, auth, db, storage }
}

const firebase = initFirebase()

export const firebaseApp = firebase.app
export const firebaseAuth = firebase.auth
export const firebaseDb = firebase.db
export const firebaseStorage = firebase.storage

export { app, auth, db, storage }
