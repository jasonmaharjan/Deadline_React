import React from 'react';
import { connect } from 'react-redux';
import { useSpring, animated } from 'react-spring';
import './homepage.styles.scss';
import { createStructuredSelector } from 'reselect';
import { selectDarkMode } from '../../redux/course/course.selectors';

const HomePage = ({darkMode}) => {
   const props = useSpring({
      from: {opacity: 0},
      opacity: 1
   });

   return(
      <animated.div className = {`${darkMode ? 'homepage-dark' : 'homepage'}`} style = {props}>
            <h1 style = { darkMode?{color: 'white'}:{color: 'black'}} className = "title">
               Deadline Tracker is a simple React app which keeps you informed of your pending works.
            </h1>
      </animated.div>
)};

const MapStateToProps = createStructuredSelector({
   darkMode: selectDarkMode
});


export default connect(MapStateToProps)(HomePage);