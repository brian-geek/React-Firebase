import React from 'react';
import '../../css/style.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';



const Mycarousel = (props) => {
  return(
    <Carousel  showThumbs = {false} showStatus = {false} autoPlay={true} showIndicators={false} infiniteLoop = {true} interval={1000} transitionTime={1000} >
    <div  style={{ backgroundColor: '#f2f2f2'}}>
      <div style={{fontSize: '24px', color: '#333333'}}>
       <img src={require('../../images/team-img1.jpg')} style={{height: '200px', width: '200px', borderRadius: '50%'}} />
       <br/>
       {props.headtext1}
       <hr/>
       <div style={{fontSize: '20px', color: '#333333'}}>{props.bodytext1}</div>
      </div>
    </div>
    <div  style={{ backgroundColor: '#f2f2f2'}}>
      <div style={{fontSize: '24px', color: '#333333'}}>
       <img src={require('../../images/team-img1.jpg')} style={{height: '200px', width: '200px', borderRadius: '50%'}} />
       <br/>
       {props.headtext1}
       <hr/>
       <div style={{fontSize: '20px', color: '#333333'}}>{props.bodytext1}</div>
      </div>
    </div>
    </Carousel>
  );
}


export default Mycarousel;