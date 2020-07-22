import React from 'react';
import Form from '../../components/form/form.component';
import './setdeadline.styles.scss';

import { connect } from 'react-redux';
import { addDeadline_action } from '../../redux/course/course.actions';
import { Link } from 'react-router-dom';


class HomePage extends React.Component {
   constructor (props) {
      super (props);

      this.state = {
         course : '',
         date: '',
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
               <form className = "form"  onSubmit = {this.handleSubmit}>
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
               < Link to = "/view_deadline">
                  <button className = "button" onClick = {
                     () => {
                        addDeadline_action(this.state);
                        console.log(this.state);
                     }
                  }>
                   SUBMIT
                  </button>
               </Link>
            </section>
         </div>
      );
   }
}

const MapDispatchToProps = dispatch => ({
   addDeadline_action: item => dispatch(addDeadline_action(item))
});

export default connect(null, MapDispatchToProps)(HomePage);