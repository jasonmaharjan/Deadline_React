import React from 'react';
import Form from '../../components/form/form.component';
import './setdeadline.styles.scss';

import SetDeadlineAction from './setDeadline_action.component';


class SetDeadline extends React.Component {
   constructor (props) {
      super (props);

      this.state = {
         course : '',
         date: '',
         status: false
      }
   }

   handleChange = event => {
      const{name, value} = event.target;
      this.setState({ [name]: value});
   }

   render() {
      return (
         <div className = "setDeadline">
            <h1 className = "title">
               Set your Deadline here:
            </h1>
            <section className = "content">
               <form className = "form">
                  <Form 
                     name = "course"
                     type = "string"
                     value = {this.state.course}
                     handleChange = {this.handleChange}
                     label = "course :"
                     required 
                  />

                  <Form 
                     name = "date"
                     type = "date"
                     value = {this.state.date}
                     handleChange = {this.handleChange}
                     label = "set date :"
                     required 
                  />                 
               </form>
               
               <SetDeadlineAction item = {this.state}/>
               
            </section>
         </div>
      );
   }
}

export default SetDeadline;