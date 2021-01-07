import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectDeadlines, selectEditFlag } from '../../redux/course/course.selectors';
import { toggleSort, sortDeadline_action, 
         removeDeadline_action, toggleEdit,
         sortDeadlineDND_action } from '../../redux/course/course.actions';
import { useSpring, animated } from 'react-spring';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import TimeCalc from '../../components/time_calc/time_calc.component';
import EditForm from '../../components/editForm/editForm.component';

import cross from "../../images/cross.svg";
import edit from "../../images/edit.svg";
import sort from "../../images/sort.svg";
import redWarn from "../../images/red_warning.svg";
import yellowWarn from "../../images/yellow_warning.svg";

import './viewdeadline.styles.scss';

const ViewDeadline = ({deadlines, sortDeadline_action, toggleSort, toggleEdit, editFlag, 
                        removeDeadline_action, sortDeadlineDND_action}) => {
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

   return(
      <animated.div className = "view" style = {props}>
         {
            editFlag && deadlineToEdit?
            <div className = "edit-form-overlay">
               <EditForm item = {deadlineToEdit}/>
            </div>:null
         }
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
         {
            deadlines.length? (
               <DragDropContext onDragEnd = {result => sortDeadlineDND_action(result)}>
                  <Droppable droppableId = "deadlines">
                     {(provided, snapshot) => {
                        console.log(snapshot)
                        return (
                           <div
                              {...provided.droppableProps} 
                              ref = {provided.innerRef}
                              style = {{
                                 background: '#e9edf5',
                                 borderRadius: '1rem',
                                 padding: 40,
                                 width: 800,
                                 marginTop: '5rem'  
                              }}
                           >
                              {deadlines.map((deadline, index) => {
                                 return (
                                    <Draggable key = {deadline.id} draggableId = {deadline.id} index = {index}>
                                       {(provided, snapshot) => {
                                          return (
                                             <div 
                                                ref = {provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style = {
                                                   {
                                                      userSelect: 'none',
                                                      padding: 5,
                                                      minHeight: '16px',
                                                      margin: '0 0 1rem 0',
                                                      ...provided.draggableProps.style
                                                   }
                                                }
                                             >
                                                <div className = 'deadline_list'>
                                                   {
                                                      (deadline.dateTime - Date.now())/1000 <= 86400 
                                                      ? 
                                                      <img src = {redWarn} className = "warn-icon" alt = "none" />
                                                      :
                                                      (deadline.dateTime - Date.now())/1000 <= 259200 && (deadline.dateTime - Date.now())/1000 > 86400
                                                      ?
                                                      <img src = {yellowWarn} className = "warn-icon" alt = "none" />
                                                      :null
                                                   }
                                                   <h1 className = "course_title">
                                                      {deadline.course}
                                                   </h1>
                                                   <div className = "course_deadline">
                                                      Deadline: {deadline.date}&nbsp;&nbsp;&nbsp;&nbsp;
                                                      {
                                                         deadline.time[0]+deadline.time[1] > 12 ?
                                                            <span> 
                                                               {
                                                                  deadline.time[0]+deadline.time[1] - 12 
                                                               }:{deadline.time.slice(3,5)}&nbsp;pm 
                                                            </span>
                                                         :
                                                         deadline.time[0]+deadline.time[1] === "00" ?
                                                            <span> 
                                                               12:00&nbsp;am
                                                            </span>
                                                         :
                                                         <span> 
                                                            12:00&nbsp;pm
                                                         </span>
                                                      } 
                                                   </div>      

                                                   <div className = "description">
                                                      Description: {deadline.description}
                                                   </div>

                                                   <TimeCalc item = {deadline} />

                                                   <span className = "edit_icon" 
                                                      onClick = {
                                                         () => {
                              
                                                            setDeadlineToEdit(deadline); 
                                                            window.scrollTo(0, 0);
                                                            toggleEdit();
                                                         }
                                                      }
                                                   ><img src = {edit} className = "icon" alt = "none" />
                                                   </span> 
                                                   <span className = "remove_icon" 
                                                      onClick = {
                                                         () => {
                                                            if (RemoveDeadline() === true) removeDeadline_action(deadline);
                                                         }
                                                      }
                                                   ><img src = {cross} alt = "none" />
                                                   </span> 
                                                </div>      
                                             </div>
                                          );
                                       }}
                                    </Draggable>
                                 );
                              })}
                              {provided.placeholder}
                           </div>
                        );
                     }
                     }
                  </Droppable>
               </DragDropContext>
            )
            :
            <div className = "message">
               Hurray! You do not have any deadlines 
            </div>
         }    
         

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
   sortDeadlineDND_action: result => dispatch(sortDeadlineDND_action(result)),
   removeDeadline_action: item => dispatch(removeDeadline_action(item))
})

export default connect(MapStateToProps, MapDispatchToProps)(ViewDeadline);