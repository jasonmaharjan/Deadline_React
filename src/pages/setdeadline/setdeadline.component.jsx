import React from 'react';
import Form from '../../components/form/form.component';
import CustomButton from '../../components/button/button.component';
import './setdeadline.styles.scss';


class HomePage extends React.Component {
   constructor (props) {
      super (props);

      this.state = {
         course : '',
         date: ''
      }
   }

   handleChange = event => {
      const{name, value} = event.target;
      this.setState({ [name]: value});
      console.log(this.state);
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
               < CustomButton type = "submit"> Submit </CustomButton>
            </section>
         </div>
      );
   }
}

export default HomePage;