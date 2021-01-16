import React from 'react';

import './form.styles.scss';

const Settings = ( {handleChange, label, ...otherProps} ) => (
   <div className = "group-settings">
         <label className = "form-label-settings"> 
            {label}
         </label>
      <input className="form-input-settings" onChange = {handleChange} {...otherProps}/>
   </div>
)

export default Settings;