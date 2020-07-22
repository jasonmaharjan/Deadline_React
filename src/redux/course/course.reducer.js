import { CourseActionTypes } from './course.types';
import { addDeadline } from './course.utils';
import { removeDeadline } from './course.utils';

const INITIAL_STATE = {
   status: false,
   deadlines: []
}

const CourseReducer = (state = INITIAL_STATE, action) => {
   switch(action.type) {

      case (CourseActionTypes.TOGGLE_STATUS):
         return {
            ...state, 
            status: !state.status
      }

      case (CourseActionTypes.ADD_DEADLINE):
         console.log('add deadline reducer triggered');  
         return {
            ...state,
            deadlines: addDeadline(state.deadlines, action.payload)
         }

      case (CourseActionTypes.REMOVE_DEADLINE):
         console.log('remove deadline reducer triggered');  
         return {
            ...state,
            deadlines: removeDeadline(state.deadlines, action.payload)
         }

      default: 
         return state;
   }
}

export default CourseReducer;