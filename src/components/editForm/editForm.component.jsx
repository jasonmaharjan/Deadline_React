import React, {useState} from 'react';
import { connect } from 'react-redux';
import SetDeadlineAction from '../../pages/setdeadline/setDeadline_action.component';
import Form from '../../components/form/form.component';
import { createStructuredSelector } from 'reselect';
import { selectEditFlag } from '../../redux/course/course.selectors';
import { toggleEdit } from '../../redux/course/course.actions';

import './editForm.styles.scss';
import cross from "../../images/cross.svg";

const EditForm = ({item, toggleEdit, editFlag}) => {
   console.log(editFlag);
   const [course, setCourse] = useState(item.course);
   const [date, setDate] = useState(item.date);
   const [time, setTime] = useState(item.time);
   const [id] = useState(item.id);
   const [description, setDescription] = useState(item.description);
   const [dateTime, setDateTime] = useState(item.dateTime);

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
            console.log('form-fill')
      }
      setDateTime(`${date} ${time}`)
   }

   const handleSubmit = event => {
      event.preventDefault();
      alert('Deadline Updated!');
   }

   return (
      <section className = "edit-content">
         { editFlag?
            <form className = "form" onSubmit = {handleSubmit} >
               <span className = "remove_icon_" onClick = {() => toggleEdit()}>
                  <img src = {cross} alt = "none" />
               </span> 
               <Form 
                  name = "course"
                  type = "string"
                  value = {course}
                  handleChange = {handleChange}
                  label = "Title :"
                  required 
               />

               <Form 
                  name = "date"
                  type = "date"
                  value = {date}
                  handleChange = {handleChange}
                  label = "Set date :"
                  required 
               />  

               <Form
                  name = "time"
                  type = "time"
                  value = {time}
                  handleChange = {handleChange}
                  label = "Set time :"
                  required
               />

               <Form 
                  name = "description"
                  type = "textbox"
                  value = {description}
                  handleChange = {handleChange}
                  label = "Description: "
                  required 
               />  

               {  (course) && (date) && (description)?
                  <SetDeadlineAction item = {updated_item} />
                  :
                  null             
               }
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
})

export default connect(MapStateToProps, MapDispatchToProps)(EditForm);