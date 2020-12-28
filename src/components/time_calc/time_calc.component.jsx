import React from 'react';
import './time_calc.styles.scss';

const TimeCalc = ({item}) => {
   const {date, time} = item;
   var datee = `${date} ${time}`;

   /* for refreshing timer
   var calculateTime = setInterval(function() {
      var now = Date.now();
      
      var date = new Date();
      var x = date.getTime();

      console.log(x);
      
   }, 1000);*/

   var now = Date.now();
   var deadline = new Date(datee);

   const calculateDecimal = (time) => {
      return (time - Math.floor(time));
   };

   if (deadline > now) {
      var timeMS = deadline - now;
      var timeDays = (((timeMS / 1000) / 60 / 60 ) / 24);
      var x1 = calculateDecimal(timeDays);
      
      var timeHours = (x1 * 24);
      var x2 = calculateDecimal(timeHours);

      var timeMinutes = (x2 *60);
      //var x3 = calculateDecimal(timeMinutes);

      //var timeSeconds = (x3 *60);

      var d = Math.floor(timeDays);
      var h = Math.floor(timeHours);
      var m = Math.floor(timeMinutes);
      //var s = Math.floor(timeSeconds);

   return (
      <div className = "time_left">
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

   else return null;
}

export default TimeCalc;