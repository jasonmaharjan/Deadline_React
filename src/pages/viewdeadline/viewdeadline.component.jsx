import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectDeadlines, selectEditFlag, 
         selectSettings, selectSettingsFlag, selectDarkMode } from '../../redux/course/course.selectors';

import { toggleSort, sortDeadline_action, 
         removeDeadline_action, toggleEdit,
         sortDeadlineDND_action, 
         toggleSettings } from '../../redux/course/course.actions';

import { useSpring } from 'react-spring';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import TimeCalc from '../../components/time_calc/time_calc.component';
import EditForm from '../../components/editForm/editForm.component';
import SettingsForm from '../../components/settingsForm/settingsForm.component';
import { Notification } from '../../components/notification/notification';

import cross from "../../images/cross.svg";
import edit from "../../images/edit.svg";
import sort from "../../images/sort.svg";
import redWarn from "../../images/red_warning.svg";
import yellowWarn from "../../images/yellow_warning.svg";
import settingsIcon from "../../images/settings.svg";
import search from "../../images/searchButton.svg";

import './viewdeadline.styles.scss';

const ViewDeadline = ({darkMode, deadlines, sortDeadline_action, toggleSort, toggleEdit, editFlag, 
                        removeDeadline_action, sortDeadlineDND_action, settings, settingsFlag, toggleSettings}) => {
   const [deadlineToEdit, setDeadlineToEdit] = useState(null);
   const [searchField, setSearchField] = useState('');

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

   const onSearchChange = event => {
      setSearchField(event.target.value);
   }

   const filteredDeadlines = deadlines.filter(deadline => deadline.course.toLowerCase().includes(searchField.toLowerCase()) || deadline.description.toLowerCase().includes(searchField.toLowerCase()));
   return(
      <div className = {`${darkMode ? 'view-dark' : 'view'}`} style = {props}>
         {
            editFlag && deadlineToEdit?
            <div className = "edit-form-overlay">
               <EditForm item = {deadlineToEdit} />
            </div>:null
         }
         {
            settingsFlag?
            <div className = "edit-form-overlay">
               <SettingsForm />
            </div>:null
         }
            <div className = "icon-div">
               <form className="search">
                  <input type="text" className="search_input" placeholder="Search" onChange = {onSearchChange}/>
                  <button className="search_button">
                     <img src = {search} className = "search_button_img" alt = "None" />
                  </button>
               </form>
               <img 
                  src = {sort} 
                  className = "sort-icon" 
                  onClick = {() => {
                     if (deadlines.length) {
                        toggleSort(); sortDeadline_action();
                     }
                     else Notification('info', 'Sort Action', 'No deadlines to sort');
                  }} 
                  alt = "none"
               />
            
               <img 
                  src = {settingsIcon} 
                  className = "settings-icon" 
                  onClick = {() => {toggleSettings()}} 
                  alt = "none"
               />
            </div>
         {
            filteredDeadlines.length? (
               <DragDropContext onDragEnd = {result => sortDeadlineDND_action(result)}>
                  <Droppable droppableId = "deadlines">
                     {(provided, snapshot) => {
                        return (
                           <div
                              {...provided.droppableProps} 
                              ref = {provided.innerRef}
                              className = {`${darkMode ? 'droppable-dark':'droppable-light'}`}
                           >
                              {filteredDeadlines.map((deadline, index) => {
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
                                                <div className = {`${darkMode ? 'deadline_list-dark' : 'deadline_list'}`}>
                                                   {
                                                      (deadline.dateTime - Date.now())/1000 <= settings.redWarn
                                                      ? 
                                                      <img src = {redWarn} className = "warn-icon" alt = "none" />
                                                      :
                                                      (deadline.dateTime - Date.now())/1000 <= settings.yellowWarn && (deadline.dateTime - Date.now())/1000 > settings.redWarn
                                                      ?
                                                      <img src = {yellowWarn} className = "warn-icon" alt = "none" />
                                                      :null
                                                   }
                                                   <h1 className = "course_title">
                                                      {deadline.course}
                                                   </h1>
                                                   <div className = "course_deadline">
                                                      Due: {deadline.date}&nbsp;&nbsp;&nbsp;&nbsp;
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
                                                     <i>{deadline.description}</i>
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
            !deadlines.length? 
               <div className = {`${darkMode ? 'message-dark' : 'message-light'}`}>
                  Hurray! You do not have any deadlines...yet
               </div>
            :
               <div className = {`${darkMode ? 'message-dark' : 'message-light'}`}>
                  No Results Found
               </div>
         }    
      </div>
   );
};

const MapStateToProps = createStructuredSelector({
   deadlines: selectDeadlines,
   editFlag: selectEditFlag,
   settings: selectSettings,
   settingsFlag: selectSettingsFlag,
   darkMode: selectDarkMode
})

const MapDispatchToProps = dispatch => ({
   toggleSort: () => dispatch(toggleSort()),
   toggleEdit: () => dispatch(toggleEdit()),
   toggleSettings: () => dispatch(toggleSettings()),
   sortDeadline_action: () => dispatch(sortDeadline_action()),
   sortDeadlineDND_action: result => dispatch(sortDeadlineDND_action(result)),
   removeDeadline_action: item => dispatch(removeDeadline_action(item))
})

export default connect(MapStateToProps, MapDispatchToProps)(ViewDeadline);