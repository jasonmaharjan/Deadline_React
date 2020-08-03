import React from 'react';
import './deadline_list.styles.scss';

import {connect} from 'react-redux';
import {removeDeadline_action} from '../../redux/course/course.actions';

const DeadlineList = ({item, removeDeadline_action}) => {
   const {course, date, description} = item;   
      /*
   var calculateTime = setInterval(function() {
      var now = Date.now();
      var time_left = item.date.getTime() - now;
      console.log(time_left);
   }, 1000);*/

   console.log(Date.now(), item.date)

   return(
   <section className = 'deadline_list'>
      <h1 className = "course_title">
         {course}
      </h1>
      <span className = "course_deadline">
         Deadline: {date}
      </span>
      <span className = "time_left">
         Time Left: 
      </span>
      <div className = "description">
         Description: {description}
      </div>
      <span className = "remove_icon" onClick = {() => removeDeadline_action(item)}>
         &#10005;
      </span>
   </section>
   );
}

const MapDispatchToProps = dispatch => ({
   removeDeadline_action: item => dispatch(removeDeadline_action(item))
});

export default connect(null, MapDispatchToProps)(DeadlineList);