import React from 'react';
import { useSpring, animated } from 'react-spring';
import './homepage.styles.scss';

const HomePage = () => {
   const props = useSpring({
      from: {opacity: 0},
      opacity: 1
   });
   return(
      <animated.div className = "homepage" style = {props}>
            <h1 className = "title">This is how it goes:</h1>
            <p className = "info">
               Very simple porject- set up a deadline and view it.
            </p>
      </animated.div>
)};

export default HomePage;