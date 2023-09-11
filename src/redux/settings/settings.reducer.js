import { SettingsActionTypes } from './settings.types';

const INITIAL_STATE = {
   settings: { 
      redWarn: 86400,          // by default 1 day
      yellowWarn: 259200,      // by default 3 days
   },
   settingsFlag: false,
   darkMode: false,
}

const SettingsReducer = (state = INITIAL_STATE, action) => {
   switch(action.type) {

      case (SettingsActionTypes.TOGGLE_SETTINGS):
         return {
            ...state,
            settingsFlag: !state.settingsFlag
         }

      case (SettingsActionTypes.EDIT_SETTINGS): 
         return {
            ...state,
            settings: action.payload
         }

      case (SettingsActionTypes.TOGGLE_DARK_MODE):
         return {
            ...state,
            darkMode: !state.darkMode
         }
   
      default: 
         return state;
   }
}

export default SettingsReducer;