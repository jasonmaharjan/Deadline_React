import React from 'react';

import './form.styles.scss';

const Form = ( {handleChange, label, ...otherProps} ) => (
   <div className = "group">
         <label className = "form-label"> 
            {label}
         </label>
      <input className="form-input" onChange = {handleChange} {...otherProps}/>
   </div>
)

export default Form;