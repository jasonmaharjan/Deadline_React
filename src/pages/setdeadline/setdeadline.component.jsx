import React, {useState} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectDarkMode} from '../../redux/settings/settings.selectors';
import { addDeadline_action } from '../../redux/course/course.actions';

import { useSpring } from 'react-spring';
import uuid from 'uuid';
import Form from '../../components/form/form.component';
import { Notification } from '../../components/notification/notification';

import './setdeadline.styles.scss';

const SetDeadline = ({darkMode, addDeadline_action}) => {
   const [course, setCourse] = useState('');
   const [date, setDate] = useState('');
   const [time, setTime] = useState('');
   const [description, setDescription] = useState('');
   const [id, setId] = useState(uuid());
   const dateTime = new Date(`${date} ${time}`).getTime()
   const item = {
      course, date, time, id, description, dateTime
   }
   // for resetting values after form upload
   const resetForm = () => {
      setCourse('');
      setDate('');
      setTime('');
      setDescription('');
      setId(uuid());
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
            console.log("deadline form fill up")
      }
   }

   const handleSubmit = event => {
      event.preventDefault();
      Notification("success", "Deadline Added!", "Your deadline has been added");
      resetForm();
   }

   const props = useSpring({
      from: {opacity: 0},
      opacity: 1,
   });

   return (
      <div className = {`${darkMode ? 'setDeadline-dark' : 'setDeadline'}`} style = {props}>
         <h1 style = { darkMode?{color: 'white'}:{color: 'black'}} className = "title">
            Set your Deadline here:
         </h1>
         <section className = "content">
            <form className = "content-form" onSubmit = {handleSubmit} style = { darkMode?{backgroundColor: '#d4d1cb'}:{backgroundColor: 'white'}}>
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

               {  course && date && description && time &&id?
                  <button className = "button" type = "submit" onClick = {() => {item?addDeadline_action(item):alert("Please fill out the required information!")}}>
                     SUBMIT
                  </button>
                  :
                  null            
               }
            </form>               
         </section>

      </div>
   );
}

const MapStateToProps = createStructuredSelector({
   darkMode: selectDarkMode
});

const MapDispatchToProps = dispatch => ({
   addDeadline_action: item => dispatch(addDeadline_action(item))
});

export default connect(MapStateToProps, MapDispatchToProps)(SetDeadline);