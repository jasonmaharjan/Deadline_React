import React from 'react';
import './setdeadline.styles.scss';

import { connect } from 'react-redux';
import { addDeadline_action } from '../../redux/course/course.actions';
import { Link } from 'react-router-dom';

const SetDeadlineAction = ({item, addDeadline_action}) => {
   return (
      < Link to = "/view_deadline">
         <button className = "button" onClick = {() => {addDeadline_action(item)}}>
            SUBMIT
         </button>
      </Link>
   );
}

// Dispatch action to redux store
const MapDispatchToProps = dispatch => ({
   addDeadline_action: item => dispatch(addDeadline_action(item))
});

export default connect(null, MapDispatchToProps)(SetDeadlineAction);