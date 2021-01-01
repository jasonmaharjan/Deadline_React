import {createSelector} from 'reselect';

const selectState = state => state.deadlines // this is taken from root reducer!

export const selectDeadlines = createSelector(
   [selectState],
   deadlines => deadlines.deadlines
)
