import React from 'react';
import '../../css/style.css';


const Newsletter = () => {
  return(
    <div id="newsletter" >
      <div className="overlay"></div>
      <div className="container">
        <div className="wow bounceIn section-title">
           <h2>Get in touch</h2>
        </div>
        <table className="newsletter-form" data-wow-delay="0.8s" cellspacing='30'>
           <tr className = 'submit_form'>
               <td >
                <input  type="text" className="form-control" id="name" placeholder="Your Name here" />
               </td>
            </tr>
            <tr className = 'submit_form'>
              <td>
                <input  type="email" className="form-control" id="email" placeholder="Your Email here" />
              </td>
            </tr>
            <tr className = 'submit_form'>
              <td>
                <input  type="text" className="form-control" id="subject" placeholder="Your Subject here" />
              </td>
            </tr>
            <tr className = 'submit_form'>
              <td>
                <input  type='text' className="form-control" id="message" placeholder="Your Message here" />
              </td>
            </tr>
            <tr className = 'submit_form'>
              <td>
                <input type="submit" className="form-control" id="submit" value="Submit" />
              </td>
            </tr>
         </table>
       </div>    
       <div className="about-thumb">
              <img src={require('../../images/team-img1.jpg')}  alt="Team" />
              <div className="about-overlay">
                <p className='Name'>Joshua Ojo-Osagie </p>
                <p className='exp'>Founder of Xpurt</p>
              </div>
        </div>
   </div>
  );
}

export default Newsletter;