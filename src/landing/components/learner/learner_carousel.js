import React from 'react';
import '../../css/style.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';



const Mycarousel = (props) => {
  return(
    <Carousel  showThumbs = {false} showStatus = {false} autoPlay={true} showIndicators={false} infiniteLoop = {true} interval={2500} transitionTime={1000} >
    <div  style={{ backgroundColor: '#f2f2f2'}}>
      <div style={{fontSize: '24px', color: '#333333'}}>
       <img src={require('../../images/screenshot-img1.jpg')} style={{height: '200px', width: '250px', borderRadius: '50%', left: '42%'}} />
       <br/>
       {props.headtext1}
       <hr/>
       <div style={{fontSize: '20px', color: '#333333'}}>{props.bodytext1}</div>
      </div>
    </div>
    <div  style={{ backgroundColor: '#f2f2f2'}}>
      <div style={{fontSize: '24px', color: '#333333'}}>
       <img src={require('../../images/screenshot-img2.jpg')} style={{height: '200px', width: '250px', borderRadius: '50%', left: '42%'}} />
       <br/>
       {props.headtext1}
       <hr/>
       <div style={{fontSize: '20px', color: '#333333'}}>{props.bodytext1}</div>
      </div>
    </div>
    <div  style={{ backgroundColor: '#f2f2f2'}}>
      <div style={{fontSize: '24px', color: '#333333'}}>
       <img src={require('../../images/screenshot-img3.jpg')} style={{height: '200px', width: '250px', borderRadius: '50%', left: '42%'}} />
       <br/>
       {props.headtext1}
       <hr/>
       <div style={{fontSize: '20px', color: '#333333'}}>{props.bodytext1}</div>
      </div>
    </div>
    <div  style={{ backgroundColor: '#f2f2f2'}}>
      <div style={{fontSize: '24px', color: '#333333'}}>
       <img src={require('../../images/screenshot-img4.jpg')} style={{height: '200px', width: '250px', borderRadius: '50%', left: '42%'}} />
       <br/>
       {props.headtext1}
       <hr/>
       <div style={{fontSize: '20px', color: '#333333'}}>{props.bodytext1}</div>
      </div>
    </div>
    <div  style={{ backgroundColor: '#f2f2f2'}}>
      <div style={{fontSize: '24px', color: '#333333'}}>
       <img src={require('../../images/screenshot-img5.jpg')} style={{height: '200px', width: '250px', borderRadius: '50%', left: '42%'}} />
       <br/>
       {props.headtext1}
       <hr/>
       <div style={{fontSize: '20px', color: '#333333'}}>{props.bodytext1}</div>
      </div>
    </div>
    <div  style={{ backgroundColor: '#f2f2f2'}}>
      <div style={{fontSize: '24px', color: '#333333'}}>
       <img src={require('../../images/screenshot-img6.jpg')} style={{height: '200px', width: '250px', borderRadius: '50%', left: '42%'}} />
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