import { CourseActionTypes } from './course.types';

export const toggleSort = () => ({
   type: CourseActionTypes.TOGGLE_SORT
});

export const toggleEdit = () => ({
   type: CourseActionTypes.TOGGLE_EDIT
});

export const addDeadline_action = (item, userAuth)  => ({
   type: CourseActionTypes.ADD_DEADLINE,
   payload: [item, userAuth]
});

export const addDeadline_action_success = item => ({
   type: CourseActionTypes.ADD_DEADLINE_SUCCESS,
   payload: item
});

export const addDeadline_action_failure = error => ({
   type: CourseActionTypes.ADD_DEADLINE_FAILURE,
   payload: error
});

export const removeDeadline_action = (item, userAuth) => ({
   type: CourseActionTypes.REMOVE_DEADLINE,
   payload: [item, userAuth]
});

export const removeDeadline_action_success = item => ({
   type: CourseActionTypes.REMOVE_DEADLINE_SUCCESS,
   payload: item
});

export const removeDeadline_action_failure = item => ({
   type: CourseActionTypes.REMOVE_DEADLINE_FAILURE,
   payload: item
});

export const removeDeadlinesOnSignOut = () => ({
   type: CourseActionTypes.REMOVE_DEADLINE_ON_SIGN_OUT,
});

export const editDeadline_action = (item, updatedItem, userAuth) => ({
   type: CourseActionTypes.EDIT_DEADLINE,
   payload: [item, updatedItem, userAuth]
});

export const editDeadline_action_success = (updatedItem) => ({
   type: CourseActionTypes.EDIT_DEADLINE_SUCCESS,
   payload: updatedItem
});

export const editDeadline_action_failure = (item, updatedItem) => ({
   type: CourseActionTypes.EDIT_DEADLINE_FAILURE,
   payload: [item, updatedItem]
});

export const sortDeadline_action = () => ({
   type: CourseActionTypes.SORT_DEADLINE,
});

export const sortDeadlineDND_action = item => ({
   type: CourseActionTypes.SORT_DEADLINE_DND,
   payload: item
});

export const fetchDeadlinesData = (userAuth) => ({
   type: CourseActionTypes.FETCH_DEADLINES_DATA,
   payload: userAuth
})

export const fetchDeadlinesDataSuccess = (item) => ({
   type: CourseActionTypes.FETCH_DEADLINES_DATA_SUCCESS,
   payload: item
})

export const fetchDeadlinesDataFailure = (error) => ({
   type: CourseActionTypes.FETCH_DEADLINES_DATA_FAILURE,
   payload: error
})
