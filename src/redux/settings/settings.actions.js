// actions to toggle and edit settings and to toggle dark mode
import { SettingsActionTypes } from './settings.types';

export const toggleSettings = () => ({
   type: SettingsActionTypes.TOGGLE_SETTINGS
});

export const toggleDarkMode = () => ({
   type: SettingsActionTypes.TOGGLE_DARK_MODE
});

export const editSettings_action = item => ({
   type: SettingsActionTypes.EDIT_SETTINGS,
   payload: item
});