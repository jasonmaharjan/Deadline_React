import React from 'react';
import './time_calc.styles.scss';

const TimeCalc = ({item}) => {
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
         (item.dateTime - Date.now())/1000 <= 86400? 'red-warn'
         :
         (item.dateTime - Date.now())/1000 > 86400 && (item.dateTime - Date.now())/1000 <= 259200 ? 'yellow-warn'
         :
         'green-warn'
         }  
      `}>
         Time Left: 
         {
            d?(d > 1)?<span> {d} days</span>: <span> {d} day</span>:null
         } 
         
         {
            h?(h > 1)?<span> {h} hours</span>: <span> {h} hour</span>:null
         } 
         
         {
            m?(m > 1)?<span> {m} minutes</span>: <span> {m} minute</span>:null
         } 
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

export default TimeCalc;