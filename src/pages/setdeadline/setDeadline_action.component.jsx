import React from 'react';
import './setdeadline.styles.scss';

import { connect } from 'react-redux';
import { addDeadline_action } from '../../redux/course/course.actions';

const SetDeadlineAction = ({item, addDeadline_action}) => {
   return (
         <button className = "button" type = "submit" onClick = {() => {item?addDeadline_action(item):alert("Please fill out the required information!")}}>
            SUBMIT
         </button>
   );
}

// Dispatch action to redux store
const MapDispatchToProps = dispatch => ({
   addDeadline_action: item => dispatch(addDeadline_action(item))
});

export default connect(null, MapDispatchToProps)(SetDeadlineAction);