import React, {useState} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { createStructuredSelector } from 'reselect';
import { editDeadline_action } from '../../redux/course/course.actions';
import { selectEditFlag } from '../../redux/course/course.selectors';
import { toggleEdit } from '../../redux/course/course.actions';
import { Notification } from '../../components/notification/notification';

import Edit from '../../components/form/editform.component';
import './editForm.styles.scss';
import cross from "../../images/cross.svg";

const EditForm = ({item, toggleEdit, editFlag, editDeadline_action, userAuth}) => {
   const [course, setCourse] = useState(item.course);
   const [date, setDate] = useState(item.date);
   const [time, setTime] = useState(item.time);
   const [id] = useState(item.id);
   const [description, setDescription] = useState(item.description);

   const dateTime = new Date(`${date} ${time}`).getTime();

   const updated_item = {
      course, date, time, id, description, dateTime
   }

   const handleChange = event => {
      const {name, value} = event.target;
      switch(name) {
         case 'course':
            setCourse(value);
            break;
         case 'date':
            setDate(value);
            break;
         case 'time':
            setTime(value);
            break;
         case 'description':
            setDescription(value);
            break;
         default:
            console.log('edit-form-fill')
      }
   }

   const handleSubmit = (event) => {
      event.preventDefault();
      // Comparison using lodash
      let comparison = _.isEqual(item, updated_item)
      if (!comparison) {
         Notification("success", "Deadline Updated!", "Your deadline has been updated");
         toggleEdit();
      }
      else 
         {
            Notification("info", "Deadline Unchanged!", "Your deadline remains unchanged");
            toggleEdit();
         }
   }

   return (
      <section className = "edit-content">
         { editFlag?
            <form className = "edit-form" onSubmit = {handleSubmit} >
               <span className = "remove_icon_" onClick = {() => toggleEdit()}>
                  <img src = {cross} alt = "none" />
               </span> 
               <Edit 
                  name = "course"
                  type = "string"
                  value = {course}
                  handleChange = {handleChange}
                  label = "Title :"
                  required 
               />

               <Edit 
                  name = "date"
                  type = "date"
                  value = {date}
                  handleChange = {handleChange}
                  label = "Set date :"
                  required 
               />  

               <Edit
                  name = "time"
                  type = "time"
                  value = {time}
                  handleChange = {handleChange}
                  label = "Set time :"
                  required
               />

               <Edit 
                  name = "description"
                  type = "textbox"
                  value = {description}
                  handleChange = {handleChange}
                  label = "Description: "
                  required 
               />  

               <button className = "button" type = "submit" onClick = {() => 
                     {
                        updated_item ? editDeadline_action(item, updated_item, userAuth)
                        :
                        alert("Please fill out the required information!")
                     }
                  }>
                  SUBMIT
               </button>
            </form>             
         :null}
      </section>
   );
}

const MapStateToProps = createStructuredSelector({
   editFlag: selectEditFlag
});

const MapDispatchToProps = dispatch => ({
   toggleEdit: () => dispatch(toggleEdit()),
   editDeadline_action: (item, updatedItem, userAuth) => dispatch(editDeadline_action(item, updatedItem, userAuth))
})

export default connect(MapStateToProps, MapDispatchToProps)(EditForm);