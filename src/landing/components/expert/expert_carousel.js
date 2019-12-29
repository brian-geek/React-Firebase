import React from 'react';
import '../../css/style.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';



const Mycarousel = (props) => {
  return(
    <Carousel  showThumbs = {false} showStatus = {false} autoPlay={true} showIndicators={false} infiniteLoop = {true} interval={2500} transitionTime={1000} >
    <div  style={{ backgroundColor: '#9933ff'}}>
      <div style={{fontSize: '24px', color: '#fff'}}>
       <img src={require('../../images/expert1.png')} style={{height: '200px', width: '250px', borderRadius: '50%', left: '42%'}} />
       <br/>
       {props.headtext1}
       <hr/>
       <div style={{fontSize: '20px', color: '#fff'}}>{props.bodytext1}</div>
      </div>
    </div>
    <div  style={{ backgroundColor: '#9933ff'}}>
      <div style={{fontSize: '24px', color: '#fff'}}>
       <img src={require('../../images/expert2.jpg')} style={{height: '200px', width: '250px', borderRadius: '50%', left: '42%'}} />
       <br/>
       {props.headtext1}
       <hr/>
       <div style={{fontSize: '20px', color: '#fff'}}>{props.bodytext1}</div>
      </div>
    </div>
    <div  style={{ backgroundColor: '#9933ff'}}>
      <div style={{fontSize: '24px', color: '#fff'}}>
       <img src={require('../../images/expert3.jpg')} style={{height: '200px', width: '250px', borderRadius: '50%', left: '42%'}} />
       <br/>
       {props.headtext1}
       <hr/>
       <div style={{fontSize: '20px', color: '#fff'}}>{props.bodytext1}</div>
      </div>
    </div>
    <div  style={{ backgroundColor: '#9933ff'}}>
      <div style={{fontSize: '24px', color: '#fff'}}>
       <img src={require('../../images/expert4.jpg')} style={{height: '200px', width: '250px', borderRadius: '50%', left: '42%'}} />
       <br/>
       {props.headtext1}
       <hr/>
       <div style={{fontSize: '20px', color: '#fff'}}>{props.bodytext1}</div>
      </div>
    </div>
    <div  style={{ backgroundColor: '#9933ff'}}>
      <div style={{fontSize: '24px', color: '#fff'}}>
       <img src={require('../../images/expert5.jpg')} style={{height: '200px', width: '250px', borderRadius: '50%', left: '42%'}} />
       <br/>
       {props.headtext1}
       <hr/>
       <div style={{fontSize: '20px', color: '#fff'}}>{props.bodytext1}</div>
      </div>
    </div>
    <div  style={{ backgroundColor: '#9933ff'}}>
      <div style={{fontSize: '24px', color: '#fff'}}>
       <img src={require('../../images/expert6.jpg')} style={{height: '200px', width: '250px', borderRadius: '50%', left: '42%'}} />
       <br/>
       {props.headtext1}
       <hr/>
       <div style={{fontSize: '20px', color: '#fff'}}>{props.bodytext1}</div>
      </div>
    </div>
    </Carousel>
  );
}


export default Mycarousel;