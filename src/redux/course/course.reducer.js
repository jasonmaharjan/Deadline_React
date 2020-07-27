import { CourseActionTypes } from './course.types';
import { addDeadline } from './course.utils';
import { removeDeadline } from './course.utils';

const INITIAL_STATE = {
   deadlines: []
}

const CourseReducer = (state = INITIAL_STATE, action) => {
   switch(action.type) {

      case (CourseActionTypes.ADD_DEADLINE):
         return {
            ...state,
            deadlines: addDeadline(state.deadlines, action.payload)
         }

      case (CourseActionTypes.REMOVE_DEADLINE): 
         return {
            ...state,
            deadlines: removeDeadline(state.deadlines, action.payload)
         }

      default: 
         return state;
   }
}

export default CourseReducer;