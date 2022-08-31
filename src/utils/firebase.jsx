import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"


///// connecting to firebase

const firebaseConfig = {
    apiKey: "AIzaSyCHGtTHy0jTKBHAOWpdseFBIT3Qqd9ARCM",
    authDomain: "sign-up-project-4edd1.firebaseapp.com",
    projectId: "sign-up-project-4edd1",
    storageBucket: "sign-up-project-4edd1.appspot.com",
    messagingSenderId: "322058763364",
    appId: "1:322058763364:web:d87c135729099992d27371"
};
const firebaseApp  = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp)

///// creating new user
export const createNewUser = async (email, password) => {
    if (!email || !password) return
    return await createUserWithEmailAndPassword(auth, email, password)
}

///// connecting to firestore and setting up the user data
export const db = getFirestore()
export const createUserData = async (user) => {
    if (!user) return
    const documentReference = doc(db, 'users', user.uid)
    const userDocument = await getDoc(documentReference)
    if(userDocument.exists()) return
        
    const { email } = user
        try {
            await setDoc(documentReference, {
                email,
            })
        } catch (error) {
            console.error(error.message)
        }
    
    return documentReference;
}


