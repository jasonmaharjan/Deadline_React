import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectDeadlines} from '../../redux/course/course.selectors';
import { sortDeadline_action } from '../../redux/course/course.actions';

import DeadlineList from '../../components/deadline_list/deadline_list.component';

import { useSpring, animated } from 'react-spring';

import './viewdeadline.styles.scss';

const ViewDeadline = ({deadlines, sortDeadline_action}) => {
   const props = useSpring({
      from: {opacity: 0},
      opacity: 1
   });
   return(
      <animated.div className = "view" style = {props}>
         <div className = "title">
            View Your Deadlines here:
         </div>
            {
               deadlines?
               <button className = "sort_button" onClick = {() => {sortDeadline_action()}}>
                  Sort
               </button>
               :null
            }
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
      </animated.div>
)};

const MapStateToProps = createStructuredSelector({
   deadlines: selectDeadlines
})

const MapDispatchToProps = dispatch => ({
   sortDeadline_action: () => dispatch(sortDeadline_action())
})

export default connect(MapStateToProps, MapDispatchToProps)(ViewDeadline);