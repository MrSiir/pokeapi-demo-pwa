import { initializeApp } from 'firebase/app'
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyASh2DKpDkqtg4wosWh-Rdwm0IM-Lpxgcs',
  authDomain: 'vue-pwa-acb52.firebaseapp.com',
  projectId: 'vue-pwa-acb52',
  storageBucket: 'vue-pwa-acb52.appspot.com',
  messagingSenderId: '216779478877',
  appId: '1:216779478877:web:9a570cf1a61ca6dec63ab4'
}

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)

enableIndexedDbPersistence(db, {
  experimentalForceOwningTab: true
})

export default db
