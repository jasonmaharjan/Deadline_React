import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux'; // for easier readability for connect() of HOCs
import {selectIsDeadlinesFetching} from '../../redux/course/course.selectors';
import { selectDarkMode } from '../../redux/settings/settings.selectors';

import WithSpinner from '../../components/with-spinner/with-spinner.component';
import ViewDeadline from './viewdeadline.component';

const mapStateToProps = createStructuredSelector ({
   isLoading: selectIsDeadlinesFetching,
   darkMode: selectDarkMode
});

const ViewDeadlineContainer = compose (
   connect(mapStateToProps),
   WithSpinner
)(ViewDeadline); //compose evaluates HOC from right to left!

export default ViewDeadlineContainer;