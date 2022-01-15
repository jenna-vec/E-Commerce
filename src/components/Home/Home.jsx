import { Link } from 'react-router-dom';

//images
import one from './photos/black-tee.jpg';
import two from './photos/glasses-photo.jpg';
import three from './photos/man-shirt.jpg';
import four from './photos/text-tee.jpg';
import five from './photos/white-t-car.png';

import './home.css';


const Home = () => {

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    const divStyle = {
        height: 'unset'
      };

    return (
    <div className="index-page">
        <div className="main">
            <h1 className="main-title">hello trendy basics</h1>
            <Link to="/products" style={divStyle}>
                <div id="floaty">
                    <p>shop styles</p>
                </div>
            </Link>
        </div>
        <div id="carousel">
            <img alt="young man wearing tee"  src={two} />
            <img alt="young woman wearing tee" src={one} />
            <img alt="young man wearing tee" src={three} />
            <img alt="young woman wearing tee" src={four} />
            <img alt="young woman wearing tee" src={five} />
        </div>
    </div>
  );
};

export default Home;