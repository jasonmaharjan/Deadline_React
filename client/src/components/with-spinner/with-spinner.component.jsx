import React from 'react';
import './with-spinner.styles.scss';

// WithSpinner HOC takes a component to wrap and returns back a new functional component 'Spinner'
const WithSpinner = WrappedComponent =>  {
   const Spinner = ({ isLoading, darkMode, ...otherProps })  => {
      return isLoading ? (
         <section className = "spinner">
            <div className = { darkMode? "spinner-overlay-dark": "spinner-overlay"}>
               <div className = { darkMode?"spinner-container-dark": "spinner-container"}>
      
               </div>
            </div>
         </section>
      ): (
         <WrappedComponent {...otherProps} />
      )
   }
   return Spinner;
}

export default WithSpinner;