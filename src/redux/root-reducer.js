import { combineReducers } from 'redux';

import CourseReducer from './course/course.reducer';

export default combineReducers ({
   deadlines: CourseReducer // courseReducer: courseReducer
})