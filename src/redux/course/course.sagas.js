import { takeLatest, call, put, all } from 'redux-saga/effects';
import { CourseActionTypes } from './course.types'; // for listening to specific action types

import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './course.actions';
import { addDeadline_action, addDeadline_action_success, addDeadline_action_failure } from './course.actions';

import 'firebase/firestore';
//import * as admin from "firebase-admin";

import { 
   auth,
   googleProvider,
   createUserProfileDocument,
   getCurrentUser }
   from '../../firebase/firebase.utils';

// saga which stores data to the firestore
export function* storeDeadlines({ payload }) {
   try {
      const deadlineToAdd = payload[0];
      const userAuth = payload[1];

      const userRef = firestore.doc(`users/${userAuth.uid}`); // Document Reference for a specific user

      yield userRef.update({deadlines: admin.FieldValue.arrayUnion(deadlineToAdd)});
   }

   catch(error) {
      yield put(addDeadline_action_failure(error));
   }
}



// saga which fetches data from firestore
export function* fetchCollectionsAsync() {
   try {
      const collectionRef = firestore.collection('collections');    
      const snapshot = yield collectionRef.get();

      // call is a Saga effect, used for calling other user defined functions (for control and testing)
      const collectionsMap = yield call(convertCollectionSnapshotToMap, snapshot);
      
      // put is a Saga effect for creating actions (like dispatch in Thunk!)
      // puts things back into regular Redux flow
      yield put(fetchCollectionsSuccess(collectionsMap));
   }

   catch(error) {
      yield put(fetchCollectionsFailure(error.message));
   }
}

// all sagas must run concurrently!
// take, takeEvery, takeLatest listener 
// takeLatest is for the latest action fired from a component!
// yields allow to cancel/delay the tasks of sagas for Controlling purposes

export function* onFetchCollectionsStart() {
   yield takeLatest(CourseActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync   
   );
}

export function* onAddDeadlinesStart() {
   yield takeLatest(CourseActionTypes.ADD_DEADLINE, storeDeadlines);
}

export function* courseSagas() {
   yield all([
      call(onFetchCollectionsStart),
      call(onAddDeadlinesStart),
   ])
}