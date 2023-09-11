import {createSelector} from 'reselect';

const selectState = state => state.settings // this is taken from root reducer!

export const selectSettings = createSelector(
   [selectState],
   settings => settings.settings
)

export const selectSettingsFlag = createSelector(
   [selectState],
   settings => settings.settingsFlag
)

export const selectDarkMode = createSelector(
   [selectState],
   settings => settings.darkMode
)