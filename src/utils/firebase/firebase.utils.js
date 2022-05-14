import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCdMMYU3cLclACBL6sD_kilI6VfrqhvB8Q',
	authDomain: 'crwn-clothing-db-50362.firebaseapp.com',
	projectId: 'crwn-clothing-db-50362',
	storageBucket: 'crwn-clothing-db-50362.appspot.com',
	messagingSenderId: '836233174716',
	appId: '1:836233174716:web:4d0d28c7e67b15020bbab9',
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, 'users', userAuth.uid);

	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createAt,
			});
		} catch (error) {
			console.log('error creating the user', error.message);
		}
	}

	return userDocRef;
};
