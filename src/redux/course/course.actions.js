import { CourseActionTypes } from './course.types';

export const toggleStatus = () => ({
   type: CourseActionTypes.TOGGLE_STATUS
});

export const addDeadline_action = item => ({
   type: CourseActionTypes.ADD_DEADLINE,
   payload: item
});

export const removeDeadline_action = item => ({
   type: CourseActionTypes.REMOVE_DEADLINE,
   payload: item
});