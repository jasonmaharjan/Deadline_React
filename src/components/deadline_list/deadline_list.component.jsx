import React from 'react';
import './deadline_list.styles.scss';

const DeadlineList = ({item: {course, date, status}}) => (
   <section className = 'deadline_list'>
      <h1 className = "course_title">
         {course}
      </h1>
      <div className = "course_deadline">
         Deadline: {date}
      </div>
   </section>
)

export default DeadlineList;