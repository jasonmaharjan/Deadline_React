import { takeLatest, call, put, all } from 'redux-saga/effects';
import { CourseActionTypes } from './course.types'; // for listening to specific action types
import _ from 'lodash';

import { firestore } from '../../firebase/firebase.utils';
import { addDeadline_action_success, addDeadline_action_failure } from './course.actions';
import { editDeadline_action_success, editDeadline_action_failure } from './course.actions';
import { removeDeadline_action_success, removeDeadline_action_failure } from './course.actions';

import { fetchDeadlinesDataSuccess } from './course.actions';
import { fetchDeadlinesDataFailure } from './course.actions';


// fetch deadlines array from firestore
export function* fetchDeadlinesDataFromUserAuth({ payload }) {
   try {
      const userAuth = payload;
      const userRef = firestore.doc(`users/${userAuth.uid}`); 
      const doc = yield userRef.get();

      const deadlinesData = doc.data().deadlines;

      if (deadlinesData) {
         yield put(fetchDeadlinesDataSuccess(deadlinesData));
      }      
      else yield put(fetchDeadlinesDataSuccess([]));

   }
   catch(error) {
      yield put(fetchDeadlinesDataFailure(error));
   }
}

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

export function* removeDeadlines({ payload }) {
   try {
      const deadlineToRemove = payload[0];
      const userAuth = payload[1];

      const userRef = firestore.doc(`users/${userAuth.uid}`); // Document Reference for a specific user
      const doc = yield userRef.get();
      const deadlinesArr = doc.data().deadlines;

      if (deadlinesArr) {
         const updatedArr = deadlinesArr.filter(deadlines => deadlines.id !== deadlineToRemove.id);
         yield userRef.update({deadlines: updatedArr});

         yield put(removeDeadline_action_success(updatedArr));
      }
   }

   catch(error) {
      yield put(removeDeadline_action_failure(error));
   }
}

export function* editDeadlines({ payload }) {
   try {
      const oldDeadline = payload[0];
      const newDeadline = payload[1];
      const userAuth = payload[2];

      const userRef = firestore.doc(`users/${userAuth.uid}`); 
      const doc = yield userRef.get();
      let deadlinesArr = doc.data().deadlines;

      let comparison = _.isEqual(oldDeadline, newDeadline);
      
      if (!comparison) {
         deadlinesArr = [{...newDeadline}, ...deadlinesArr.filter(deadlines => deadlines.id !== oldDeadline.id)];
         yield userRef.update({deadlines: deadlinesArr});
         yield put(editDeadline_action_success(deadlinesArr));
      }
   }

   catch(error) {
      yield put(editDeadline_action_failure(error));
   }
}

export function* onAddDeadlinesStart() {
   yield takeLatest(CourseActionTypes.ADD_DEADLINE, storeDeadlines);
}

export function* onRemoveDeadlinesStart() {
   yield takeLatest(CourseActionTypes.REMOVE_DEADLINE, removeDeadlines);
}

export function* onEditDeadlinesStart() {
   yield takeLatest(CourseActionTypes.EDIT_DEADLINE, editDeadlines);
}

export function* onFetchDeadlinesData() {
   yield takeLatest(CourseActionTypes.FETCH_DEADLINES_DATA, fetchDeadlinesDataFromUserAuth);
}

export function* courseSagas() {
   yield all([
      call(onAddDeadlinesStart),
      call(onRemoveDeadlinesStart),
      call(onEditDeadlinesStart),
      call(onFetchDeadlinesData)
   ])
}