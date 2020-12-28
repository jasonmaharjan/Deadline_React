import React from 'react';
import './deadline_list.styles.scss';
import TimeCalc from '../time_calc/time_calc.component';

import {connect} from 'react-redux';
import {removeDeadline_action} from '../../redux/course/course.actions';

const DeadlineList = ({item, removeDeadline_action}) => {
   const {course, date, description} = item;   

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

      <TimeCalc item = {item} />
      
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