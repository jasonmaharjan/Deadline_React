import { takeLatest, put, all, call } from 'redux-saga/effects';
import { UserActionTypes } from './user.types';
import { signInSuccess, signInFailure } from './user.actions';
import { signOutSuccess, signOutFailure } from './user.actions';
import { signUpSuccess, signUpFailure } from './user.actions';

import { 
   auth,
   googleProvider,
   createUserProfileDocument,
   getCurrentUser }
   from '../../firebase/firebase.utils';

// Generator functions
export function* getSnapshotFromUserAuth(userAuth, additionalData) {
   try {
      const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
      const userSnapshot = yield userRef.get();

      yield put(signInSuccess({ // put will send signInSuccess action to the regular redux flow 
            id: userSnapshot.id, 
            photoURL: userAuth.photoURL,
            ...userSnapshot.data()
         })
      );
   }
   catch(error) {
      yield put(signInFailure(error));
   }
}

export function* signInWithGoogle() {
   try {
      const {user} = yield auth.signInWithPopup(googleProvider);
      yield call(getSnapshotFromUserAuth, user);
   }
   catch(error) {
      yield put(signInFailure(error));
   }
}

export function* signInWithEmail({payload: {email, password}}) {
   try {
      const { user } = yield auth.signInWithEmailAndPassword(email, password);
      yield call(getSnapshotFromUserAuth, user);
   }
   catch(error) {
      yield put(signInFailure(error));
   }
}

export function* isUserAuthenticated() {
   try {
      const userAuth = yield call(getCurrentUser); // get null or userAuth of current user
      if (userAuth) {
         yield call(getSnapshotFromUserAuth, userAuth);
      }
      else return;      
   }
   catch(error) {
      yield put(signInFailure(error));
   }
}

export function* signOut() {
   try {
      auth.signOut();
      yield put(signOutSuccess());
   }
   catch(error) {
      yield put(signOutFailure(error));
   }
}

export function* signUp({ payload: { email, password, Name } }) {
   try {
      const { user } = yield auth.createUserWithEmailAndPassword(email, password);
      yield put(signUpSuccess({user, additionalData: {Name}}));
      // this saga fires signupsuccess action which another saga catches
   }

   catch(error){
      yield put(signUpFailure(error));
   }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
   try {
      yield call(getSnapshotFromUserAuth, user, additionalData);
   }
   catch(error) {
      yield put(signInFailure(error));
   }

}

// First "Start" sagas are invoked: then either success or failure sagas
export function* onGoogleSignInStart() {
   yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
   yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

// for checking the user persistence
export function* onCheckUserSession() {
   yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
   yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUp() {
   yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignInAfterSignUp() {
   yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

// chain of action listeners(aka sagas)
export function* userSagas() {
   yield all(
      [ call(onGoogleSignInStart), call(onEmailSignInStart), 
       call(onCheckUserSession), call(onSignOutStart), call(onSignUp), call(onSignInAfterSignUp) ]
   );
}