import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectDeadlines} from '../../redux/course/course.selectors';
import { sortDeadline_action } from '../../redux/course/course.actions';

import DeadlineList from '../../components/deadline_list/deadline_list.component';

import './viewdeadline.styles.scss';

const ViewDeadline = ({deadlines, sortDeadline_action}) => {
   
   return(
      <div className = "view">
         <div className = "title">
            View Your Deadlines here:
         </div>

         <button className = "sort_button" onClick = {() => {sortDeadline_action()}}>
            Sort
         </button>

            {
               deadlines.length? (
                  deadlines.map((deadline)=> 
                  <DeadlineList key = {deadline.id} item = {deadline} />
                  )
               )
               :
               <div className = "message">
                  No Deadlines yet!
               </div>
            }

      </div>
)};

const MapStateToProps = createStructuredSelector({
   deadlines: selectDeadlines
})

const MapDispatchToProps = dispatch => ({
   sortDeadline_action: () => dispatch(sortDeadline_action())
})

export default connect(MapStateToProps, MapDispatchToProps)(ViewDeadline);