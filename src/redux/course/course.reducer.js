import { CourseActionTypes } from './course.types';
import { addDeadline } from './course.utils';
import { removeDeadline } from './course.utils';
import { editDeadline } from './course.utils';
import { sortDeadline } from './course.utils';
import { sortDeadlineDND } from './course.utils';

const INITIAL_STATE = {
   deadlines: [],
   sortFlag: false,
   editFlag: false,
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

      case (CourseActionTypes.EDIT_DEADLINE): 
         return {
            ...state,
            deadlines: editDeadline(state.deadlines, action.payload)
         }
      
      case (CourseActionTypes.TOGGLE_SORT):
         return {
            ...state,
            sortFlag: !state.sortFlag
         }
      
      case (CourseActionTypes.TOGGLE_EDIT):
         return {
            ...state,
            editFlag: !state.editFlag
         }
         
      case (CourseActionTypes.SORT_DEADLINE):
         return {
            ...state,
            deadlines: sortDeadline(state.deadlines, state.sortFlag),
         }

      case (CourseActionTypes.SORT_DEADLINE_DND):
         return {
            ...state,
            deadlines: sortDeadlineDND(state.deadlines, action.payload),
         }
   
      default: 
         return state;
   }
}

export default CourseReducer;