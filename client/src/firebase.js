import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const app = firebase.initializeApp({
    apiKey: "AIzaSyCmFSdcJgAdNFA6CzHDj_edbYYEjcVZQHI",
    authDomain: "tax-chain-de99a.firebaseapp.com",
    projectId: "tax-chain-de99a",
    storageBucket: "tax-chain-de99a.appspot.com",
    messagingSenderId: "142206292019",
    appId: "1:142206292019:web:283e61e77015c7f0fb9346"
})

export const auth = app.auth()
export const db = app.firestore()
export default app