import React from 'react';
import ReactPlayer from 'react-player';
import '../../css/style.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Mycarousel from './carousel';





class About extends React.Component {

  render() {
    return (
      <div id="about">
        <div className="section-title">
          <h2>Why X-Purt?</h2>
        </div>
        <table cellspacing='65'>
          <tr>
            <td >
              <div className = 'what'>
                <h2>What is X-purt?</h2>
                <p>X-Purt is a mobile and web platform designed to connect skilled and talented individuals with people interested in learning these skills! Started by Stanford students passionate about education, X-Purt is the best way to learn a new skill in a personalized manner, or to teach something that you’re passionate about! You wouldn’t watch a video or read a tutorial to learn how to swim, so why not have a personalized tutor who’s with you every step of the way!</p>
              </div>
            </td>
            <td>
              <div className = 'what'>
                <ReactPlayer url={require('../../images/schoolbudd.mp4')} playing={false} width={'550px'} controls/>
              </div>
            </td>
          </tr>
          <tr >
            <td colspan='2'>
              <div className = 'why'>
              <p  style={{ fontSize: '24px', color: '#333333', textAlign: 'center' }}>What Learn with X-purt?</p>
              <Mycarousel headtext1='"I am so happy I found the website!"' bodytext1='It was really calming to be able to talk to a student. I was really stressed about the process but just talking to someone who had gone through the process really recently was dope. I highly recommend using SchoolBudd!' />
              </div>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default About;








