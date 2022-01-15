import React from 'react';
import './about.css';

import github from './github.svg';
import linkedIn from './linkedin.svg';

const About = () => {

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  return (
    <div className="about-page">
        <h3>ABOUT</h3>
        <div>
            <p>Hi Egg is a commerce demo store built with Commerce.js and React. This project includes products, sort function, categories, size variants, cart, checkout, and payments (Stripe). More works can be viewed 
            <a target="_blank" rel="noreferrer" href="http://jennalefort.com"> here</a>.</p>
        </div>
        <div className="about-socials">
            <a target="_blank" rel="noreferrer" href="https://github.com/jenna-vec"><img alt="Github logo" src={github} /></a>
            <a target="_blank" rel="noreferrer" href="http://www.linkedin.com/in/jennalefort"><img alt="LinkedIn logo" src={linkedIn} /></a>
        </div>
    </div>
  );
}

export default About;