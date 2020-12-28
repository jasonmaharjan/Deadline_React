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
         time: '',
         id: '',
         description: '',
      }
   }

   handleChange = event => {
      const{name, value} = event.target;
      this.setState({ [name]: value});
      this.setState({id: Date.now()});
   }

   handleSubmit = event => {
      event.preventDefault();
      alert('Deadline Added!');
   }

   render() {
      return (
         <div className = "setDeadline">
            <h1 className = "title">
               Set your Deadline here:
            </h1>
            <section className = "content">
               <form className = "form" onSubmit = {this.handleSubmit}>
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

                  <Form
                     name = "time"
                     type = "time"
                     value = {this.state.time}
                     handleChange = {this.handleChange}
                     label = "set time :"
                     required
                  />

                  <Form 
                     name = "description"
                     type = "textbox"
                     value = {this.state.description}
                     handleChange = {this.handleChange}
                     label = "Description: "
                     required 
                  />  

                  {  (this.state.course) && (this.state.date) && (this.state.description)?
                     <SetDeadlineAction item = {this.state} />
                     :
                     null             
                  }
               </form>               
            </section>
         </div>
      );
   }
}

export default SetDeadline;