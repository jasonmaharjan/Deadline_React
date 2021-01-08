import React, {useState} from 'react';
import { useSpring, animated } from 'react-spring';
import uuid from 'react-uuid';
import Form from '../../components/form/form.component';
import { Notification } from '../../components/notification/notification';

import SetDeadlineAction from './setDeadline_action.component';

import './setdeadline.styles.scss';

const SetDeadline = () => {
   const [course, setCourse] = useState('');
   const [date, setDate] = useState('');
   const [time, setTime] = useState('');
   const [description, setDescription] = useState('');
   const id = uuid();
   const dateTime = new Date(`${date} ${time}`).getTime()

   const item = {
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
   }

   const handleSubmit = event => {
      event.preventDefault();
      Notification("success", "Deadline Added!", "Your deadline has been added");
   }

   const props = useSpring({
      from: {opacity: 0},
      opacity: 1,
   });

   const formSpring = useSpring({
      config: {mass: 1, tension: 170, friction:26}
   });

   return (
      <animated.div className = "setDeadline" style = {props}>
         <h1 className = "title">
            Set your Deadline here:
         </h1>
         <section className = "content">
            <form className = "form" onSubmit = {handleSubmit} style = {formSpring}>
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
                  <SetDeadlineAction item = {item} />
                  :
                  null             
               }
            </form>               
         </section>

      </animated.div>
   );
}

export default SetDeadline;