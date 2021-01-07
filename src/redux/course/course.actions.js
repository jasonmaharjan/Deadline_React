import { CourseActionTypes } from './course.types';

export const toggleSort = () => ({
   type: CourseActionTypes.TOGGLE_SORT
});

export const toggleEdit = () => ({
   type: CourseActionTypes.TOGGLE_EDIT
});

export const addDeadline_action = item => ({
   type: CourseActionTypes.ADD_DEADLINE,
   payload: item
});

export const removeDeadline_action = item => ({
   type: CourseActionTypes.REMOVE_DEADLINE,
   payload: item
});

export const editDeadline_action = (item, updatedItem) => ({
   type: CourseActionTypes.EDIT_DEADLINE,
   payload: [item, updatedItem]
});

export const sortDeadline_action = () => ({
   type: CourseActionTypes.SORT_DEADLINE,
});

export const sortDeadlineDND_action = item => ({
   type: CourseActionTypes.SORT_DEADLINE_DND,
   payload: item
});