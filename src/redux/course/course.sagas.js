import { takeLatest, call, put, all } from 'redux-saga/effects';
import { CourseActionTypes } from './course.types'; // for listening to specific action types

import { firestore } from '../../firebase/firebase.utils';
import { addDeadline_action, addDeadline_action_success, addDeadline_action_failure } from './course.actions';

// saga which stores data to the firestore
export function* storeDeadlines({ payload }) {
   try {
      const deadlineToAdd = payload[0];
      const userAuth = payload[1];

      const userRef = firestore.doc(`users/${userAuth.uid}`); // Document Reference for a specific user
      const doc = yield userRef.get();
      const deadlinesArr = doc.data().deadlines;

      if (!deadlinesArr) {
         // for first time user update the doc by adding deadlines field
         yield userRef.update({deadlines: [deadlineToAdd]})
      }

      else {   
         deadlinesArr.push(deadlineToAdd);
         yield userRef.update({deadlines: deadlinesArr}); // update to firestore
         // yield userRef.update({deadlines: admin.FieldValue.arrayUnion(deadlineToAdd)}); // cannot be used due to firebase-admin requiring server env
      }
      
      yield put(addDeadline_action_success(deadlinesArr));
   }

   catch(error) {
      yield put(addDeadline_action_failure(error));
   }
}

export function* onAddDeadlinesStart() {
   yield takeLatest(CourseActionTypes.ADD_DEADLINE, storeDeadlines);
}

export function* courseSagas() {
   yield all([
      call(onAddDeadlinesStart),
   ])
}