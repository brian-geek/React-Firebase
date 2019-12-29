import React from 'react';
import '../../css/style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ReactDOM from 'react-dom';
import App from '../../../App';

const back=[
            require('../../images/home-bg.jpg'),
            require('../../images/home-bg1.jpg'), 
            require('../../images/home-bg2.jpg'),
            require('../../images/home-bg3.jpg'),
            require('../../images/home-bg4.jpg'),
            require('../../images/home-bg5.jpg'),
            require('../../images/home-bg6.jpg'),
            require('../../images/home-bg7.png')
           ];

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      back: 0,
      i : 'NULL'
    }
    this.autoimage = this.autoimage.bind(this);
    this.updateimage = this.updateimage.bind(this);
    this.change = this.change.bind(this);
  }
  autoimage = () => {
   setTimeout(this.updateimage, 3000);
  }
  updateimage = () => {
    this.setState({ back: this.state.back + 1});
    if(this.state.back === 8) {
      this.setState({ back: 0});
    }
  }

  change = () => {
    sessionStorage.setItem("mode", "openreact");
    window.open('index.html', '_self')
  }
  render() {
    this.autoimage();
    return(
      <>
      <div id="home" className="main" style = { {backgroundImage: `url(${back[this.state.back]})` } }>
       <div className="overlay"></div>
	      <div className="container">
		       <div className="row">
               <div>
                    <img src={ require('../../images/home-img.webp') } alt="Home" style={{width: '28vw', top: '30%'}}/>
                    <img src={ require('../../images/home-img.png') } alt="Homeimg" style={{width: '20vw', top: '40%'}}/>
               </div>
              <div className="home-thumb">
                <h1 className="wow fadeInUp" data-wow-delay="0.6s">X-Purt</h1>
                <p className="wow fadeInUp" data-wow-delay="0.8s">X-Purt is your premier online learning resource for learning a new skill, or improving one you already have!</p>
                <div class="wow fadeInUp section-btn btn btn-success smoothScroll" data-wow-delay="1s" onClick={this.change}>Get Started</div>
              </div>
		      </div>
	     </div>
      </div>
    </>
    );
  }
}


export default Home;