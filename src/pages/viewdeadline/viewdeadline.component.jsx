import React, { forwardRef } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectDeadlines, selectEditFlag } from '../../redux/course/course.selectors';
import { toggleSort, sortDeadline_action, removeDeadline_action, toggleEdit } from '../../redux/course/course.actions';
import { useSpring, animated } from 'react-spring';

import TimeCalc from '../../components/time_calc/time_calc.component';
import FlipMove from 'react-flip-move';
import EditForm from '../../components/editForm/editForm.component';

import cross from "../../images/cross.svg";
import edit from "../../images/edit.svg";
import sort from "../../images/sort.svg";
import redWarn from "../../images/red_warning.svg";
import yellowWarn from "../../images/yellow_warning.svg";

import './viewdeadline.styles.scss';

const ViewDeadline = ({deadlines, sortDeadline_action, toggleSort, toggleEdit, editFlag, removeDeadline_action}) => {
   /*useEffect(() => {
      console.log(editFlag);
   },[editFlag]);*/


   const [deadlineToEdit, setDeadlineToEdit] = useState(null);

   const props = useSpring({
      from: {opacity: 0},
      opacity: 1
   });

   const RemoveDeadline = () => {
      if (window.confirm("Are you sure you want to remove this deadline?")) {
         return true
      } 
      else return false
   }
   
   // Individual Deadline
   const List = forwardRef(({item}, ref) => (
         <div ref={ref}>
            <div className = 'deadline_list'>
               {
                  (item.dateTime - Date.now())/1000 <= 86400 
                  ? 
                  <img src = {redWarn} className = "warn-icon" alt = "none" />
                  :
                  (item.dateTime - Date.now())/1000 <= 259200 && (item.dateTime - Date.now())/1000 > 86400
                  ?
                  <img src = {yellowWarn} className = "warn-icon" alt = "none" />
                  :null
               }
               <h1 className = "course_title">
                  {item.course}
               </h1>
               <div className = "course_deadline">
                  Deadline: {item.date}
               </div>      
               <div className = "description">
                  Description: {item.description}
               </div>
               <TimeCalc item = {item} />
               <span className = "edit_icon" 
                  onClick = {
                     () => {
                        setDeadlineToEdit(item); 
                        toggleEdit();
                     }
                  }
               ><img src = {edit} className = "icon" alt = "none" />
               </span> 
               <span className = "remove_icon" 
                  onClick = {
                     () => {
                        if (RemoveDeadline() === true) removeDeadline_action(item);
                     }
                  }
               ><img src = {cross} alt = "none" />
               </span> 
            </div>      
         </div>
   ));
   
   return(
      <animated.div className = "view" style = {props}>
         {
            editFlag && deadlineToEdit?
            <div className = "edit-form-overlay">
               <EditForm item = {deadlineToEdit}/>
            </div>:null }
         {
            deadlines.length?
            <img 
               src = {sort} 
               className = "sort-icon" 
               onClick = {() => {toggleSort(); sortDeadline_action()}} 
               alt = "none"
            />
            :null
         }
         <FlipMove>
         {
            deadlines.length? (
               deadlines.map((deadline)=> 
                  <List key = {deadline.id} item = {deadline} />
               )
            )
            :
            <div className = "message">
               Hurray! You do not have any deadlines 
            </div>
         }
         </FlipMove>
      </animated.div>
   );
};

const MapStateToProps = createStructuredSelector({
   deadlines: selectDeadlines,
   editFlag: selectEditFlag
})

const MapDispatchToProps = dispatch => ({
   toggleSort: () => dispatch(toggleSort()),
   toggleEdit: () => dispatch(toggleEdit()),
   sortDeadline_action: () => dispatch(sortDeadline_action()),
   removeDeadline_action: item => dispatch(removeDeadline_action(item))
})

export default connect(MapStateToProps, MapDispatchToProps)(ViewDeadline);