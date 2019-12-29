import React from 'react';
import Mycarousel from './learner_carousel';
import '../../css/style.css';



const Learner = () => {
  const heading = [
      'Personalized Learning at Your Pace',
      'Appointments',
      'Forum',
      'Testimonials'
  ]
  const text = [
    'Connect with experts from around the world for personalized one on one coaching! Experts post pictures and snippets of their work so you find exactly who you’re looking for! Experts will work with you at your own pace and will ensure you learn and improve!',
    'Book appointments with experts directly on the platform. You can book from 30 minutes to an hour, and can book as many sessions as you’d like!',
    'Ask experts or others learning skills any questions that you can think of! We moderate the forum so everything is appropriate and relevant!',
    'Good choice for Nutrition. This will be very helpful for your health...',
    'Good choice for Sewing/Knitting. This will be very helpful for your skills...',
    'Good choice for Woodworking/Whittling. This will be very helpful for your health...',
    'Good choice for Visual Art. This will be very helpful for your art skills...',
    'Good choice for Fitness/Health. This will be very helpful for your health...',
    'Good choice for Caligraphy. This will be very helpful for your writing skills...'
  ];
  return(
    <div className = 'gallery' id = 'screenshot'>
      <div className="section-title">
        <h2>Best site for extra learners</h2>
      </div>
    <table id='screen' >
      <tr>
        <td className='imgtable'>
          <h5>{heading[0]}</h5>
          <a href='#home'><img className='' src={require('../../images/learner1.jpg')}/></a>
          <p>{text[0]}</p>
        </td>
        <td className='imgtable'>
          <h5>{heading[1]}</h5>
          <a href='#home'><img src={require('../../images/learner2.jpg')}/></a>
          <p>{text[1]}</p>
        </td>
        <td className='imgtable'>
          <h5>{heading[2]}</h5>
          <a href='#home'><img src={require('../../images/learner3.jpg')}/></a>
          <p>{text[2]}</p>
        </td>
      </tr>
      <tr>
      <td colspan='3'>
              <div className = 'why'>
              <p  style={{ fontSize: '24px', color: '#333333', textAlign: 'center' }}>Why Should I Use X-Purt?</p>
              <Mycarousel headtext1='"I am so happy I found the website!"' bodytext1='It was really calming to be able to talk to a student. I was really stressed about the process but just talking to someone who had gone through the process really recently was dope. I highly recommend using SchoolBudd!' />
              </div>
            </td>
      </tr>
    </table>
  </div>
  );
}

export default Learner;