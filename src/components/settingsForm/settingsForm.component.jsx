import React, {useState} from 'react';
import { connect } from 'react-redux';

import Settings from '../form/settingsform.component';
import { Notification } from '../notification/notification';

import { createStructuredSelector } from 'reselect';
import { selectSettingsFlag, selectSettings } from '../../redux/settings/settings.selectors';

import { toggleSettings, editSettings_action } from '../../redux/settings/settings.actions';

import './settingsForm.styles.scss';
import cross from "../../images/cross.svg";

const SettingsForm = ({ settings, settingsFlag, toggleSettings, editSettings_action}) => {
   const r = settings.redWarn / 86400;
   const y = settings.yellowWarn / 86400;
   const [redWarn, setRedWarn] = useState(r);
   const [yellowWarn, setYellowWarn] = useState(y);

   const updatedSettings = {
      redWarn: redWarn*86400, 
      yellowWarn: yellowWarn*86400
   }

   const handleChange = event => {
      const {name, value} = event.target;
      switch(name) {
         case 'redWarn':
            setRedWarn(value);
            break;
         case 'yellowWarn':
            setYellowWarn(value);
            break;
         default:
            console.log('Settings form update')
      }
   }

   const handleSubmit = (event) => {
      event.preventDefault();
      toggleSettings();
      Notification("info", "Settings Applied", "Your settings have been applied");
   }

   return (
      <section className = "edit-content">
         { settingsFlag?
            <form className = "edit-form" onSubmit = {handleSubmit} >
               <span className = "remove_icon_" onClick = {() => toggleSettings()}>
                  <img src = {cross} alt = "none" />
               </span> 
               <Settings
                  name = "redWarn"
                  type = "number"
                  value = {redWarn}
                  handleChange = {handleChange}
                  label = "Red Warn:"
                  required 
               />

               <Settings
                  name = "yellowWarn"
                  type = "number"
                  value = {yellowWarn}
                  handleChange = {handleChange}
                  label = "Yellow Warn :"
                  required 
               />

               <button className = "button" type = "submit" onClick = {() => 
                     {
                        updatedSettings ? editSettings_action(updatedSettings)
                        :
                        alert("Settings remain unchanged")
                     }
                  }>
                  OK
               </button>
            </form>             
         :null}
      </section>
   );
}

const MapStateToProps = createStructuredSelector({
   settings: selectSettings,
   settingsFlag: selectSettingsFlag
});

const MapDispatchToProps = dispatch => ({
   toggleSettings: () => dispatch(toggleSettings()),
   editSettings_action: updatedSettings => dispatch(editSettings_action(updatedSettings))
})

export default connect(MapStateToProps, MapDispatchToProps)(SettingsForm);