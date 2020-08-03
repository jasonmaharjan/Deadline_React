import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectDeadlines} from '../../redux/course/course.selectors';

import DeadlineList from '../../components/deadline_list/deadline_list.component';

import './viewdeadline.styles.scss';

const ViewDeadline = ({deadlines}) => {
   
   return(
      <div className = "view">
         <div className = "title">
            View Your Deadlines here:
            {
               deadlines.length? (
                  deadlines.map((deadline)=> 
                  < DeadlineList key = {deadline.id} item = {deadline} />
                  )
               )
               :
               <div className = "message">
                  No Deadlines yet!
               </div>
            }
         </div>
      </div>
)};

const MapStateToProps = createStructuredSelector({
   deadlines: selectDeadlines
})

export default connect(MapStateToProps)(ViewDeadline);