import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchDeadlinesData } from '../../redux/course/course.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import ViewDeadlineContainer from './viewdeadline.container';

const ViewDeadlinePage = ({ fetchDeadlinesData, currentUser }) => {

   useEffect(() => {
      if (currentUser) {
         fetchDeadlinesData(currentUser.userAuth);
      }
  }, [fetchDeadlinesData, currentUser]);

   return (
      <ViewDeadlineContainer />
   );
}

const MapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser,
})


const MapDispatchToProps = dispatch => ({
   fetchDeadlinesData: userAuth => dispatch(fetchDeadlinesData(userAuth)),
});

export default connect(MapStateToProps, MapDispatchToProps)(ViewDeadlinePage);