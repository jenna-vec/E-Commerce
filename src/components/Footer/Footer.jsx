import * as React from 'react';
import Accordion from './Accordion/Accodion';
import { Link } from 'react-router-dom';

import fb from './Socials/facebook.png';
import insta from './Socials/insta.png';
import pinterest from './Socials/pinterest.svg';
import twitter from './Socials/twitter.png';
import youtube from './Socials/youtube.png';

import './footer.css';

const Footer = () => {

  const accordionData = [
    {
      title: 'SHOP',
      content: <><Link to='/tees'>tees</Link><Link to='/pull-overs'>pull-overs</Link><Link to='/sweats'>sweats</Link></>
    },
    {
      title: 'ABOUT',
      content: <><Link to='/about'>information</Link><a target="_blank" rel="noreferrer" href="http://www.linkedin.com/in/jennalefort">contact</a></>
    }
  ];

  return (
    <div className='foot'>
      <form className="subscribe-email">
        <p id="newsletter-title">SUBSCRIBE TO OUR NEWSLETTER</p>
        <div id="subscribe-form">
          <input id="newsletter-input" placeholder="your@email.com" />
          <button className="submit-button">submit</button>
        </div>
      </form>
      <div className="accordion">
        {accordionData.map(({ title, content }) => (
          <Accordion key={title} title={title} content={content} />
        ))}
      </div>
      <div className="socials">
        <img alt="facebook logo" src={fb} />
        <img alt="instagram logo" src={insta} />
        <img alt="twitter logo" src={twitter} />
        <img alt="youtube logo" src={youtube} />
        <img alt="pinterest logo" src={pinterest} />
      </div>
      <div className="footer">
        <Link to='/'><p className="footer-name">hi egg</p></Link>
        <div className="copy">
          <p>&#169; Hi Egg. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
