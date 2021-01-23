import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
   apiKey: "AIzaSyDo7wnA02zqVTik0X8dTPqXU_TIFf91o6Q",
   authDomain: "deadlinetracker-9c5d8.firebaseapp.com",
   projectId: "deadlinetracker-9c5d8",
   storageBucket: "deadlinetracker-9c5d8.appspot.com",
   messagingSenderId: "446199022865",
   appId: "1:446199022865:web:442975ef45235f9f3a38b0"
 };

 // Firestore returns 2 objects: either query or snapshot (Maybe be doc or collection)
 // Ref is an object that represents the current place in database (saves data)
 // Snapshot object gets the required data (gets data)

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`); // Document Reference
  const snapShot = await userRef.get(); // Document Snapshot

  if (!snapShot.exists) {   // create new userRef i.e, user data if a snapShot doesn't exist
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
      return userRef;
    }
    catch(error){
      console.log('Error creating user', error.message);
    }
  }
  
  else return userRef;
}

// create a new collection and set documents inside it
export const addCollectionAndDocuments = async(collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  // store documents of a collection in a batch
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc(); // document reference with random unique ID
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
}

// basically get data from firestore and store it in reducer!!

// for converting the collection snapshot array to an object
export const convertCollectionSnapshotToMap = (collections) => {  
  const transformedCollection = collections.docs.map(doc => {
    const {title, items} = doc.data();
    // return an object with extra props
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
}

// for user persistence
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
}

 firebase.initializeApp(config);

 export const auth = firebase.auth();
 export const firestore = firebase.firestore();

 export const googleProvider = new firebase.auth.GoogleAuthProvider();
 googleProvider.setCustomParameters({ prompt: 'select_account'});

 export const signInWithGoogle = () => {
   auth.signInWithPopup(googleProvider);
 }

 export default firebase;
