import {createSelector} from 'reselect';

const selectState = state => state.deadlines // this is taken from root reducer!

export const selectDeadlines = createSelector(
   [selectState],
   deadlines => deadlines.deadlines
)

export const selectEditFlag = createSelector(
   [selectState],
   deadlines => deadlines.editFlag
)

export const selectSettings = createSelector(
   [selectState],
   deadlines => deadlines.settings
)

export const selectSettingsFlag = createSelector(
   [selectState],
   deadlines => deadlines.settingsFlag
)