import React from 'react';
import './deadline_list.styles.scss';

import {connect} from 'react-redux';
import {removeDeadline_action} from '../../redux/course/course.actions';

const DeadlineList = ({item, removeDeadline_action}) => {
   const {course, date, time,  description} = item;   
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
   }


   return(
   <section className = 'deadline_list'>
      <h1 className = "course_title">
         {course}
      </h1>
      <div className = "course_deadline">
         Deadline: {date}
      </div>      
      <div className = "description">
         Description: {description}
      </div>
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
      <span className = "remove_icon" 
         onClick = {
            () => {
               if (RemoveDeadline() === true) removeDeadline_action(item);
            }
         }
      >
         &#10005;
      </span>
   </section>
   );
}

const RemoveDeadline = () => {
   if (window.confirm("Are you sure you want to remove this deadline?")) {
      return true
   } 
   else return false
}
const MapDispatchToProps = dispatch => ({
   removeDeadline_action: item => dispatch(removeDeadline_action(item))
});

export default connect(null, MapDispatchToProps)(DeadlineList);