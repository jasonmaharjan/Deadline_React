import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSettings } from '../../redux/settings/settings.selectors';

import './time_calc.styles.scss';

const TimeCalc = ({item, settings}) => {
   var deadline = new Date(item.dateTime);
   var now = Date.now();

   const calculateDecimal = (time) => {
      return (time - Math.floor(time));
   };

   if (deadline >= now) {
      var timeMS = deadline - now;
      var timeDays = (((timeMS / 1000) / 60 / 60 ) / 24);
      var x1 = calculateDecimal(timeDays);
      var timeHours = (x1 * 24);
      var x2 = calculateDecimal(timeHours);
      var timeMinutes = (x2 *60);
      
      var d = Math.floor(timeDays);
      var h = Math.floor(timeHours);
      var m = Math.floor(timeMinutes);

   return (
      <div className = {`${
         (item.dateTime - Date.now())/1000 <= settings.redWarn? 'red-warn'
         :
         (item.dateTime - Date.now())/1000 > settings.redWarn && (item.dateTime - Date.now())/1000 <= settings.yellowWarn ? 'yellow-warn'
         :
         'green-warn'
         }  
      `}> 
      <span>
         {
            d?(d > 1)?<span> {d} days </span>: <span> {d} day</span>:null
         } 
         
         {
            h?(h > 1)?<span> {h} hours</span>: <span> {h} hour</span>:null
         } 
         
         {
            m?(m > 1)?<span> {m} minutes</span>: <span> {m} minute</span>:null
         } 
         &nbsp;remaining
      </span>
      </div>
      )
   }

   else {
      return(
         <div className = "red-warn">
            Deadline exceeded
         </div>
      );
   }
}

const MapStateToProps = createStructuredSelector({
   settings: selectSettings
})

export default connect(MapStateToProps)(TimeCalc);